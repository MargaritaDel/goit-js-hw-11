// loadMoreBtn.addEventListener('click', onLoadMore);
// loadMoreBtn.classList.add('is-hidden');
// form.addEventListener('submit', onSearch);

// class NewApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//     const res = await response.data.hits;

//     this.incrementPage();

//     return res;
//   }

//   incrementPage() {
//     this.page += 1;
//   }
//   resetIncrementPage() {
//     this.page = 1;
//   }
//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }

// const newApiService = new NewApiService();

// async function onSearch(e) {
//   clearMarkup();
//   e.preventDefault();
//   newApiService.query = e.currentTarget.elements.searchQuery.value;

//   if (newApiService.searchQuery === '') {
//     Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//     return clearMarkup();
//   }

//   await sendRequest();

//   newApiService.resetIncrementPage();
// }

// async function onLoadMore() {
//   await sendRequest();
// }

// function onSuccess(images) {
//   gallery.insertAdjacentHTML('beforeend', markupImage(images));

//

//   loadMoreBtn.classList.remove('is-hidden');

//   // Перевірка на кількість зображень
//   if (images.length < 40) {
//     loadMoreBtn.classList.add('is-hidden');
//   }
// }

// function clearMarkup() {
//   gallery.innerHTML = '';
//   loadMoreBtn.classList.add('is-hidden');
// }

// async function sendRequest() {
//   try {
//     const fetch = await newApiService.fetchArticles().then(onSuccess);
//   } catch (error) {
//     error = Notify.info(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );

//     return error;
//   }
// }
//

//   async fetchArticles() {
//     const apiKey = '34025093-cc2dd49ea388fe86622ccaf7b';
//     const BASE_URL = 'https://pixabay.com/api/';
//     const params = {
//       key: `${apiKey}`,
//       q: `${this.searchQuery}`,
//       page: `${this.page}`,
//       per_page: '40',
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: 'true',
//     };

// export const pagination = {
//   page: 1,
//   per_page: 40,
//   total: null,
// };

// async function OnLoadMore() {
//   loadMoreButton.disabled = true;

//   if (pagination.page + 1 > pagination.total / pagination.per_page) {
//     loadMoreButton.disabled = false;
//     return Notiflix.Notify.warning(
//       "We're sorry, but you've reached the end of search results."
//     );
//   }

//   pagination.page += 1;
//   try {
//     await fetchImgs(searchRequest);
//   } catch (error) {
//     Notiflix.Notify.failure(error.message);
//   }
//   loadMoreButton.disabled = false;
// }
