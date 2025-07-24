# 🚀 VMA Prediction System - Clean Deployment

A complete, deployment-ready VMA (Voids in Mineral Aggregate) prediction system with ExtraTrees Approach 3 model.

## 📁 Project Structure

```
VMA-Deployment/
├── frontend/          # Next.js frontend for Vercel
├── backend/           # FastAPI backend for PythonAnywhere
├── models/            # ML model files
└── README.md
```

## 🎯 Features

- **ExtraTrees Approach 3 Model** (R² = 0.6944)
- **13 Optimized Features** (mix design + full gradation)
- **Live Gradation Visualization** with Chart.js
- **Professional Web Interface** with Tailwind CSS
- **Your Logo** prominently displayed
- **Real-time Predictions** with confidence levels

## 🚀 Quick Deployment

### Frontend (Vercel)
1. Deploy `frontend/` folder to Vercel
2. Add your logo to `frontend/public/`
3. Set environment variable: `NEXT_PUBLIC_BACKEND_URL`

### Backend (PythonAnywhere)
1. Upload `backend/` folder to PythonAnywhere
2. Configure WSGI file
3. Update CORS with your Vercel URL

## 📊 Model Performance
- **R² Score**: 0.6944
- **RMSE**: 0.5828
- **Features**: 13 (mix design + gradation)
- **Model Type**: ExtraTrees Regressor

## 🔧 Technologies
- **Frontend**: Next.js, React, Chart.js, Tailwind CSS
- **Backend**: FastAPI, Python, scikit-learn
- **Deployment**: Vercel (frontend), PythonAnywhere (backend)

## 📝 License
MIT License - Feel free to use and modify! 