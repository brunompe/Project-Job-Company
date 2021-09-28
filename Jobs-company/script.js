function getData() {
  const API_KEY = 'Hwo8Lqnu2EDBVXyyMJz4whuSDfCPPglwMRIoxqsD+DM=';
  const request = {
    url: 'data.usajobs.gov',
    method: 'GET',
    headers: {
      'Host': 'data.usajobs.gov',
      'User-Agent': 'brunompe@gmail.com',
      'Authorization-Key': API_KEY,
    }
  }

  const response = fetch('https://data.usajobs.gov/api/search');
  console.log(response);
}

console.log('TESTE')
