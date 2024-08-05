import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loader = document.getElementById('loader');

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  gallery.innerHTML = '';

  const searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  try {
    loader.style.display = 'block';
    const images = await fetchImages(searchTerm);
    renderImages(images);
  } catch (error) {
    console.error('Error searching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to search images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loader.style.display = 'none';
    searchInput.value = '';
  }
});