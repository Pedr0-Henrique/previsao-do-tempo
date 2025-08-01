import { useState, useRef } from 'react';
import axios from 'axios';
import WeatherInformations from './components/WeatherInformations/WeatherInformations';
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformations5Days';
import './App.css';

function App() {
  const [weather, setWeather] = useState();
  const [weather5Days, setWeather5Days] = useState();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  async function searchCity() {
    try {
      setLoading(true);
      const city = inputRef.current.value.trim();
      if (!city) return;

      const key = import.meta.env.VITE_WEATHER_API_KEY;

      const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
      const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

      // Faz as duas requisições em paralelo
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(urlWeather),
        axios.get(urlForecast),
      ]);

      setWeather(weatherResponse.data);
      setWeather5Days(forecastResponse.data);
    } catch (error) {
      console.error('Erro ao buscar cidade:', error);
      alert('Não foi possível encontrar a cidade. Verifique o nome e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      searchCity();
    }
  }

  return (
    <div className="container">
      <h1>Previsão do Tempo</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Digite o nome da cidade"
        onKeyDown={handleKeyDown}
      />
      <button onClick={searchCity} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>

      {weather && <WeatherInformations weather={weather} />}
      {weather5Days && <WeatherInformations5Days weather5Days={weather5Days} />}
    </div>
  );
}

export default App;
