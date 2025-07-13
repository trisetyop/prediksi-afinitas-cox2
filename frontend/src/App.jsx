import { useState } from 'react';
import './App.css';

const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

function App() {
  const [smiles, setSmiles] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setPredictions([]);
    setError(null);

    const smilesList = smiles.split('\n').filter(s => s.trim() !== '');

    if (smilesList.length === 0) {
      setError('Please enter at least one SMILES string.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ smiles_list: smilesList }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      setPredictions(data.predictions.map((p, i) => ({ 
        smiles: smilesList[i], 
        affinity: p !== null ? p.toFixed(3) : 'Invalid SMILES'
      })));

    } catch (error) {
      console.error('Error fetching predictions:', error);
      setError(`Failed to fetch predictions. ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <main>
        <header className="App-header">
          <h1>Prediksi Afinitas COX-2</h1>
          <p>Model ini menggunakan algoritma random forest dalam prediksi.</p>
          <p>RMSE: 1.253 kcal/mol | R² Score: 0.555</p>
          <img src="/cox2.png" alt="COX-2" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} />
          <p>Masukkan satu atau lebih string SMILES untuk memprediksi afinitas pengikatan.</p>
        </header>
        <form onSubmit={handleSubmit}>
          <textarea
            value={smiles}
            onChange={(e) => setSmiles(e.target.value)}
            placeholder="Contoh: O=C1NC(=O)C2(CCCCC2)C(=O)N1\nClc1ccc2oc3c(Cl)c(Cl)ccc3c2c1"
            rows="8"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Predicting...' : 'Predict Affinity'}
          </button>
        </form>

        {isLoading && <Loader />}

        {error && <p className="error-message">{error}</p>}

        {predictions.length > 0 && (
          <div className="results">
            <h2>Hasil Prediksi</h2>
            <table>
              <thead>
                <tr>
                  <th>SMILES String</th>
                  <th>Prediksi Afinitas (kcal/mol)</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((pred, index) => (
                  <tr key={index}>
                    <td>{pred.smiles}</td>
                    <td>{pred.affinity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
