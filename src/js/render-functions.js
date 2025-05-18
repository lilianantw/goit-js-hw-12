import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const elSearchList = document.querySelector('.js-search-list');
const elLoader = document.querySelector('.js-loader');
const elBtnSearchMore = document.querySelector('.js-search-more');

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const createGallery = images => {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="search-list-item">
                    <a class="gallery-link" href="${largeImageURL}">
                      <img class="search-list-img" src="${webformatURL}" alt="${tags}" />
                    </a>
                    <ul>
                      <li><h3>Likes</h3><p>${likes}</p></li>
                      <li><h3>Views</h3><p>${views}</p></li>
                      <li><h3>Comments</h3><p>${comments}</p></li>
                      <li><h3>Downloads</h3><p>${downloads}</p></li>
                    </ul>
                  </li>`;
      }
    )
    .join('');

  elSearchList.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export const clearGallery = () => {
  elSearchList.innerHTML = '';
};

export const showLoader = () => {
  elLoader.classList.add('is-active');
};

export const hideLoader = () => {
  elLoader.classList.remove('is-active');
};

export const showLoadMoreButton = () => {
  elBtnSearchMore.classList.add('is-active');
};

export const hideLoadMoreButton = () => {
  elBtnSearchMore.classList.remove('is-active');
};
