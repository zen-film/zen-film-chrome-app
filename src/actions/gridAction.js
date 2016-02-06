export const ADD_PHOTO = 'ADD_PHOTO';
export const FETCH_PHOTOS = 'FETCH_PHOTOS'

export function addPhoto(photo) {
   return {
      type: ADD_PHOTO,
      photo
   };
}

export function fetchPhotos() {
  return {
    type: FETCH_PHOTOS
  }
}
