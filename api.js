const getRestaurant = () => Promise.resolve('Sushi Place');
const getDish = () => Promise.resolve('Rainbow Roll');
const getError = () => Promise.reject('an error');

module.exports = {
  getRestaurant,
  getDish,
  getError,
};
