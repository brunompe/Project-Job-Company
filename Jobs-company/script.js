const URL_ROOT = "https://api.adzuna.com/v1/api";
const APPLICATION_ID = "821d005c";
const APPLICATION_KEYS = "360769adf916a46acea335bb054ed356";

const form_header_option = document.querySelector(".btn-submit");
const input_job = document.querySelector(".input-job");
const input_location = document.querySelector(".input-location");
const div_results = document.querySelector(".results");
const selected_job = document.querySelector(".selected-job");
const input_number = document.querySelector('#input-number');
const loading = document.querySelector('.loading');

let job;
let country;
let numberPerPage;
let data;

function takeInputsData(event) {
  event.preventDefault();
  loading.innerHTML = 'Loading...';
  job = input_job.value.replace(" ", "%20").toLowerCase();
  country = input_location.value;
  if (input_number.value > 0) {
    numberPerPage = input_number.value;
  } else {
    numberPerPage = 20;
  }
  clear();
  makeRequest(job, country, numberPerPage);
}

function addEventOnButtons() {
  form_header_option.addEventListener("click", takeInputsData);
}


function clear() {
  div_results.innerHTML = "";
  // selected_job.innerHTML = "";
}
function findIncomplete(string) {
  if (string.endsWith('\u2026')) {
    array = string.split(/\.|;/).filter((str) => str.length > 0);
    array.splice(array.length - 1, 1);
    return array.join(".").concat(".");
  }
  return string;
}

function createAllElementsOfPopUp() {
  const newH2 = document.createElement('h2');
  const paragraphCategory = document.createElement('p');
  const paragraphLocation = document.createElement('p');
  const paragraphDescription = document.createElement('p');
  return { newH2, paragraphCategory, paragraphLocation, paragraphDescription };
}

function createPopUpDetails({ title, description, location, category, company, contract_time, salary_min, salary_max }) {
  const allElementsCreated = createAllElementsOfPopUp();
  const fixDescription = findIncomplete(description);
  allElementsCreated.paragraphDescription.innerText = `Descrição Da Vaga: ${fixDescription}`;
  allElementsCreated.newH2.className = 'h2-pop-up';
  allElementsCreated.paragraphCategory.className = 'p-category-pop-up';
  allElementsCreated.paragraphLocation.className = 'p-location-pop-up';
  allElementsCreated.newH2.innerText = title;
  allElementsCreated.paragraphCategory.innerText = `Categoria: ${category.label}`;
  allElementsCreated.paragraphLocation.innerText = `Localização: ${location.display_name}`;
  selected_job.appendChild(allElementsCreated.newH2);
  selected_job.appendChild(allElementsCreated.paragraphCategory);
  selected_job.appendChild(allElementsCreated.paragraphLocation);
  if (company.display_name) {
    const paragraphCompany = document.createElement('p');
    paragraphCompany.className = 'p-company-pop-up';
    paragraphCompany.innerText = `Empresa: ${company.display_name}`;
    selected_job.appendChild(paragraphCompany);
  }
  selected_job.appendChild(allElementsCreated.paragraphDescription);
  // console.log(data);
}

function moreInfo(event) {
  selected_job.innerHTML = '';
  let id;
  if (event.target.className === "job-card") {
    id = event.target.id;
  } else {
    id = event.target.closest(".job-card").id;
  }
  const jobObj = data.find((job) => {
    return job.id === id;
  });
  createPopUpDetails(jobObj);
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
    jobLocation.innerText = `Local: ${jobLocationText}`;
  } else {
    jobLocation.innerText = "Empresa: Não listada";
  }
  return jobLocation;
}

function createJobCompany(result) {
  const jobCompany = document.createElement("p");
  jobCompany.className = "job-company";
  const resultCompanyName = result.company.display_name;
  if (resultCompanyName) {
    jobCompany.innerText = `Empresa: ${resultCompanyName}`;
  } else {
    jobCompany.innerText = "Empresa: Não listada";
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
  loading.innerHTML = '';
  div_results.appendChild(div);
}

async function makeRequest(job, country, numberPerPage) {
  const fetchRequest = await fetch(
    `${URL_ROOT}/jobs/${country}/search/1?app_id=${APPLICATION_ID}&app_key=${APPLICATION_KEYS}&results_per_page=${numberPerPage}&what=${job}&content-type=application/json`
  );
  const response = await fetchRequest.json();
  data = response.results;
  data.forEach((result) => makeCards(result));
}

window.onload = async () => {
  // await makeRequest("javascript%20developer", "br", 20);
  addEventOnButtons();
};
