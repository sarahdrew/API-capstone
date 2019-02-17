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

  const baseURL = `https://www.5dayweather.org/api.php?city=`;
  // const location = data.location;

  function getCities() {
    return apiFetch(`${baseURL}${location}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: api.data
    })
      .then(response => response.json())
      .then(data => displayResults(data))
      .catch(err => alert(`error`));
  }

  return {
    getCities
  };
})();

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
    let weather = $(".weather:checked").val(); //
    if (age == "") {
      alert("please select an age");
    } else if (weather == undefined) {
      alert("please select a weather");
    } else {
      //let weatherChoice = event.currentTarget.weather.value;
      console.log(`age: ${age}, weather: ${weather}`);

      store.displayResult = !store.displayResult;

      renderResults(age, weather);
    }
  });
}

function renderResults(age, weather) {
  //use values of age and weather to generate the html on th page with list items and h2
  const resultString = `
  <h2>Your age: ${age} and your preference: ${weather}</h2>
  <p>Here is where people your age are enjoying the ${weather}:</p>
  <ul class="results-list">
    <li class="result-item">
    <p> ${data.location}</p>
    <p>${data.skytext}</p>
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
  $("button").on("click", ".reset-button", function(event) {
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
