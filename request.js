// const baseURL = 'http://api.lopenweathermap.org/data/2.5/weather?q=Lagos&appid=cbe3dd267a18f6c89943b3eff94f1ed7';

// fetch(baseURL)
//     .then((data) => { console.log('response', data.json()) })
//     .catch((error) => {
//         console.log(error);
//     });

// const baseURL =
//  `http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=${process.env.API_KEY}`;
// try the link.
require("dotenv").config();

const key = process.env.API_KEY;

const requestCity = async (city) => {
  const baseURL = `http://api.openweathermap.org/data/2.5/weather`;
  const query = `?q=${city}&appid=${key}`; // ----- easier way. concatenation
  // const query2 = `?q=` + city + `&appid=` key; ----- longer way ----

  //make fetch call (promise call)
  const response = await fetch(baseURL + query);

  //promise data
  const data = await response.json();
  return data;
};
