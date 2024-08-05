import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { searchGalleryQuery } from "./js/pixabay-api";
import { createImages, clearImages } from "./js/render-functions";

const form = document.querySelector('.form-gallery');
const input = document.querySelector('.form-gallery-input');
const loader = document.querySelector('.loader');

form.addEventListener('submit', handleSubmitBtn);

function handleSubmitBtn(event) {
    event.preventDefault();
    clearImages();
    loader.classList.remove('hidden');

    let searchWord = input.value.trim();

    searchGalleryQuery(`${searchWord}`)
            .then((data) => {
                if (data.total === 0 || searchWord === "") { 
                    iziToast.error({
                        position: 'topRight',
                        message: "Sorry, there are no images matching your search query. Please try again!",
                    })
                    loader.classList.add('hidden');
                    return;
                }
                else { createImages(data) }
                loader.classList.add('hidden');
            })
    
    form.reset();
}