# Deployment Guide

## Quick Start Deployment (Render, Railway, Heroku, etc.)

### 1. Prerequisites
- GitHub account with this repo
- Hosting account (Render, Railway, Heroku, etc.)
- MongoDB Atlas cluster
- Cloudinary account

### 2. Set Environment Variables
Upload these to your hosting platform:
```
MONGO_URL=your_mongodb_url
SESSION_SECRET=generate_random_string
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
NODE_ENV=production
```

### 3. Deploy with Git
```bash
git init
git add .
git commit -m "Deploy Homify app"
git push origin main
```

### 4. Platform-Specific Steps

#### Render.com
1. Connect GitHub repo
2. Select "Node" runtime
3. Build command: `npm install`
4. Start command: `node app.js`
5. Add environment variables
6. Deploy

#### Railway.app
1. Create new project
2. Connect GitHub
3. Add environment variables
4. Railway auto-detects Node.js
5. Deploy

#### Heroku
```bash
heroku login
heroku create your-app-name
heroku config:set MONGO_URL=your_url
heroku config:set SESSION_SECRET=your_secret
git push heroku main
heroku logs --tail
```

### 5. Post-Deployment
- [ ] Test signup/login at your domain
- [ ] Try uploading a property
- [ ] Create a review
- [ ] Check all links work
- [ ] Monitor logs for errors
- [ ] Setup monitoring/alerts

### 6. Custom Domain (Optional)
- Update DNS records with hosting provider
- Add domain to your platform settings
- Enable SSL certificate

## Troubleshooting

### 503 Service Unavailable
- Check MongoDB connection
- Verify environment variables
- Check logs for errors
- Restart dyno/pod

### Image Upload Not Working
- Verify Cloudinary credentials
- Check file size
- Verify allowed formats
- Check storage quota

### Login Issues
- Check SESSION_SECRET is set
- Verify MongoDB is connected
- Check session store in MongoDB

## Monitoring
- Set up error tracking (Sentry)
- Monitor application performance
- Review logs regularly
- Track user feedback

## Backups
- MongoDB Atlas auto-backups
- Configure regular snapshots
- Test restore ability
- Document backup procedure
