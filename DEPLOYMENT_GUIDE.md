# 🚀 VMA Prediction System - Deployment Guide

Complete guide to deploy your VMA Prediction System with frontend on Vercel and backend on PythonAnywhere.

## 📁 Project Structure

```
VMA-Deployment/
├── frontend/          # Next.js frontend for Vercel
├── backend/           # FastAPI backend for PythonAnywhere
├── models/            # ML model files (copy from original project)
└── DEPLOYMENT_GUIDE.md
```

## 🔧 Pre-Deployment Setup

### 1. Copy Model Files
```bash
# Copy the trained model files from your original project
cp ../ModelPaper/extratrees_model.pkl VMA-Deployment/backend/models/
cp ../ModelPaper/extratrees_scaler.pkl VMA-Deployment/backend/models/
cp ../ModelPaper/extratrees_model_info.pkl VMA-Deployment/backend/models/
```

### 2. Add Your Logo
1. Place your logo file in `frontend/public/logo.png`
2. The logo will automatically appear in the header

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare GitHub Repository
1. **Create a new GitHub repository** called `VMA-Deployment`
2. **Push your code**:
   ```bash
   cd VMA-Deployment
   git init
   git add .
   git commit -m "Initial VMA prediction system"
   git branch -M main
   git remote add origin https://github.com/YourUsername/VMA-Deployment.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel
1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import your GitHub repository**: `VMA-Deployment`
4. **Configure project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. **Click "Deploy"**

### Step 3: Configure Environment Variables
1. **Go to your Vercel project dashboard**
2. **Settings → Environment Variables**
3. **Add**: `NEXT_PUBLIC_BACKEND_URL` = `https://YourUsername.pythonanywhere.com`

## 🔧 Backend Deployment (PythonAnywhere)

### Step 1: Create PythonAnywhere Account
1. **Go to [www.pythonanywhere.com](https://www.pythonanywhere.com)**
2. **Sign up for a free account**
3. **Verify your email address**

### Step 2: Upload Backend Files
1. **Go to the "Files" tab** in your PythonAnywhere dashboard
2. **Create a new directory** called `vma_backend`
3. **Upload your backend files**:
   - `backend/main.py`
   - `backend/requirements.txt`
   - `backend/models/extratrees_model.pkl`
   - `backend/models/extratrees_scaler.pkl`
   - `backend/models/extratrees_model_info.pkl`

### Step 3: Install Dependencies
1. **Go to the "Consoles" tab**
2. **Start a new Bash console**
3. **Navigate to your project directory**:
   ```bash
   cd vma_backend
   ```
4. **Install requirements**:
   ```bash
   pip install --user -r requirements.txt
   ```

### Step 4: Configure Web App
1. **Go to the "Web" tab**
2. **Click "Add a new web app"**
3. **Choose "Flask"** as the framework
4. **Select Python 3.9** (or latest available)
5. **Set the source code directory** to `/home/YourUsername/vma_backend`
6. **Set the working directory** to `/home/YourUsername/vma_backend`

### Step 5: Configure WSGI File
1. **Click on the WSGI configuration file** link
2. **Replace the content** with:
   ```python
   import sys
   path = '/home/YourUsername/vma_backend'
   if path not in sys.path:
       sys.path.append(path)
   
   from main import app as application
   ```
3. **Save the file**

### Step 6: Update CORS Settings
1. **Edit your `main.py` file** in PythonAnywhere
2. **Update the CORS origins** with your Vercel frontend URL:
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=[
           "https://your-app-name.vercel.app",  # Your Vercel URL
           "http://localhost:3000",  # For local development
       ],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

### Step 7: Reload Web App
1. **Go back to the "Web" tab**
2. **Click "Reload"** button
3. **Your backend will be live** at `YourUsername.pythonanywhere.com`

## 🔗 Connect Frontend to Backend

After deploying the backend, update the frontend environment variable:

1. **Get Backend URL**:
   - PythonAnywhere: `https://YourUsername.pythonanywhere.com`

2. **Update Vercel Environment Variable**:
   - Go to Vercel dashboard → Project Settings → Environment Variables
   - Set `NEXT_PUBLIC_BACKEND_URL` to your backend URL

3. **Redeploy Frontend**:
   - Go to Vercel dashboard → Deployments
   - Click "Redeploy" on the latest deployment

## ✅ Testing Your Deployment

1. **Test Backend**: Visit `https://YourUsername.pythonanywhere.com/`
   - Should show API information
   - Test prediction: `POST /predict`

2. **Test Frontend**: Visit your Vercel URL
   - Should load the VMA prediction interface
   - Test with sample data
   - Check live gradation curve

## 🎨 Features Included

### ✅ Your Logo
- Prominently displayed in the header
- Easy to customize in `frontend/public/`

### ✅ Live Gradation Curve
- Real-time Chart.js visualization
- Interactive sliders for all sieve sizes
- Updates as you adjust parameters

### ✅ Professional Interface
- Modern Tailwind CSS styling
- Responsive design (mobile-friendly)
- Model performance metrics display

## 🔒 Security Considerations

1. **CORS**: Update backend CORS settings with your frontend URL
2. **Environment Variables**: Keep sensitive data in environment variables
3. **Model Protection**: Your model files are safe in the file system

## 🆘 Troubleshooting

### Common Issues:
1. **CORS Errors**: Update backend CORS origins
2. **Model Loading**: Ensure model files are in the correct location
3. **Environment Variables**: Double-check variable names and values
4. **WSGI Errors**: Check the WSGI configuration file

### Support:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- PythonAnywhere: [help.pythonanywhere.com](https://help.pythonanywhere.com)

## 🎉 Success!

Once deployed, your VMA Prediction System will be accessible worldwide at:
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://YourUsername.pythonanywhere.com`

Users can now access your system from anywhere and get VMA predictions using the ExtraTrees Approach 3 model!

## 📊 Model Performance
- **R² Score**: 0.6944
- **RMSE**: 0.5828
- **Features**: 13 (mix design + gradation)
- **Model Type**: ExtraTrees Regressor

Your VMA Prediction System is now live and accessible worldwide! 🌍 