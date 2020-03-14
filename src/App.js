import React from 'react';
function App() {
  let date = new Date();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[date.getDay()];
  let month = months[date.getMonth()];

  window.addEventListener("load",()=>{
    let lat,long
    let tempdesc = document.querySelector('.temp')
    let summ = document.querySelector('.weather')
    let zone = document.querySelector('.location')
    let button = document.querySelector('.conv-btn')
    let buttonToF= document.querySelector(".convback-btn")
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
        long=position.coords.longitude;
        lat=position.coords.latitude;
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const api = `${proxy}https://api.darksky.net/forecast/2042d57909f681f7fc84a5b6d0166b9f/${lat},${long}`;
        
        fetch(api)
      .then(res=>{return res.json()})
      .then(data => {console.log(data);
      const{temperature} =data.currently
      
      //manipolo il dom
      tempdesc.textContent = temperature + " °F"
      summ.textContent = data.daily.summary
      zone.textContent = data.timezone
      button.addEventListener("click",()=>{
        tempdesc.textContent = Math.round((temperature-32)*5/9) + " °C"
      })
      buttonToF.addEventListener("click",()=>{
        tempdesc.textContent = temperature + " °F"
      })
  
    
    });
      
      });
      
    }
  });
    
   
  
  
  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="type a location..."
          ></input>
        </div>
        <div className="location-box">
          <div className="location"></div>
          <div className="date">
            {day} {date.getDate()} {month} {date.getFullYear()}
          </div>
        </div>
        <div className="weather-box">
          <div className="temp"> </div>
          <div className="converter">
            <button className ="conv-btn"type="button">Convert to Celsius</button>
            <button className="convback-btn" type="button">Convert to Fahrenheit</button>
            </div>
          <div className="weather"></div>
        </div>
      </main>
    </div>
  );
}
export default App;
