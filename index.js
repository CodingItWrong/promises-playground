const getRestaurant = () => Promise.resolve('Sushi Place');
const getDish = () => Promise.resolve('Rainbow Roll');
const getError = () => Promise.reject('an error');

const restaurantPromise = getRestaurant();
console.log({ restaurantPromise });

// A promise that resolves, passes the resolved value to the .then() callback
restaurantPromise.then(resolvedValue => {
  console.log(1, resolvedValue);
});

// If you return a value from a `.then()` callback (phrasing), the overall promise resolves to that
restaurantPromise
  .then(() => {
    return 'Pizza Place';
  })
  .then(resolvedValue => {
    console.log(2, resolvedValue);
  });

// if you return another promise that resolves, the overall promise resolves to that
restaurantPromise
  .then(() => {
    return Promise.resolve('Pizza Place');
  })
  .then(resolvedValue => {
    console.log('A', resolvedValue);
  });

// The above isn't useful, but what *is* useful is returning another promise created by elsewhere
getRestaurant()
  .then(() => {
    return getDish();
  })
  .then(resolvedValue => {
    console.log(3, resolvedValue);
  });

// you have to return that promise; just kicking it off doesn't work
getRestaurant()
  .then(() => {
    getDish();
  })
  .then(resolvedValue => {
    console.log(4, resolvedValue);
  });

// if it's just one quick call you can use the expression form of arrow functions to return the value (CONSIDER TEACHING ARROW FUNCTIONS ABOVE)
getRestaurant()
  .then(() => getDish())
  .then(resolvedValue => {
    console.log(5, resolvedValue);
  });

// (maybe less important to teach) if you need the values from both functions, you can chain a .then() inside, that way it has both resolved value variables in scope
getRestaurant()
  .then(restaurant => {
    return getDish().then(dish => {
      return { restaurant, dish };
    });
  })
  .then(resolvedValue => {
    console.log(6, resolvedValue);
  });

// if a promise rejects, the `.catch()` callback gets the error; a `.then()` is skipped
getError()
  .then(resolvedValue => {
    console.log(7, resolvedValue);
  })
  .catch(error => {
    console.error(8, error);
  });

// if you catch an error, by default the promise resolves
getError()
  .catch(error => {
    console.error(9, error);
  })
  .then(resolvedValue => {
    console.log(10, resolvedValue);
  });

// this means if you want to catch an error and pass along a fix value, you can just return it. (returning Promise.resolve() is unnecessary as we saw before)
getError()
  .catch(error => {
    console.error(11, error);
    return 'fix';
  })
  .then(resolvedValue => {
    console.log(12, resolvedValue);
  });

// TODO: need to put these in separate files to visualize it. But use with "production code", not tests

// if you want to operate on an error and then pass it along, you can return a rejected promise
getError()
  .catch(error => {
    console.error(13, error);
    return Promise.reject(error);
  })
  .catch(error => {
    console.error(14, error);
  });

// this also works inside a `.then()` block
getRestaurant()
  .then(() => {
    return Promise.reject('actually an error');
  })
  .catch(error => {
    console.error('B', error);
  });

// you can also `throw` instead of returning the rejected promise
getError()
  .catch(error => {
    console.error(15, error);
    throw error;
  })
  .catch(error => {
    console.error(16, error);
  });
