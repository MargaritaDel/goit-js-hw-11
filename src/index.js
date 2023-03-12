import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const refs = {
  searchForm: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.classList.add('is-hidden');
refs.searchForm.addEventListener('submit', onSearch);

class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const apiKey = '34025093-cc2dd49ea388fe86622ccaf7b';
    const BASE_URL = 'https://pixabay.com/api/';
    const params = {
      key: `${apiKey}`,
      q: `${this.searchQuery}`,
      page: `${this.page}`,
      per_page: '40',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    };

    const api = await axios.get(BASE_URL, { params });
    const data = await api.data;
    this.incrementPage();
    return data;
  }

  incrementPage() {
    this.page + 1;
    console.log(this.page);
  }
  resetIncrementPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

const newApiService = new NewApiService();

async function onSearch(e) {
  clearMarkup();
  e.preventDefault();
  newApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  if (newApiService.searchQuery === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return clearMarkup();
  }
  await onSearchRequest();

  newApiService.resetIncrementPage();
}

async function onLoadMore() {
  await onRequest();
}

function onSuccess(images) {
  refs.gallery.insertAdjacentHTML('beforeend', createImages(images));

  lightbox.refresh();

  refs.loadMoreBtn.classList.remove('is-hidden');
  if (images.length < 40) {
    refs.loadMoreBtn.classList.add('is-hidden');
  }
}

const lightbox = new SimpleLightbox('.gallery__item', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createImages(images) {
  const markup = images
    .map(
      ({ largeImageURL, webformatURL, likes, views, comments, downloads }) => {
        return `
  
    <div>
   <a class="gallery__item" href="${largeImageURL}">
    <img src="${webformatURL}" alt="image" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b><span class="icon">&#10084;</span>${likes}</b>
      </p>
      <p class="info-item">
        <b><span class="icon">&#128065;</span>${views}</b>
      </p>
      <p class="info-item">
        <b><span class="icon">	
        &#128488;</span>${comments}</b>
      </p>
      <p class="info-item">
        <b><span class="icon">&#8595;</span>${downloads}</b>
      </p>
    </div>
  </div></a>
    `;
      }
    )
    .join('');

  return markup;
}

async function onSearchRequest() {
  try {
    const fetch = await newApiService.fetchImages();
    const totalHits = await fetch.totalHits;
    onSuccess(fetch.hits);
    if (totalHits === 0) {
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    }
    if (totalHits) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    console.log(fetch.totalHits);
  } catch (error) {
    console.log(error);
  }
}

async function onRequest() {
  try {
    const fetch = await newApiService.fetchImages();
    const pageData = await fetch.totalHits;
    const numberOfPages = Math.ceil(pageData / 40);
    if (numberOfPages < newApiService.page) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      refs.loadMoreBtn.classList.add('is-hidden');
    }
    onSuccess(fetch.hits);
  } catch (error) {
    console.log(error);
  }
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
}
