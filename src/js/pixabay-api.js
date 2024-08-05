
export function searchGalleryQuery(query) {
    const URL = "https://pixabay.com/api/";
    const API_KEY = "45091921-bafbe55c990439d7032dec8c8";

    return fetch(`${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .catch((error) => {
        console.log(error);
    })
}