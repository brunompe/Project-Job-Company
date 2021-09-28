const URL_ROOT = 'https://api.adzuna.com/v1/api';
const APPLICATION_ID = '3fabcb1c';
const APPLICATION_KEYS = '2bfd5e90cb19ade4d6989af016090452';

const form_header_option = document.querySelector('.btn-submit');
const input_job = document.querySelector('.input-job');
const input_location = document.querySelector('.input-location');
const div_results = document.querySelector('.results');

let job;
let country;

function takeInputsData(event) {
  event.preventDefault();
  job = input_job.value.replace(' ', '%20').toLowerCase();
  country = input_location.value;
  makeRequest(job, country);
}

function addEventOnButtons() {
  form_header_option.addEventListener('click', takeInputsData);
}
addEventOnButtons();

function makeRequest(param1, param2) {
  fetch(`http://api.adzuna.com/v1/api/jobs/${param2}/search/1?app_id=${APPLICATION_ID}_key=${APPLICATION_KEYS}&results_per_page=50&what=${param1}&content-type=application/json`)
    .then(r => r.json())
    .then(response => response.results)
    .then(results => console.log(results))
    // .then(results => results.forEach((result) => {
    //   const paragraph = document.createElement('p');
    //   paragraph.className = 'names';
    //   paragraph.innerText = result.title;
    //   div_results.appendChild(paragraph);
    // }))
}

window.onload = async () => {
  await makeRequest('javascript%20developer', 'br');
}