import './WeatherInformations5Days.css';

function WeatherInformations5Days({ weather5Days }) {
  let dailyForecasts = {};
  const today = new Date().toLocaleDateString('pt-BR');

  // Filtra apenas um registro por dia, ignorando o dia atual
  for (let forecast of weather5Days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString('pt-BR');
    if (date !== today && !dailyForecasts[date]) {
      dailyForecasts[date] = forecast;
    }
  }

  // Pega apenas os próximos 5 dias
  const next5DaysForecast = Object.values(dailyForecasts).slice(0, 5);

  function formatDate(forecast) {
    const date = new Date(forecast.dt * 1000);
    const options = { weekday: 'long', day: '2-digit' };
    return date.toLocaleDateString('pt-BR', options);
  }

  return (
    <div className="weather--container">
      <p>Previsão Próximos 5 Dias</p>
      <div className="weather--days">
        {next5DaysForecast.map(forecast => (
          <div key={forecast.dt} className="weather--card">
            <p>{formatDate(forecast)}</p>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt={forecast.weather[0].description}
              className="weather--icon"
            />
            <p>{forecast.weather[0].description}</p>
            <p>
              {Math.round(forecast.main.temp_min)}°C min /{' '}
              {Math.round(forecast.main.temp_max)}°C máx
            </p>
            <p>Sensação: {Math.round(forecast.main.feels_like)}°C</p>
            <p>Umidade: {forecast.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherInformations5Days;
