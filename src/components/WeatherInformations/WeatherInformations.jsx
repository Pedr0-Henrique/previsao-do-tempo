import './WeatherInformations.css';



function WeatherInformations({ weather }) {
    if (!weather || !weather.weather || !weather.weather[0]) {
        return null; 
    }

    return (
      <div className='weather-container'>
          <div className="weather-informations">
            <h2>{weather.name}</h2>
            <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="Ícone do clima"
            />
            <div>
                <p className='temperature'>Temperatura: {Math.round(weather.main.temp)}°C</p>
                <p className='description'>Descrição: {weather.weather[0].description}</p>
            </div>

            <div className='details'>
                <p>Sensaçao termica: {Math.round(weather.main.feels_like)}</p>
                <p>Umidade: {weather.main.humidity}%</p>
                
            </div>
        </div>
      </div>
    );
}

export default WeatherInformations;
