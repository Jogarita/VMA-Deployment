import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import axios from 'axios'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function Home() {
  const [formData, setFormData] = useState({
    RAP_PERCENT: 10.0,
    AC: 5.0,
    GSB: 2.65,
    PASS_19: 95,
    PASS_12_5: 85,
    PASS_9_5: 70,
    PASS_4_75: 50,
    PASS_2_36: 30,
    PASS_1_18: 20,
    PASS_0_6: 15,
    PASS_0_3: 10,
    PASS_0_15: 5,
    PASS_0_075: 3,
  })

  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [modelInfo, setModelInfo] = useState(null)

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    // Fetch model information on component mount
    fetchModelInfo()
  }, [])

  const fetchModelInfo = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/model-info`)
      if (response.data.success) {
        setModelInfo(response.data.model_info)
      }
    } catch (error) {
      console.error('Error fetching model info:', error)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await axios.post(`${backendUrl}/predict`, formData)
      setPrediction(response.data)
    } catch (error) {
      console.error('Prediction error:', error)
      alert('Error making prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Gradation chart data
  const gradationData = {
    labels: ['19mm', '12.5mm', '9.5mm', '4.75mm', '2.36mm', '1.18mm', '0.6mm', '0.3mm', '0.15mm', '0.075mm'],
    datasets: [
      {
        label: 'Percent Passing (%)',
        data: [
          formData.PASS_19,
          formData.PASS_12_5,
          formData.PASS_9_5,
          formData.PASS_4_75,
          formData.PASS_2_36,
          formData.PASS_1_18,
          formData.PASS_0_6,
          formData.PASS_0_3,
          formData.PASS_0_15,
          formData.PASS_0_075,
        ],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        tension: 0.1,
      },
    ],
  }

  const gradationOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Gradation Curve' },
    },
    scales: {
      x: {
        type: 'category',
        title: { display: true, text: 'Sieve Size (mm)' },
      },
      y: {
        title: { display: true, text: 'Percent Passing (%)' },
        min: 0,
        max: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-full p-4 mx-auto w-32 h-32 flex items-center justify-center shadow-lg">
              <img 
                src="/logo_VMA.png" 
                alt="VMA Prediction System Logo" 
                className="w-24 h-24"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">VMA Prediction System</h1>
          <p className="text-xl opacity-90">ExtraTrees Approach 3 Model - Advanced Asphalt Mix Design Analysis</p>
        </div>
      </div>

      {/* Model Performance Cards */}
      {modelInfo && (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Model Type</h3>
                <p className="text-2xl font-bold text-blue-600">ExtraTrees</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">R² Score</h3>
                <p className="text-2xl font-bold text-green-600">{modelInfo.r2_score}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">RMSE</h3>
                <p className="text-2xl font-bold text-orange-600">{modelInfo.rmse}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Mix Design Parameters</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mix Design Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Mix Design Features</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RAP Percentage (%)
                    </label>
                    <input
                      type="number"
                      value={formData.RAP_PERCENT}
                      onChange={(e) => handleInputChange('RAP_PERCENT', e.target.value)}
                      min="0"
                      max="100"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asphalt Content (%)
                    </label>
                    <input
                      type="number"
                      value={formData.AC}
                      onChange={(e) => handleInputChange('AC', e.target.value)}
                      min="3"
                      max="8"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gsb
                    </label>
                    <input
                      type="number"
                      value={formData.GSB}
                      onChange={(e) => handleInputChange('GSB', e.target.value)}
                      min="2"
                      max="3"
                      step="0.001"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Gradation Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Gradation (% Passing)</h3>
                <div className="space-y-4">
                  {[
                    { key: 'PASS_19', label: '19mm Sieve (%)', min: 90, max: 100 },
                    { key: 'PASS_12_5', label: '12.5mm Sieve (%)', min: 70, max: 95 },
                    { key: 'PASS_9_5', label: '9.5mm Sieve (%)', min: 55, max: 85 },
                    { key: 'PASS_4_75', label: '4.75mm Sieve (%)', min: 35, max: 65 },
                    { key: 'PASS_2_36', label: '2.36mm Sieve (%)', min: 20, max: 45 },
                    { key: 'PASS_1_18', label: '1.18mm Sieve (%)', min: 12, max: 35 },
                    { key: 'PASS_0_6', label: '0.6mm Sieve (%)', min: 8, max: 25 },
                    { key: 'PASS_0_3', label: '0.3mm Sieve (%)', min: 5, max: 18 },
                    { key: 'PASS_0_15', label: '0.15mm Sieve (%)', min: 3, max: 12 },
                    { key: 'PASS_0_075', label: '0.075mm Sieve (%)', min: 2, max: 8 },
                  ].map(({ key, label, min, max }) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {label}
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="number"
                          value={formData[key]}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                          min={min}
                          max={max}
                          step="0.1"
                          className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <span className="text-sm text-gray-600">%</span>
                        <input
                          type="range"
                          value={formData[key]}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                          min={min}
                          max={max}
                          step="0.1"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? '🚀 Predicting...' : '🚀 Predict VMA'}
              </button>
            </form>
          </div>

          {/* Gradation Chart */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 Live Gradation Curve</h2>
            <div className="relative" style={{ height: '400px' }}>
              <Line data={gradationData} options={gradationOptions} key="gradation-chart" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Gradation Summary</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {gradationData.labels.map((label, index) => (
                  <div key={label} className="flex justify-between">
                    <span className="font-medium">{label}:</span>
                    <span>{gradationData.datasets[0].data[index]}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-4">🎯 Prediction Result</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Predicted VMA</h3>
                  <p className="text-3xl font-bold text-green-600">{prediction.predicted_vma}%</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Confidence</h3>
                  <p className="text-2xl font-bold text-blue-600">{prediction.confidence}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Model</h3>
                  <p className="text-xl font-bold text-purple-600">ExtraTrees Approach 3</p>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Predicted on: {prediction.timestamp}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75">VMA Prediction System - ExtraTrees Approach 3 Model</p>
          <p className="text-xs opacity-50 mt-1">Advanced Asphalt Mix Design Analysis</p>
        </div>
      </footer>
    </div>
  )
} 