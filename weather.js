"use strict";
/* global $, Headers, */

//http://www.city-data.com/
//http://www.governing.com/gov-data/census/median-age-county-population-map.html

const api = (function() {
  function apiFetch(...args) {
    let error = false;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          error = true;
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          throw new Error(data.message);
        }
        return data;
      })
      .catch(err => console.log(err.message));
  }

  const baseURL = `https://api.weatherbit.io/v2.0/current?key=f855b8978668496cb1bda0cbe469d66e&city=`;

  //const APIKEY = "f855b8978668496cb1bda0cbe469d66e";

  function getCities(city) {
    console.log("getCities is being called.");

    console.log(`${baseURL}${city}`);
    return apiFetch(`${baseURL}${city}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.data)
      .catch(err => alert(err));
  }

  return {
    getCities
  };
})();
console.log(api);

function matchCities(city) {
  if (store.cities.age === age) {
    return store.cities.name;
  }
}

function captureChoices() {
  $(".submit-choices").on("click", function(event) {
    event.preventDefault();
    console.log(event.currentTarget);
    console.log(`submit pressed.`);
    console.log(store.displayResult);
    let age = $(".age-options").val();
    let weather = $(".weather:checked").val();
    let city = $(".city-choice").val();
    if (age == "") {
      alert("please select an age");
    } else if (city == "") {
      alert("please select a city");
    } else if (weather == undefined) {
      alert("please select a weather");
    } else {
      //let weatherChoice = event.currentTarget.weather.value;
      console.log(`age: ${age}, weather: ${weather}`);

      store.displayResult = !store.displayResult;
      const data = api.getCities(city);
      data.then(res => renderResults(age, weather, res));
    }
  });
}

//switch temp to F

function renderResults(age, weather, data) {
  console.log(data[0].temp);
  //search store for age, map over age
  //change rain/sun to hot or cold over above 50
  const resultString = `
  <h2>Your age: ${age} and your preference: ${weather}</h2>
  <p>Here is where people your age are enjoying the ${weather}:</p>
  <ul class="results-list">
    <li class="result-item">
    
      <button type="button" class="flight-choice">Ok, I'll pack my bags</button>
    </li>
  </ul>`;
  if (store.displayResult == true) {
    $(".results").html(resultString);
  } else {
    $(".results").html("");
  }
  directToFlights();
}

function directToFlights() {
  $(".flight-choice").on("click", ".result-item", function(event) {
    event.preventDefault();
    console.log(`flight choice pressed`);
  });
}

function resetForm() {
  $(".reset-button").on("click", ".try-again", function(event) {
    event.preventDefault();
    console.log(`reset button hit.`);
    store.displayResult == false;
  });
}

function main() {
  captureChoices();
  resetForm();
  directToFlights();
}

$(main);
