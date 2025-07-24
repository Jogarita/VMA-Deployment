from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import os
from datetime import datetime

# Load the trained model and scaler
print("Loading model files...")
try:
    model = joblib.load('models/extratrees_model.pkl')
    scaler = joblib.load('models/extratrees_scaler.pkl')
    model_info = joblib.load('models/extratrees_model_info.pkl')
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None
    scaler = None
    model_info = None

app = FastAPI(
    title="VMA Prediction API", 
    version="1.0.0",
    description="ExtraTrees Approach 3 Model for VMA Prediction"
)

# Add CORS middleware - update with your Vercel frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-app-name.vercel.app",  # Replace with your Vercel URL
        "http://localhost:3000",  # For local development
        "*"  # Remove this in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the input model
class MixtureInput(BaseModel):
    RAP_PERCENT: float
    AC: float
    GSB: float
    PASS_19: float
    PASS_12_5: float
    PASS_9_5: float
    PASS_4_75: float
    PASS_2_36: float
    PASS_1_18: float
    PASS_0_6: float
    PASS_0_3: float
    PASS_0_15: float
    PASS_0_075: float

@app.get("/")
async def root():
    if model_info:
        return {
            "message": "VMA Prediction API",
            "version": "1.0.0",
            "model": "ExtraTrees Approach 3",
            "status": "running",
            "performance": {
                "test_r2": round(model_info['performance']['test_r2'], 4),
                "test_rmse": round(model_info['performance']['test_rmse'], 4)
            },
            "deployment": "PythonAnywhere"
        }
    else:
        return {
            "message": "VMA Prediction API",
            "version": "1.0.0",
            "status": "error - model not loaded",
            "deployment": "PythonAnywhere"
        }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy" if model is not None else "error",
        "model_loaded": model is not None,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/predict")
async def predict_vma(input_data: MixtureInput):
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        # Convert input to feature array
        features = [
            input_data.RAP_PERCENT,
            input_data.AC,
            input_data.GSB,
            input_data.PASS_19,
            input_data.PASS_12_5,
            input_data.PASS_9_5,
            input_data.PASS_4_75,
            input_data.PASS_2_36,
            input_data.PASS_1_18,
            input_data.PASS_0_6,
            input_data.PASS_0_3,
            input_data.PASS_0_15,
            input_data.PASS_0_075
        ]
        
        # Reshape for prediction
        X = np.array(features).reshape(1, -1)
        
        # Scale features
        X_scaled = scaler.transform(X)
        
        # Make prediction
        predicted_vma = float(model.predict(X_scaled)[0])
        
        # Determine confidence based on model performance
        test_r2 = model_info['performance']['test_r2']
        if test_r2 > 0.7:
            confidence = "High"
        elif test_r2 > 0.6:
            confidence = "Medium"
        else:
            confidence = "Low"
        
        return {
            "success": True,
            "predicted_vma": round(predicted_vma, 2),
            "confidence": confidence,
            "model_info": {
                "r2_score": round(model_info['performance']['test_r2'], 4),
                "rmse": round(model_info['performance']['test_rmse'], 4),
                "model_type": "ExtraTrees Approach 3"
            },
            "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/api/model-info")
async def get_model_info():
    if model_info:
        return {
            "success": True,
            "model_info": {
                "r2_score": round(model_info['performance']['test_r2'], 4),
                "rmse": round(model_info['performance']['test_rmse'], 4),
                "mae": round(model_info['performance']['test_mae'], 4),
                "model_type": "ExtraTrees Approach 3",
                "feature_count": len(model_info['features']),
                "features": model_info['features']
            }
        }
    else:
        raise HTTPException(status_code=404, detail="Model information not available")

@app.get("/features")
async def get_features():
    if model_info:
        # Group features by category
        mix_design_features = ['RAP_PERCENT', 'AC', 'GSB']
        gradation_features = [f for f in model_info['features'] if f.startswith('PASS_')]
        
        return {
            "mix_design_features": mix_design_features,
            "gradation_features": gradation_features,
            "total_features": len(model_info['features'])
        }
    else:
        raise HTTPException(status_code=404, detail="Feature information not available")

# For PythonAnywhere WSGI compatibility
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 