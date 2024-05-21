import React, { useState, useEffect } from "react";
import DateObject from "react-date-object";
import "../styles/weather.css";

const Weather = () => {
  let [city, setCity] = useState(null);
  let [search, setSearch] = useState("Pune");


useEffect(() => {
    const fetchdata = async () => {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=79e2544d5507203bbc939040248a5845`;

      let res = await fetch(url);
      const data = await res.json();

      setCity({

        city1: data.name,
        temp: data.main.temp,
        img: data.weather[0].icon,
        speed: data.wind.speed,
        
      });
    };
    fetchdata();
  }, [search]);

  var date = new DateObject();
  // console.log(temp)

  let imgsrc = `http://openweathermap.org/img/w/${city?.img}.png`;

  return (
    <div className="weather">
      <div className="inputdata">
        <input
          type="search"
          className="inputField"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>

      <div className="details">
        {!city ? (
          <p>NOT Found</p>
        ) : (
          <div className="inner">
            <div className="temp">
              <p>{city.temp}°</p>
            </div>

            <div className="right">

              <p> 
                Wind Speed : {city.speed} 
              </p>
            

              <img src={imgsrc} alt="condition" />

              <p>{date.format("YYYY/MM/DD hh:mm:ss a")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
