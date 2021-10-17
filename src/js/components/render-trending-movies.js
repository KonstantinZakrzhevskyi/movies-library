import { Loading } from 'notiflix';
import { homeApiService } from '../api/apiServicePlugin';
import imageCardTpl from '../../templates/card-markup.hbs';
import dataStorage from './data-storage';
import { setPaginationTotalItems, resetPaginationPage } from './pagination.js';
import refs from './refs.js';

dataStorage.saveGenresToLS();
loadTrendingMovies();

export function loadTrendingMovies() {
  Loading.circle('Loading...');
  homeApiService
    .fetchArticles()
    .then(({ results, total_results }) => {
      setPaginationTotalItems(total_results);
      const currentPageMovies = dataStorage.getFilmData(results);
      dataStorage.saveCurrentMovies(currentPageMovies);

      createGallery(currentPageMovies);
      refs.pagination.classList.remove('tui-pagination-is-hidden');
    })
    .catch(onFetchError)
    .finally(Loading.remove(200));
}

export function preloadTrendingMoviesTotalItems() {
  homeApiService
    .fetchArticles()
    .then(({ total_results }) => {
      setPaginationTotalItems(total_results);
      resetPaginationPage('home');
    })
    .catch(console.log);
}

function createGallery(movies) {
  refs.messageContainer.classList.add('visually-hidden');
  refs.galleryContainer.innerHTML = imageCardTpl(movies);
}

function onFetchError(message) {
  console.log(message);
}

// === 2, 11, 37-65 ==============================================

// import { Loading } from 'notiflix';
// import { homeApiService, homeWeekApiService } from '../api/apiServicePlugin';
// import imageCardTpl from '../../templates/card-markup.hbs';
// import dataStorage from './data-storage';
// import { setPaginationTotalItems, resetPaginationPage } from './pagination.js';
// import refs from './refs.js';

// dataStorage.saveGenresToLS();
// loadTrendingMovies();

// // Rendering popular movies TODAY --------------------------------
// export function loadTrendingMovies() {
//   Loading.circle('Loading...');
//   homeApiService
//     .fetchArticles()
//     .then(({ results, total_results }) => {
//       setPaginationTotalItems(total_results);
//       const currentPageMovies = dataStorage.getFilmData(results);
//       dataStorage.saveCurrentMovies(currentPageMovies);

//       createGallery(currentPageMovies);
//       refs.pagination.classList.remove('tui-pagination-is-hidden');
//     })
//     .catch(onFetchError)
//     .finally(Loading.remove(200));
// }

// export function preloadTrendingMoviesTotalItems() {
//   homeApiService
//     .fetchArticles()
//     .then(({ total_results }) => {
//       setPaginationTotalItems(total_results);
//       resetPaginationPage('home');
//     })
//     .catch(console.log);
// }
// // ---------------------------------------------------------------

// // Rendering popular movies THIS WEEK ----------------------------
// export function loadWeekTrendingMovies() {
//   Loading.circle('Loading...');
//   homeWeekApiService
//     .fetchArticles()
//     .then(({ results, total_results }) => {
//       setPaginationTotalItems(total_results);
//       const currentPageMovies = dataStorage.getFilmData(results);
//       dataStorage.saveCurrentMovies(currentPageMovies);

//       createGallery(currentPageMovies);
//       refs.pagination.classList.remove('tui-pagination-is-hidden');
//     })
//     .catch(onFetchError)
//     .finally(Loading.remove(200));
// }

// export function preloadWeekTrendingMoviesTotalItems() {
//   homeWeekApiService
//     .fetchArticles()
//     .then(({ total_results }) => {
//       setPaginationTotalItems(total_results);
//       resetPaginationPage('week');
//     })
//     .catch(console.log);
// }
// // ---------------------------------------------------------------

// function createGallery(movies) {
//   refs.messageContainer.classList.add('visually-hidden');
//   refs.galleryContainer.innerHTML = imageCardTpl(movies);
// }

// function onFetchError(message) {
//   console.log(message);
// }
