import { useState } from "react"
import { useRef } from "react"
import CurrentWeather from "./components/CurrentWeather"
import HourlyWeatherItem from "./components/HourlyWeatherItem"
import SearchSection from "./components/SearchSection"
import { weatherCodes } from "./constants"
import NoResultsDiv from "./components/NoResultsDiv"
import { useEffect } from "react"

const App = () => {
  const API_Key= import.meta.env.VITE_API_KEY;

  const[currentWeather, setCurrentWeather]=useState({});
  const[hourlyForecast, setHourlyForecasts]=useState([]);
  const [hasNoResults,setHasNoResults]=useState(false);
  const searchInputRef = useRef (null);


  const filterHourlyForecast=(hourlyData)=>{
    const currentHour=new Date().setMinutes(0,0,0);
    const next24Hours = currentHour +24*60*60*1000;



    const next24HoursData =hourlyData.filter(({time})=>{
      const forecastTime=new Date(time).getTime();
      return forecastTime >=currentHour && forecastTime<=next24Hours;


    });
    setHourlyForecasts(next24HoursData)
  };


  const getWeatherDetails = async(API_URL)=>{
    setHasNoResults(false);
    window.innerWidth <=768 && searchInputRef.current.focus();



    try{

      const response = await fetch(API_URL);
      if(!response.ok)throw new Error();
      const data= await response.json();

      const temperature =Math.floor(data.current.temp_c);
      const description =data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find(icon=>weatherCodes[icon].includes(data.current.condition.code));
      const humidity = data.current.humidity; 
      const windSpeed = data.current.wind_kph;

      setCurrentWeather({temperature, description,weatherIcon,humidity,windSpeed});
      const combinedHourlyData=[...data.forecast.forecastday[0].hour,...data.forecast.forecastday[1].hour]
      
      searchInputRef.current.value=data.location.name;
      filterHourlyForecast(combinedHourlyData);



    } catch{
      setHasNoResults(true);
    }

  };

  //fetch default city(Colombo) weather data on initial render
  useEffect(()=>{
    const defaultCity= "Colombo";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_Key}&q=${defaultCity}&days=2`;
    getWeatherDetails(API_URL);

  },[API_Key]);




  return (
    <div className="container">
      {/* search section*/}
      <SearchSection getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef}/>
      
      {/*Conditionally render based on hasNoResult state*/}
      {hasNoResults ?(
        <NoResultsDiv/>
        
      ):(
        <div className="weather-section">
        <CurrentWeather currentWeather={ currentWeather}/>
         {/* hourly weather forcast list*/}
         <div className="hourly-forcast">
           <ul className="weather-list">
             {hourlyForecast.map(hourlyWeather =>(
               <HourlyWeatherItem key={hourlyWeather.time_epoch}hourlyWeather={hourlyWeather}/>
           ))}
           </ul>
         </div>
       </div>

      )
    }

          
        
    </div>
  )
}

export default App
