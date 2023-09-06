

let temp = true;
let langcheck = true;
let units = "metric";
let deg = 'C';
let lang = "en";
const key = "f3235dbeb9fdc1ab93a096f065be613f";
let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&lang=${lang}&APPID=${key}`;
let forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${''}&lon=${''}&units=${units}&lang=${lang}&appid=${key}`;
let geocodeAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${key}`;

const app = {
    init: () => {
        const form = document.getElementById("data");
        const checkboxTemp = document.getElementById("checkTemp");
        const checkboxLang = document.getElementById("checkLang");
        checkboxTemp.addEventListener("change", app.changeTemp);
        checkboxLang.addEventListener("change", app.changeLang);
        form.addEventListener("submit", app.formSubmitted);
        
    },
    formSubmitted: (event) => {
        event.preventDefault();
        let search = event.target[0].value;
        app.getWeather(search);
        
    },
    
    getWeather: (location) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&lang=${lang}&APPID=${key}`).then((resp) => {
            if (!resp.ok) throw new Error(document.getElementById("main-weather").innerHTML = resp.statusText, document.getElementById("forecast-flex").innerHTML = `<h1>${resp.statusText}</h1>` );
            return resp.json();
        }).then((data) => {
            app.getForecast(data)
            app.showWeather(data);
        }).catch(console.error);
    },
    getForecast: (data) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=${units}&lang=${lang}&appid=${key}`).then((resp) => {
            if (!resp.ok) throw new Error(document.getElementById("forecast-flex").innerHTML = `<h1>${resp.statusText}</h1>`);
            return resp.json();
        }).then((data) => {
            app.showForecast(data);
        }).catch(console.error);
    },
    showWeather: (data) => {
        let show = document.getElementById('main-weather');
        show.innerHTML = `<section>
        <div><h2 id="location">${data.name + ", " + data.sys.country}</h2></div>
        </section>
        <section>
          <div><p id="date">${new Date(data.dt * 1000).toDateString()}</p></div>
        
        </section>
          <img src=" https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt=${data.weather[0].description}>
          <h2>${data.weather[0].description}</h2>
          <div id="weather-content">
        
              <p>High: ${data.main.temp_max}&deg;${deg} Low: ${data.main.temp_min}&deg;${deg}</p>
              <p>Feels like: ${data.main.feels_like}&deg;${deg}</p>
              <p>Wind: ${data.wind.speed}m/s, ${data.wind.deg}&deg;</p>
              <p>Humidity: ${data.main.humidity}%</p>
              <p>Pressure: ${data.main.pressure}mb</p>
              <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toTimeString()}</p>
              <p>Sunset: ${new Date(data.sys.sunset * 1000).toTimeString()}</p>
          </div>`;
        
    },
    showForecast: (data) => {
        let card = document.getElementById('forecast-flex');
        card.innerHTML = data.list.map((day, index) => {if(index % 8 === 0 && index <= 24 && index >= 8) {return `<div class="forecast-card">
        <section>
              <div><h2>${new Date(day.dt * 1000).toDateString()}</h2></div>
            
            </section>
            
              <img src=" https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt=${day.weather[0].description}>
              <h2>${day.weather[0].description}</h2>
              <div>
                <p id="main-temp">${day.main.feels_like}&deg;${deg}</p>
                <p id="hilo-temp">${day.main.temp_min}&deg;${deg} / ${day.main.temp_max}&deg;${deg}</p>
              </div>
    </div>`;}})
    },
    changeTemp: () => {
        temp = !temp;
        if (temp === false) {
            deg = 'F';
            units = "imperial";
        }
        else{
            deg = 'C';
            units = "metric";
        }
        app.getWeather(document.getElementById('search').value);
    },
    changeLang: () => {
        langcheck = !langcheck;
        if (langcheck === false) {
            lang = 'he';
            
        }
        else{
            lang = 'en';
            
        }
        app.getWeather(document.getElementById('search').value);
    }


}
app.init();