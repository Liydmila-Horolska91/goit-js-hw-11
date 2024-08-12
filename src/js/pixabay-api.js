// https://pixabay.com/api?key=45176564-fb4661ac13389b43e2d38b088&q=dog
const BASE_URL = 'https://pixabay.com/';
const END_POINT = 'api/';
const KEY = '45176564-fb4661ac13389b43e2d38b088';
const options = {};
export class NewsAPI {
  query = '';
  #pageSize = 10;
  page = 1;
  total_pages = 1;

  getArticles() {
    const PARAMS = new URLSearchParams({
      key: KEY,
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });

    const url = `${BASE_URL}${END_POINT}?${PARAMS}`;
    console.log(url);
    return fetch(url, options).then(res => res.json());
  }

  get pageSize() {
    return this.#pageSize;
  }
}