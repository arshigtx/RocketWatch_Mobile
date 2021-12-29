export default async function fetchAPI(url, method, payload) {
  try {
    let response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    let data = await response.json();  
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}