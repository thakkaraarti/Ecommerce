import { API_URL } from "../components/string";

export const ApiServiceGet = async (api:string) => {
  const data = await fetch(API_URL + api, {
    method: 'GET',
    headers: {
      accept: '*/*',
      
    },
  })
    .then(async response => {
        console.log(response,'response---');
        
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    })
    .then(value => {
      return value;
    })
    .catch(error => {
    });

  return data;
};







