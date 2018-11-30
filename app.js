// This is a cities.JSON file that includes the city name, state and population
const endPoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

//cities will go in here
const cities = [];
// browser API that returns a "promise" that data is coming
fetch (endPoint)
  .then(blob => blob.json())//returns another "promise"
  .then(data => cities.push(...data)); //Pushes the cities in to cities array (... spread operator)

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    //Here we need to figure out if the city or state is searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
}

function numberWithCommas(x) {
  //Adds commas to population
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


function displayMatches() {
  const matchCitiesArray = findMatches(this.value, cities);

  const html = matchCitiesArray.map(place => {
    //Highlite words that macth search city & state
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="highLiter">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="highLiter">${this.value}</span>`);
    return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <spanlass="population">${numberWithCommas(place.population)}</span>
    </li>`

  }).join('');
  suggestionsEl.innerHTML = html;
}

const searchInputEL = document.querySelector('.search');
const suggestionsEl = document.querySelector('.suggestions');

searchInputEL.addEventListener('change', displayMatches);
searchInputEL.addEventListener('keyup', displayMatches);

