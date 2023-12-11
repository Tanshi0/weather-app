import { useState, useEffect } from "react";

import '@mantine/carousel/styles.css';
import { Carousel } from '@mantine/carousel';
import { FaTemperatureHigh } from "react-icons/fa";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";


const API = "https://api.open-meteo.com/v1/forecast?latitude=55.0415&longitude=82.9346&current=cloud_cover,&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min,&current=wind_speed_10m&daily=wind_speed_10m_max,wind_gusts_10m_max,&timezone=auto&start_date=2023-12-11&end_date=2023-12-13"

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const sliderStyle = {
  initialSlide: 1, 
  slideSize: "50%",
  slideGap: "md",
  withIndicators: false,
  includeGapInSize: false,

  styles: {
    slide: {
      background: " -webkit-linear-gradient(180deg, rgb(98, 162, 197) 25%, rgb(102, 135, 199))",
      borderRadius: "20px",
      height: '400px',

      
      

    },
    elements: {
      color: "black", 
      fontWeight: "bold", 
      fontSize: "20px",
      display: "flex", 
      justifyContent: "center",
      alignItems: "center"
    }
  }
}

function App() {

  const [weather, setWeather] = useState({});

  const getData = () => {
    setWeather({...weather, isLoading: true});

    return fetch(`${API}`)
      .then(checkReponse)
      .then(response => setWeather( {...weather, data: response, isLoading: false, hasError: false} ))
      .catch(e => setWeather({...weather, loading: false, hasError: true}));
  }

  useEffect(() => {
    getData();
  }, []);

  if (weather.data) {
    console.log(weather.data);
  }

  return (
    <>
      <h1 style={{textAlign: "center", color: "#2d355e", fontWeight: "bold", fontSize: "50px"}}>Weather App</h1>

      {
        weather.data &&
       
        <Carousel {...sliderStyle}>
          {
            weather.data.daily.time.map((item, index) => (
              <Carousel.Slide key={index}>

                <p style={{color: "#bcd1e8", fontSize: "10px",display: "flex", justifyContent: "center" ,padding: "10px"}}>{item},
                Сегодня</p>
               {index === 1 &&(
                <>
                
                
                  <p style={{color: "#bcd1e8", fontWeight: "bold", fontSize: "20px",display: "flex",alignItems: "center", paddingLeft: "120px", overflow: 'hidden'}}>

                  СРЕДНЯЯ ТЕМПЕРАТУРА : 
                
                    </p>
                    

                    <p style={{color: "#2f419c", fontWeight: "bold", fontSize: "60px", display: "flex",alignItems: "center", paddingLeft: "120px", overflow: 'hidden'}}>
                    <FaTemperatureHigh /> {weather.data.current.temperature_2m } <span style={{fontSize: "36px", paddingLeft: "20px"}}>°C</span>
                    <span style={{fontSize: "24px", color: "#bcd1e8", paddingLeft: "20px", paddingLeft: "90px", overflow: 'hidden'}}>  <FaWind /> <span>скорость ветра:   </span>{weather.data.current.wind_speed_10m} м/с</span>
                </p>
                    
                  <p style={{color: "#bcd1e8", fontWeight: "bold", fontSize: "15px",display: "flex", 
                justifyContent:"space-between", paddingLeft: "120px", paddingRight: "50px", overflow: 'hidden'}}>
                  

                <p><FaTemperatureArrowUp />   максимальная температура: {weather.data.daily.temperature_2m_max[index]} °C</p>
                <p><FaTemperatureArrowDown />   минимальная температура: {weather.data.daily.temperature_2m_min[index]}  °C</p>
                <p style={{color: "#bcd1e8", fontWeight: "bold", fontSize: "20px",display: "flex",justifyContent: "right", paddingRight: "40px"}}>

                </p>

                </p>
                
                </>

               )}



                <p style={{color: "#bcd1e8", fontWeight: "bold", fontSize: "28px", paddingLeft: "60px", paddingTop: "20px"}}>

                <p><FaTemperatureArrowUp /> максимальная температура: 
                  <span style={{color: "#2f419c", fontWeight: "bold", fontSize: "50px", paddingLeft: "20px"}}>
                   {weather.data.daily.temperature_2m_max[index]}<span style={{fontSize: "36px", paddingLeft: "20px"}}>°C</span></span>
                   </p>
                <p><FaTemperatureArrowDown />  минимальная температура: 
                   <span style={{color: "#2f419c", fontWeight: "bold", fontSize: "50px", paddingLeft: "20px"}}>
                    {weather.data.daily.temperature_2m_min[index]}<span style={{fontSize: "36px", paddingLeft: "20px"}}>°C</span></span>
                   </p>

                </p>
                
                
                
              </Carousel.Slide>
            ))
          }
        </Carousel>
      }

    </>
  );
}
export default App