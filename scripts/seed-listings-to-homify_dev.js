const mongoose = require('mongoose');
const Listing = require('../models/listing');
const initData = require('../init/data');
const User = require('../models/user');

const MONGO = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/homify_dev';

(async function main(){
  try{
    console.log('Connecting to', MONGO);
    await mongoose.connect(MONGO);
    console.log('Connected');

    // choose an owner if available
    const anyUser = await User.findOne().lean();
    const ownerId = anyUser ? anyUser._id : undefined;
    if (!initData || !Array.isArray(initData)){
      console.error('init/data did not export array directly; trying init/data.data');
    }
    const dataArray = initData.data || initData;
    if (!Array.isArray(dataArray)){
      console.error('No data array found in init/data.js');
      process.exit(1);
    }

    const docs = dataArray.map(obj => {
      const copy = { ...obj };
      if (ownerId) copy.owner = ownerId;
      return copy;
    });

    const inserted = await Listing.insertMany(docs);
    console.log('Inserted', inserted.length, 'listings');
    await mongoose.disconnect();
    process.exit(0);
  }catch(e){
    console.error('Error seeding listings:', e);
    await mongoose.disconnect();
    process.exit(1);
  }
})();
