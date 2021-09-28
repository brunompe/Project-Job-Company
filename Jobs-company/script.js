// const { create } = require("istanbul-reports");

const URL_ROOT = 'https://api.adzuna.com/v1/api';
const APPLICATION_ID = 'ad6b23fa';
const APPLICATION_KEYS = '6ea121a2ddb2e9a6552a6ec0e59b04c1';

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
  clear();
  makeRequest(job, country);
}

function addEventOnButtons() {
  form_header_option.addEventListener('click', takeInputsData);
}
addEventOnButtons();

function clear(){
  div_results.innerHTML = '';
}

function moreInfo(event){
  const div = document.querySelector('.job-card');


}

function createJobTitle(result) {
  const jobTitle = document.createElement('h3');
  jobTitle.className = 'job-title';
  jobTitle.innerText = result.title;
  return jobTitle;
}

function createJobLocation(result) {
  const jobLocation = document.createElement('p');
  jobLocation.className = 'job-location';
  jobLocation.innerText = result.location.display_name;
  return jobLocation;
}

function createJobCompany(result) {
  const jobCompany = document.createElement('p');
  jobCompany.className = 'job-company';
  jobCompany.innerText = result.company.display_name;
  return jobCompany;
}

function createDiv() {
  const div = document.createElement('div');
  div.className = 'job-card';
  div.addEventListener('click', moreInfo);
  return div;
}

function makeRequest(param1, param2) {
  fetch(`http://api.adzuna.com/v1/api/jobs/${param2}/search/1?app_id=${APPLICATION_ID}&app_key=${APPLICATION_KEYS}&results_per_page=50&what=${param1}&content-type=application/json`)
    .then(r => r.json())
    .then(response => response.results)
    // .then(results => console.log(results))
    .then(results => results.forEach((result) => {
      const div = createDiv();
      const title = createJobTitle(result);
      const company = createJobCompany(result);
      const local = createJobLocation(result);
      div.appendChild(title);
      div.appendChild(company);
      div.appendChild(local);
      div_results.appendChild(div);
    }))
}

window.onload = async () => {
  // await makeRequest('javascript%20developer', 'br');
}