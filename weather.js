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

    // console.log(`${baseURL}${city}`);
    return apiFetch(`${baseURL}${city}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.data[0])
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
      store.displayResult = true;
      const data = api.getCities(city);

      let medianAge = 0;
      for (let i = 0; i < store.cities.length; i++) {
        if (store.cities[i].name === city) {
          console.log("city found");
          let ageRange = store.cities[i].age.split("-");
          if (ageRange[0] == "Under 18") {
            medianAge = 18;
          } else if (ageRange[0] == "65+") {
            medianAge = 65;
          } else {
            medianAge = Math.floor(
              (parseInt(ageRange[0]) + parseInt(ageRange[1])) / 2
            );
          }
          console.log(medianAge);
        }
      }
      console.log(
        `age: ${age}, weather: ${weather} city: ${city} medianAge: ${medianAge}`
      );

      data.then(response =>
        renderResults(age, weather, city, medianAge, response)
      );
    }
  });
}

function renderResults(age, weather, city, medianAge, data) {
  console.log(data.temp, medianAge);
  const fahrenheit = Math.floor(data.temp * 1.8 + 32);

  let flightCity = city.split(",");
  let flightLink = flightCity[0];

  console.log(fahrenheit);
  let resultString = "";
  if (fahrenheit > 55 && weather === "hot") {
    resultString = `<h2>Your age: ${age} and you prefer ${weather} weather</h2>
      <p>Are people your age enjoying ${weather} weather right now in ${city}?</p>
      <p>${city} has a median age of ${medianAge} and the current temp is ${fahrenheit}. Looks like a good match!
  
      <a href="https://flights.united.com/en-us/flights-to-${flightLink}"> Ok, I'll pack my bags</a></p>
      <button type="button" class="try-again">Try again.</button>`;
  } else if (fahrenheit > 55 && weather === "cold") {
    resultString = `<h2>Your age: ${age} and you prefer ${weather} weather</h2>
      <p>Are people your age enjoying ${weather} weather right now in ${city}?</p>
      <p>${city} has a median age of ${medianAge} and the current temp is ${fahrenheit}.
      <button type="button" class="try-again">That is hotter than I like. Try again!</button></p>`;
  } else if (fahrenheit < 55 && weather === "cold") {
    resultString = `<h2>Your age: ${age} and you prefer ${weather} weather</h2>
      <p>Are people your age enjoying ${weather} weather right now in ${city}?</p>
      <p>${city} has a median age of ${medianAge} and the current temp is ${fahrenheit}. Looks like a good match!
  
      <a href="https://flights.united.com/en-us/flights-to-${flightLink}"> Ok, I'll pack my bags</a></p>
      
      <button type="button" class="try-again">Try again.</button>
    `;
  } else if (fahrenheit < 55 && weather === "hot") {
    resultString = `<h2>Your age: ${age} and you prefer ${weather} weather</h2>
      <p>Are people your age enjoying ${weather} weather right now in ${city}?</p>
      <p>${city} has a median age of ${medianAge} and the current temp is ${fahrenheit}.
      <button type="button" class="try-again">That is colder than I like. Try again!</button></p>`;
  }
  if (store.displayResult == true) {
    $(".results").html(resultString);
  } else {
    $(".results").html("");
  }
  //directToFlights();
  console.log(store.displayResult);
}

// function directToFlights() {
//   $("a").on("click", function(event) {
//     event.preventDefault();
//     let flightCity = city.split(",");
//     let flightLink = flightCity[0];
//     console.log(`flight choice pressed`);
//   });
// }

function resetForm() {
  $("body").on("click", ".try-again", function(event) {
    event.preventDefault();
    console.log(`reset button hit.`);
    store.displayResult == false;
    $("form")[0].reset();
  });
}

function main() {
  captureChoices();
  resetForm();
  //   directToFlights();
}

$(main);
