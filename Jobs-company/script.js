const URL_ROOT = "https://api.adzuna.com/v1/api";
const APPLICATION_ID = "ad6b23fa";
const APPLICATION_KEYS = "6ea121a2ddb2e9a6552a6ec0e59b04c1";

const form_header_option = document.querySelector(".btn-submit");
const input_job = document.querySelector(".input-job");
const input_location = document.querySelector(".input-location");
const div_results = document.querySelector(".results");
const selectedJob = document.querySelector(".selected-job");

let job;
let country;
let data;

function takeInputsData(event) {
  event.preventDefault();
  job = input_job.value.replace(" ", "%20").toLowerCase();
  country = input_location.value;
  clear();
  makeRequest(job, country);
}

function addEventOnButtons() {
  form_header_option.addEventListener("click", takeInputsData);
}
addEventOnButtons();

function clear() {
  div_results.innerHTML = "";
}

// async function moreInfo(event) {
//   selectedJob.innerHTML = '';
//   // const divDescription = document.createElement('div');
//   // divDescription.className = "job-description";
//   let id;
//   if (event.target.className === 'job-card') {
//     id = event.target.id;
//   } else {
//     id = event.target.closest('.job-card').id;
//   }
//   const jobObj = await fetch(`http://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${APPLICATION_ID}&app_key=${APPLICATION_KEYS}&results_per_page=50&what=${job}&content-type=application/json`)
//   .then(r => r.json())
//   .then (response => response.results.find((job) => {
//     return job.id === id;
//   }));
//   selectedJob.innerText = jobObj.description;
//   // selectedJob.appendChild(divDescription);
// }

function moreInfo(event) {
  let id;
  if (event.target.className === 'job-card') {
    id = event.target.id;
  } else {
    id = event.target.closest('.job-card').id;
  }
  const jobObj = data.find((job) => {
    return job.id === id;
  });
  console.log(jobObj)
  selectedJob.innerText = jobObj.description;
}

function createJobTitle(result) {
  const jobTitle = document.createElement("h3");
  jobTitle.className = "job-title";
  jobTitle.innerText = result.title;
  return jobTitle;
}

function createJobLocation(result) {
  const jobLocation = document.createElement("p");
  jobLocation.className = "job-location";
  const jobLocationText = result.location.display_name;
  if (jobLocationText) {
    jobLocation.innerText = jobLocationText;
  } else {
    jobLocation.innerText = "";
  }
  return jobLocation;
}

function createJobCompany(result) {
  const jobCompany = document.createElement("p");
  jobCompany.className = "job-company";
  const resultCompanyName = result.company.display_name;
  if (resultCompanyName) {
    jobCompany.innerText = resultCompanyName;
  } else {
    jobCompany.innerText = "";
    jobCompany.style.display = 'none';
  }
  return jobCompany;
}

function createDiv(result) {
  const div = document.createElement("div");
  div.className = "job-card";
  div.id = result.id;
  div.addEventListener("click", moreInfo);
  return div;
}

function divChildCard() {
  const div = document.createElement("div");
  div.className = "div-company-location";
  return div;
}

function makeCards(result) {
  const div = createDiv(result);
  const divChild = divChildCard();
  const title = createJobTitle(result);
  const company = createJobCompany(result);
  const local = createJobLocation(result);
  div.appendChild(title);
  div.appendChild(divChild);
  divChild.appendChild(local);
  divChild.appendChild(company);
  div_results.appendChild(div);
}

async function makeRequest(param1, param2) {
  const fetchRequest = await fetch(
    `http://api.adzuna.com/v1/api/jobs/${param2}/search/1?app_id=${APPLICATION_ID}&app_key=${APPLICATION_KEYS}&results_per_page=50&what=${param1}&content-type=application/json`
  );
  const response = await fetchRequest.json();
  data = response.results;
  data.forEach((result) => makeCards(result));
  // console.log(data);
}

window.onload = async () => {
  await makeRequest("javascript%20developer", "br");
};
