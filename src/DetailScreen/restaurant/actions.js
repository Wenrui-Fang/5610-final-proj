import { RestaurantConstants} from './constants.js';

function changeValue(name, value) {
  return {
    type: RestaurantConstants.CHANGE_VALUE,
    payload: {name, value}
  }
}

function showAddReview() {
  return {
    type: RestaurantConstants.SHOW_ADD_REVIEW,
  }
}

function hideAddReview() {
  return {
    type: RestaurantConstants.HIDE_ADD_REVIEW,
  }
}

function loadRestaurant(id) {
  return {
    type: RestaurantConstants.LOAD_RESTAURANT,
    uri: `/api/restaurant?id=${id}`,
    payload:{id}
  }
}

function sortReviews(value) {
  return {
    type: RestaurantConstants.SORT_REVIEWS,
    payload:{value}
  }
}

let RestaurantActions  = {
  loadRestaurant,
  changeValue,
  showAddReview,
  hideAddReview,
  sortReviews
};

export default RestaurantActions;
