export const selectSearchResult = (state) => state.searchResult.currentSearch;
export const selectSearchResultType = (state) => state.searchResult.type;
export const selectTopGames = (state) => state.searchResult.topGames.list;
export const selectTopGamesPage = (state) => state.searchResult.topGames.page;
export const selectLoadingStatus = (state) => state.status.loading;
export const selectGhostLoadingStatus = (state) => state.status.ghostLoading;
export const selectDetails = (state) => state.details;
export const selectGamesCollection = (state) => state.collection.games;
export const selectMoviesCollection = (state) => state.collection.movies;
export const selectSearchType = (state) => state.seacrhType;
export const selectCurrentUser = (state) => state.auth.user;
export const selectLoginStatus = (state) => state.auth.isLoggedIn;
export const selectLoginingStatus = (state) => state.auth.isLoggingIn;
export const selectAuthError = (state) => state.auth.error;
export const selectisRegisterSucccess = (state) => state.auth.registerSuccess;
export const getScrollPosition = (state) => state.searchResult.scrollPosition;
export const getViewVariant = (state) => state.collection.viewVariant;
