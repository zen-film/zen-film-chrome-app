import { addPhoto } from '../actions/gridAction';

export const photoReducer = (state, action) => {
  switch (action.type) {
    case ADD_PHOTO:
      return addPhoto(action.photo);
    default:
      return state;
  }
}
