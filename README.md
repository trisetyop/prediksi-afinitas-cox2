# Proyek Prediksi Afinitas Molekuler

Proyek ini adalah aplikasi web lengkap yang memprediksi afinitas pengikatan molekul (dalam kkal/mol) berdasarkan struktur SMILES mereka. Aplikasi ini menggunakan model machine learning yang telah dilatih untuk melakukan prediksi dan menyajikannya melalui antarmuka yang ramah pengguna.

## Fitur

*   **Prediksi Afinitas:** Memprediksi afinitas pengikatan molekul menggunakan model Random Forest.
*   **Antarmuka Web:** Antarmuka frontend yang dibangun dengan React untuk memasukkan SMILES dan melihat hasil prediksi.
*   **Backend API:** Backend yang dibangun dengan FastAPI untuk melayani model machine learning.
*   **Notebook Pelatihan:** Termasuk notebook Jupyter untuk melatih model dari awal.

## Teknologi yang Digunakan

*   **Frontend:**
    *   React
    *   Vite
    *   ESLint
*   **Backend:**
    *   FastAPI
    *   Uvicorn
    *   Scikit-learn
    *   RDKit
    *   Joblib
*   **Pelatihan Model:**
    *   Python
    *   Pandas
    *   NumPy
    *   Scikit-learn
    *   RDKit
    *   Matplotlib
    *   Seaborn
    *   Jupyter Notebook

## Instalasi dan Penggunaan

### Backend

1.  **Buka direktori `backend`:**
    ```bash
    cd backend
    ```

2.  **Instal dependensi:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Jalankan server backend:**
    ```bash
    uvicorn main:app --reload
    ```
    Server akan berjalan di `http://127.0.0.1:8000`.

### Frontend

1.  **Buka direktori `frontend`:**
    ```bash
    cd frontend
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:5173`.

## Titik Akhir API

### `POST /predict/`

Memprediksi afinitas pengikatan untuk daftar SMILES.

*   **URL:** `/predict/`
*   **Metode:** `POST`
*   **Body Permintaan:**
    ```json
    {
      "smiles_list": [
        "CCO",
        "CCC"
      ]
    }
    ```
*   **Respons Sukses:**
    ```json
    {
      "predictions": [
        -5.0,
        -5.5
      ]
    }
    ```

## Pelatihan Model

Model machine learning dilatih menggunakan notebook Jupyter yang ada di direktori `training`. Notebook `pipeline-training.ipynb` mencakup langkah-langkah berikut:

1.  Memuat dataset `smiles_affinity.csv`.
2.  Memfilter dan membersihkan data.
3.  Mengonversi SMILES menjadi sidik jari molekuler.
4.  Melatih model Random Forest Regressor.
5.  Mengevaluasi model menggunakan RMSE dan R² score.
6.  Menyimpan model yang telah dilatih sebagai `model_cox2.pkl`.

## Struktur Proyek

```
.
├── backend/
│   ├── main.py
│   ├── model_cox2.pkl
│   ├── Procfile
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── ...
└── training/
    ├── pipeline-training.ipynb
    └── dataset/
        └── smiles_affinity.csv
```
