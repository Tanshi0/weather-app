import { useState, useEffect } from "react";

import '@mantine/carousel/styles.css';
import { Carousel } from '@mantine/carousel';
import styles from './app.module.css';

const API = "https://api.open-meteo.com/v1/forecast?latitude=55.0415&longitude=82.9346&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&start_date=2023-12-04&end_date=2023-12-06"

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
      <h1 style={{textAlign: "center", color: "#103661"}}>Weather App</h1>

      {
        weather.data &&
        <Carousel {...sliderStyle}>
          {
            weather.data.daily.time.map((item, index) => (
              <Carousel.Slide key={index}>
                <p style={{color: "#bcd1e8", fontSize: "10px",display: "flex", justifyContent: "center" ,padding: "10px"}}>{item}</p>
                <p style={{color: "#bcd1e8", fontWeight: "bold", fontSize: "20px",display: "flex", justifyContent: "center",alignItems: "center"}}>
                  СРЕДНЯЯ ТЕМПЕРАТУРА : 
                    </p>

                    <p style={{color: "#e03a3a", fontWeight: "bold", fontSize: "60px", display: "flex", justifyContent: "center",alignItems: "center"}}>
                    {index === 1 && weather.data.current.temperature_2m} °C
                    </p>


                <p style={{color: "#bcd1e8", fontWeight: "bold", fontSize: "15px",display: "flex", 
                justifyContent:"space-between", paddingLeft: "40px", paddingRight: "40px"}}>

                <p>максимальная температура: {weather.data.daily.temperature_2m_max[index]}</p>
                <p>минимальная температура: {weather.data.daily.temperature_2m_min[index]}</p>

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