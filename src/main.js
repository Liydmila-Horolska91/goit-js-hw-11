import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { NewsAPI } from '/js/pixabay-api';
import { articleTemplate } from '/js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = new SimpleLightbox('.gallery a');
const loadElem = document.querySelector('.loader');

hideSpinner();

const refs = {
  formElem: document.querySelector('.js-search-form'),
  articleListElem: document.querySelector('.js-article-list'),
  btnLoadMore: document.querySelector('.js-btn-load'),
  loadElem: document.querySelector('.js-loader'),
};

const newsApi = new NewsAPI();

refs.formElem.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  showSpinner();

  newsApi.query = e.target.elements.query.value.trim();
  newsApi.page = 1;

  refs.articleListElem.innerHTML = '';

  if (newsApi.query.trim() === '') {
    hideSpinner();
    iziToast.error({
      message: 'Info Search input must be filled!',
    });
    return;
  }

  newsApi.getArticles()
    .then(data => {
      hideSpinner();
      if (data.total === 0) {
        iziToast.info({
          title: 'Sorry,',
          message: 'There are no images matching your search query. Please try again!',
        });
      }

      newsApi.totalResult = data.totalResults;
      renderArticles(data.hits);
    })
    .catch(err => {
      hideSpinner();
      newsApi.totalResult = 0;
      iziToast.error({
        title: 'Error',
        message: err.message,
      });
    });
}

function articlesTemplate(articles) {
  return articles.map(articleTemplate).join('');
}

function renderArticles(articles) {
  const markup = articlesTemplate(articles);
  refs.articleListElem.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

function showSpinner() {
  loadElem.classList.remove('visually-hidden');
}

function hideSpinner() {
  loadElem.classList.add('visually-hidden');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
