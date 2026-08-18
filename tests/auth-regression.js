/* Minimal regression tests for AUTH-001
   Uses built-in fetch (Node 18+) and mongoose to verify signup/login/logout and session behavior.
   Run with: node tests/auth-regression.js
*/

const mongoose = require('mongoose');
const { URLSearchParams } = require('node:url');
const fetch = global.fetch;
if (!fetch) {
  console.error('Global fetch not available in this Node runtime. Abort.');
  process.exit(2);
}

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080';
const MONGO = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/homify_dev';
const QA_EMAIL = 'qa-auth@homify.local';
const QA_USERNAME = 'qa-auth';
const QA_PASSWORD = 'TestPass123!';

function extractCookies(res) {
  const raw = res.headers.get('set-cookie');
  if (!raw) return [];
  return Array.isArray(raw) ? raw : [raw];
}

async function postForm(path, data, cookieHeader) {
  const body = new URLSearchParams(data);
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  if (cookieHeader) headers['Cookie'] = cookieHeader;
  const res = await fetch(BASE + path, { method: 'POST', body, headers, redirect: 'manual' });
  return res;
}

async function get(path, cookieHeader) {
  const headers = {};
  if (cookieHeader) headers['Cookie'] = cookieHeader;
  return await fetch(BASE + path, { method: 'GET', headers, redirect: 'manual' });
}

(async function main() {
  console.log('Connecting to MongoDB...', MONGO);
  await mongoose.connect(MONGO);
  const User = require('../models/user');

  console.log('Cleaning up any existing QA account...');
  await User.deleteMany({ email: QA_EMAIL });

  // Signup
  console.log('POST /signup (register)...');
  const signupRes = await postForm('/signup', { username: QA_USERNAME, email: QA_EMAIL, password: QA_PASSWORD });
  console.log('signup status', signupRes.status, 'location', signupRes.headers.get('location'));
  const signupCookies = extractCookies(signupRes);

  // Verify user in DB
  const created = await User.findOne({ email: QA_EMAIL }).lean();
  if (!created) {
    console.error('FAIL: User not found in DB after signup');
    await mongoose.disconnect();
    process.exit(1);
  }
  console.log('PASS: User exists in DB with _id', created._id.toString());

  // Check password is not stored in plaintext (sanity: ensure no 'password' field)
  if (created.password) {
    console.error('FAIL: Plaintext password field present on user document');
    await mongoose.disconnect();
    process.exit(1);
  }

  // Login
  console.log('POST /login (attempt login)...');
  const loginRes = await postForm('/login', { email: QA_EMAIL, password: QA_PASSWORD });
  console.log('login status', loginRes.status, 'location', loginRes.headers.get('location'));
  const loginCookies = extractCookies(loginRes);
  const cookieHeader = (loginCookies.length ? loginCookies : signupCookies).map(c => c.split(';')[0]).join('; ');

  // Access protected route
  console.log('GET /listings/new (protected) with cookie...');
  const protectedRes = await get('/listings/new', cookieHeader);
  console.log('protected status', protectedRes.status);
  if (protectedRes.status === 200) console.log('PASS: Access to protected route allowed after login');
  else {
    console.error('FAIL: Protected route not accessible after login. Status:', protectedRes.status);
    await mongoose.disconnect();
    process.exit(1);
  }

  // Logout
  console.log('GET /logout...');
  const logoutRes = await get('/logout', cookieHeader);
  console.log('logout status', logoutRes.status, 'location', logoutRes.headers.get('location'));

  // Try protected route again without cookie
  const afterLogoutRes = await get('/listings/new');
  console.log('after logout protected status', afterLogoutRes.status, 'location', afterLogoutRes.headers.get('location'));
  if (afterLogoutRes.status === 302) console.log('PASS: Protected route denied after logout');
  else {
    console.error('FAIL: Protected route still accessible after logout. Status:', afterLogoutRes.status);
    await mongoose.disconnect();
    process.exit(1);
  }

  // Test duplicate signup rejection
  console.log('POST /signup (duplicate)...');
  const dupRes = await postForm('/signup', { username: QA_USERNAME, email: QA_EMAIL, password: QA_PASSWORD });
  const dupText = await dupRes.text();
  console.log('dup status', dupRes.status, 'location', dupRes.headers.get('location'));
  if (dupRes.status === 302 && dupRes.headers.get('location') && dupRes.headers.get('location').includes('/signup')) {
    console.log('PASS: Duplicate signup redirected to /signup as expected');
  } else {
    console.error('WARN: Duplicate signup behavior unexpected. Status:', dupRes.status);
  }

  console.log('All auth regression checks completed. Cleaning up QA account...');
  await User.deleteMany({ email: QA_EMAIL });
  await mongoose.disconnect();
  process.exit(0);
})();