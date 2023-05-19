const API_ENDPOINT = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  const url = `${API_ENDPOINT}${name}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Country not found');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      throw new Error(error.message);
    });
}
