export function articleTemplate(article) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = article;
  console.log(article);
  return `<li class="list-el">

 <a href="${article.largeImageURL}"><img src='${article.webformatURL}' alt='${article.tags}'></a>
  <div class="content">
    <div class="item"><h3>Likes</h3><p>${article.likes}</p></div>
    <div class="item"><h3>Views</h3><p>${article.views}</p></div>
     <div class="item"><h3>Comments</h3><p>${article.comments}</p></div>
    <div class="item"><h3>Downloads</h3><p>${article.downloads}</p></div>
 </div>
</li>
`;
}