import axios from 'axios';

export async function getData(searchString, pageNumber) {
  const params = new URLSearchParams({
    key: '31288013-ac62dc6ecdfb8f972f302b190',
    page: pageNumber,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  });

  const URL = `https://pixabay.com/api/?q=${searchString}&${params}`;

  const response = await axios.get(URL);
  const responseFormat = await response.data;
  return responseFormat;
}

export default getData;