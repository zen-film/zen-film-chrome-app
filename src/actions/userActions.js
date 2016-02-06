export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SHOW_SETTINGS = 'SHOW_SETTINGS';
export const HIDE_SETTINGS = 'HIDE_SETTINGS';
export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS';
export const USER_FETCH_CAMERAS = 'USER_FETCH_CAMERAS';
export const USER_FETCH_FAV_FILMS = 'USER_FETCH_FAV_FILMS';
export const USER_FETCH_NO_SYNC_FILMS = 'USER_FETCH_NO_SYNC_FILMS';

export const userLogin = { type: USER_LOGIN }
export const userLogout = { type: USER_LOGIN }
export const showSettings = { type: SHOW_SETTINGS }
export const hideSettings = { type: HIDE_SETTINGS }
export const toggleSettings = { type: TOGGLE_SETTINGS }
export const fetchCameras = { type: USER_FETCH_CAMERAS }
export const fetchFavoriteFilms = { type: USER_FETCH_FAV_FILMS }
export const fetchNewFilms = { type: USER_FETCH_NO_SYNC_FILMS }
