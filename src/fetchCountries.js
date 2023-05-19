const API_BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  const url = `${API_BASE_URL}${name}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(404);
      }
      return response.json();
    })
   
}
