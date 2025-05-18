import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elSearchForm = document.querySelector('.js-search-form');
const elSearchList = document.querySelector('.js-search-list');
const elLoaderMore = document.querySelector('.js-loader-more');
const elBtnSearchMore = document.querySelector('.js-search-more');

let page = 1;
let query = '';
let totalHits = 0;

elSearchForm.addEventListener('submit', async event => {
  event.preventDefault();

  query = elSearchForm.elements.enterForSearsh.value.trim();
  if (!query) {
    iziToast.warning({
      position: 'topRight',
      message: 'Please enter a search term.',
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (!totalHits) {
      hideLoader();
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      elSearchForm.reset();
      return;
    }

    createGallery(data.hits);
    hideLoader();

    if (totalHits > 15) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.error(error);
    hideLoader();
    iziToast.error({
      position: 'topRight',
      message: 'An error occurred while fetching data. Please try again later.',
    });
  }
});

elBtnSearchMore.addEventListener('click', async () => {
  page += 1;
  elLoaderMore.classList.add('is-active-more');
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    elLoaderMore.classList.remove('is-active-more');
    const totalPages = Math.ceil(totalHits / 15);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const cardHeight =
      elSearchList.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error(error);
    elLoaderMore.classList.remove('is-active-more');
    iziToast.error({
      position: 'topRight',
      message: 'Failed to load more images. Please try again.',
    });
  }
});
