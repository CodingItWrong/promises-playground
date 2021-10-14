const opaquePromise = (value, { reject = false } = {}) =>
  new Promise((resolveCallback, rejectCallback) => {
    setTimeout(() => {
      if (reject) {
        rejectCallback(value);
      } else {
        resolveCallback(value);
      }
    }, 100);
  });

const getRestaurant = () => opaquePromise('Sushi Place');
const getSpecialDish = restaurant =>
  opaquePromise(`${restaurant} Special Roll`);
const getError = () => opaquePromise('Something went wrong', { reject: true });

module.exports = {
  getRestaurant,
  getSpecialDish,
  getError,
};
