import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a');

export function renderImages(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  if (images.length === 0) {
    showErrorMessage();
    return;
  }

  const columnWidth = '360px';
  const rowHeight = '200px';

  images.forEach(image => {
    const listItem = document.createElement('li');
    listItem.classList.add('gallery-item');

    const link = document.createElement('a');
    link.href = image.largeImageURL;
    link.setAttribute('data-lightbox', 'gallery');

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    link.appendChild(img);

    const info = document.createElement('div');
    info.classList.add('image-info');

    const likes = document.createElement('p');
    likes.textContent = `Likes ${image.likes}`;

    info.appendChild(likes);

    const views = document.createElement('p');
    views.textContent = `Views ${image.views}`;

    info.appendChild(views);

    const comments = document.createElement('p');
    comments.textContent = `Comments ${image.comments}`;

    info.appendChild(comments);

    const downloads = document.createElement('p');
    downloads.textContent = `Downloads ${image.downloads}`;
        info.appendChild(downloads);

    listItem.appendChild(link);
    listItem.appendChild(info);
    gallery.appendChild(listItem);
  });

  lightbox.refresh();
}

function showErrorMessage() {
  iziToast.error({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
}