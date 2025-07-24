# 🚀 Quick Setup Guide

## 📋 Prerequisites
- GitHub account
- Vercel account
- PythonAnywhere account
- Your trained model files

## ⚡ Quick Start

### 1. Copy Model Files
```bash
# From your original ModelPaper directory
cp extratrees_model.pkl ../VMA-Deployment/backend/models/
cp extratrees_scaler.pkl ../VMA-Deployment/backend/models/
cp extratrees_model_info.pkl ../VMA-Deployment/backend/models/
```

### 2. Add Your Logo
- Place your logo as `frontend/public/logo.png`

### 3. Create GitHub Repository
```bash
cd ../VMA-Deployment
git init
git add .
git commit -m "Initial VMA prediction system"
git branch -M main
git remote add origin https://github.com/YourUsername/VMA-Deployment.git
git push -u origin main
```

### 4. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your `VMA-Deployment` repository
4. Set root directory to `frontend`
5. Deploy!

### 5. Deploy Backend to PythonAnywhere
1. Go to [pythonanywhere.com](https://pythonanywhere.com)
2. Upload `backend/` folder
3. Configure WSGI file
4. Reload web app

### 6. Connect Frontend & Backend
1. Set environment variable in Vercel: `NEXT_PUBLIC_BACKEND_URL`
2. Update CORS in PythonAnywhere backend
3. Redeploy frontend

## 🎯 What You'll Get
- ✅ Your logo prominently displayed
- ✅ Live gradation curve visualization
- ✅ Professional web interface
- ✅ Real-time VMA predictions
- ✅ Mobile-responsive design

## 📞 Need Help?
Check the full `DEPLOYMENT_GUIDE.md` for detailed instructions! 