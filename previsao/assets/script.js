const apiKey = "23e4d2256c67be1ba2c52be135966b95";
const lang = "pt-br";
const units = "metric";

const cardEl = document.querySelector(".card");
const iconEl = document.querySelector(".icon");
const tempEl = document.querySelector("h2");
const fellsLikeEl = document.querySelector(".feels-like span");
const tempMinEl = document.querySelector(".min");
const tempMaxEl = document.querySelector(".max");
const humidityEl = document.querySelector(".humidity span");
const windImgEl = document.querySelector(".wind img");
const windTextEl = document.querySelector(".wind span");
const inputEl = document.querySelector(".input input");
const buttonEl = document.querySelector(".input button");

async function callApi() {
  try {
    const city = inputEl.value || "São Paulo";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`
    );
    const data = await response.json();
    
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    iconEl.src = iconUrl;

    tempEl.innerHTML = Math.round(data.main.temp) + "°";
    fellsLikeEl.innerHTML = Math.round(data.main.feels_like);
    tempMinEl.innerHTML = Math.round(data.main.temp_min);
    tempMaxEl.innerHTML = Math.round(data.main.temp_max);
    humidityEl.innerHTML = data.main.humidity.toLocaleString();
    windTextEl.innerHTML = data.wind.speed.toLocaleString();

    windImgEl.computedStyleMap.transform = `rotate(${data.wind.deg}deg)`;
    cardEl.classList.add("active");
  } catch (err) {
    console.log(err);
    cardEl.classList.remove("active");
    alert("Ocorreu um erro");
  }
}

buttonEl.addEventListener("click", callApi);
