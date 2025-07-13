from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
from rdkit import Chem
from rdkit.Chem import AllChem
from typing import List

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


# Load the trained model
model = joblib.load('model_cox2.pkl')

def smiles_to_fp(smiles, radius=2, nBits=2048):
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        return None
    return np.array(AllChem.GetMorganFingerprintAsBitVect(mol, radius, nBits))

class PredictionRequest(BaseModel):
    smiles_list: List[str]

class PredictionResponse(BaseModel):
    predictions: list

@app.post("/predict/", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    fingerprints = [smiles_to_fp(smi) for smi in request.smiles_list]
    
    # Filter out invalid SMILES
    valid_fingerprints = [fp for fp in fingerprints if fp is not None]
    
    if not valid_fingerprints:
        return {"predictions": []}
        
    predictions = model.predict(np.vstack(valid_fingerprints))
    
    # Map predictions back to the original list, inserting None for invalid SMILES
    result_predictions = []
    fp_idx = 0
    for fp in fingerprints:
        if fp is not None:
            result_predictions.append(predictions[fp_idx])
            fp_idx += 1
        else:
            result_predictions.append(None)

    return {"predictions": result_predictions}
