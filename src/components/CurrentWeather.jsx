

const CurrentWeather = ({currentWeather}) => {
  return (
    <div className="current-weather">
    <img src={`icons/${currentWeather.weatherIcon}.svg`} className="weather-icon"/>
    <h2 className="temperature">{currentWeather.temperature}<span>°C</span></h2>
    <div className="weather-description-box">
    <p className="description">{currentWeather.description}</p>
    <p className="humidity">Humidity : {currentWeather.humidity}%</p>
    <p className="wind-speed">Wind Speed : {currentWeather.windSpeed} kmh</p>
    </div>

    
    
     </div>
  )
}

export default CurrentWeather