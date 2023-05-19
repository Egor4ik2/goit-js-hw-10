import './css/styles.css';
import './css/styles.css';
import { fetchCountries } from "./fetchCountries.js";
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const debounceSearch = debounce(() => {
  const searchTerm = searchBox.value.trim();

  if (searchTerm === '') {
    clearResults();
    return;
  }

  fetchCountries(searchTerm)
    .then(countries => {
      if (countries.length > 10) {
        showNotification('Too many matches found. Please enter a more specific name.', 'blue');
        clearResults();
      } else if (countries.length >= 2 && countries.length <= 10) {
        showCountryList(countries);
        hideCountryInfo();
      } else if (countries.length === 1) {
        showCountryInfo(countries[0]);
        hideCountryList();
      }
    })
    .catch(error => {
      if (error.message === '404') {
        showNotification('Country not found');
      } else {
        showNotification('An error occurred while fetching the country data');
      }
      clearResults();
    });
}, DEBOUNCE_DELAY);

searchBox.addEventListener('input', debounceSearch);

function clearResults() {
  countryList.innerHTML = '';
  hideCountryList();
  hideCountryInfo();
}

function showCountryList(countries) {
  let listHTML = '';

  countries.forEach(country => {
    const { flags, name } = country;

    listHTML += `
      <li class="country">
        <img class="flag" src="${flags.svg}" alt="${name.official} flag">
        <span class="name">${name.official}</span>
      </li>
    `;
  });

  countryList.innerHTML = listHTML;
  showElement(countryList);
}

function hideCountryList() {
  hideElement(countryList);
}

function showCountryInfo(country) {
  const { flags, name, capital, population, languages } = country;

  const infoHTML = `
    <div class="country">
      <img class="flag" src="${flags.svg}" alt="${name.official} flag">
      <div class="details">
        <h2>${name.official}</h2>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Languages:</strong> ${languages.map(lang => lang.name).join(', ')}</p>
      </div>
    </div>
  `;

  countryInfo.innerHTML = infoHTML;
  showElement(countryInfo);
}

function hideCountryInfo() {
  hideElement(countryInfo);
}

function showNotification(message, color = 'red') {
  Notiflix.Notify.failure(message, {
    cssAnimationDuration: 400,
    classNames: ['notification', color],
  });
}


function hideElement(element) {
  element.style.display = 'none';
}

function showElement(element) {
  element.style.display = 'block';
}
