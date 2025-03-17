export { setLoading, setGhostLoading } from "./statusReducer";
export {
  searchGameByName,
  searchMovieByName,
  setSearchType,
  updateCurrentSearchMark,
  getTopList,
  getMoreTopGames,
  updateCurrentTopGamesCollectionMark,
  setScrollPosition,
} from "./searchReducer";
export {
  setDetails,
  getDetails,
  getDetailsById,
  updatePlayedTime,
  getMovieDetails,
} from "./detailsReducer";
export {
  addItemToCollection,
  deleteItemFromCollection,
  getGamesCollection,
  getMoviesCollection,
  setViewVariant,
} from "./collectionReducer";
export {
  checkIsAuth,
  loading,
  authFailed,
  registerRequest,
  authStatusReset,
  registerSuccess,
  loginRequest,
  loginSuccess,
  loginFailure,
  logOff,
  refreshToken,
  uploadAvatar,
  changeAvatar,
} from "./authReducer";
