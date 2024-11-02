

const SearchSection = ({getWeatherDetails, searchInputRef}) => {
  const API_Key= import.meta.env.VITE_API_KEY;


  const handleCitySearch =(e) =>{
    e.preventDefault();
    const searchInput=e.target.querySelector(".search-input");
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_Key}&q=${searchInput.value}&days=2`;
    
    
    getWeatherDetails(API_URL);//fetching weather details for the city
  };

  const handleLocationSearch=()=>{
    navigator.geolocation.getCurrentPosition(
      position=>{
        const { latitude, longitude}=position.coords;
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_Key}&q=${latitude},${longitude}&days=2`;
    
    
         getWeatherDetails(API_URL);//fetching weather details for current city
        window.innerWidth >=768 && searchInputRef.current.focus();

      },
      ()=>{
        alert ("Location access denied. Please enable permission to use this feature...");
      }
    )
  }





  return (
  <div className="search-section">
   <form action="#" className="search-form" onSubmit={handleCitySearch}>
    <span className="material-symbols-rounded">search</span>
      <input type="search" placeholder="Enter a City name" ref={searchInputRef} className="search-input" required/>
    </form>
  <button className="location-button" onClick={handleLocationSearch}>
    <span className="material-symbols-rounded">my_location</span>
  </button>    
  </div>
  )
}

export default SearchSection