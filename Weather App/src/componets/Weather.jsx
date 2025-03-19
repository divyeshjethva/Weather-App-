import React, { useEffect, useRef, useState } from "react";
import rain_icon from "../assets/rain.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import search_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [Weather, setWeather] = useState(false);

  const allIcon = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "010d": rain_icon,
    "010n": rain_icon,
    "013d": snow_icon,
    "013n": snow_icon,
  };

  const API_key = "3a002d014df972b3e7ebf15416e8d341";
  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;

      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      //   console.log(Math.floor(data.main.temp));
      //   console.log(i);
      const icon = allIcon[data.weather[0].icon] || clear_icon;
      setWeather({
        name: data.name,
        humidity: data.main.humidity,
        temp: data.main.temp,
        windSpeed: data.wind.speed,
        weather: data.weather.description,
        country: data.sys.country,
        pressure: data.main.pressure,
        main: data.weather[0].main,
        visibility: data.visibility,
        description: data.weather[0].description,
        icon: icon,
      });
    } catch (error) {
      console.log("hell");
    }
  };

  // useEffect(() => {
  //   search("london");
  // });

  let date = new Date();
  //   console.log(date.toLocaleDateString);

  return (
    <>
      <div className="container">
        <div className="weather-container">
          {/* <h1>{Weather.name}</h1> */}
          <div className="part-one">
            <div className="place-container">
              <h1>Connaught Place</h1>
              <span>IN</span>
            </div>
            <div className="date-time">
              <div className="date-con">
                <div className="time">01:50:01</div>
                <div className="date">Tuesday, 19 May 2020</div>
              </div>
              <h1 className="cel">32℃</h1>
            </div>
          </div>
          <div className="part-two">
            <img src={Weather.icon} width="150" alt="" />
            <div className="weather-main">{Weather.main}</div>
            <hr className="hr-1" />
            <div className="search-bar">
              <input ref={inputRef} type="text" placeholder="search any city" />
              <img
                src={search_icon}
                onClick={() => search(inputRef.current.value)}
              />
            </div>
            <div className="weather-location">
              {Weather.name},{Weather.country}
            </div>
            <hr />
            <div className="weather-details">
              <div className="details-oo">
                <span className="padding-left">Temperature</span>
                <span>
                  {Weather.temp} ℃ ({Weather.main})
                </span>
              </div>
              <hr />
              <div className="details-oo">
                <span className="padding-left">Humidity</span>
                <span>{Weather.humidity}</span>
              </div>
              <hr />
              <div className="details-oo">
                <span className="padding-left">visibility</span>
                <span>{Weather.visibility}</span>
              </div>
              <hr />
              <div className="details-oo">
                <span className="padding-left">Wind speed</span>
                <span>{Weather.windSpeed}</span>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
