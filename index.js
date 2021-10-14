// Say we have a set of functions that make calls to a web service and return the data via Promises.
const { getRestaurant, getSpecialDish, getError } = require('./api');

// The return value of the functions is a Promise object. We can't get access to its value yet, because it's still pending.
const restaurantPromise = getRestaurant();
console.log(0, restaurantPromise); // Promise { <pending> }

// To get access to its value when it *is* available, we call `.then()` and pass a callback function to it. The callback function receives the value as its argument.
restaurantPromise.then(resolvedValue => {
  console.log(1, resolvedValue); // Sushi Place
});

// The returned value of `.then()` is another Promise.
const anotherPromise = getRestaurant().then(() => {
  /*...*/
});
console.log('C', anotherPromise); // Promise { <pending> }

// If you return a value from a `.then()` callback, its returned Promise resolves to that value.
getRestaurant()
  .then(restaurant => {
    return `The Best ${restaurant}`;
  })
  .then(resolvedValue => {
    console.log(2, resolvedValue); // The Best Sushi Place
  });

// If within a `.then()` callback you return another Promise that resolves, the outer Promise resolves to the inner Promise's resolved value.
getRestaurant()
  .then(() => {
    return Promise.resolve('Pizza Place');
  })
  .then(resolvedValue => {
    console.log('A', resolvedValue); // Pizza Place
  });

// The above isn't usually that useful, but what *is* useful is returning a promise created by another function.
getRestaurant()
  .then(restaurant => {
    return getSpecialDish(restaurant);
  })
  .then(resolvedValue => {
    console.log(3, resolvedValue); // Sushi Place Special Roll
  });

// You have to make sure to return that Promise as the return value of the function, though. Just creating it doesn't work.
getRestaurant()
  .then(restaurant => {
    getSpecialDish(restaurant);
  })
  .then(resolvedValue => {
    console.log(4, resolvedValue); // undefined
  });

// TDOO talk about timing here?

// If you need to get access to the resolved values of two Promises you call in sequence, you can chain a `.then()` on the second promise inside the first Promise's `.then()`. That way both resolved values are in scope.
getRestaurant()
  .then(restaurant => {
    return getSpecialDish(restaurant).then(dish => {
      return { restaurant, dish };
    });
  })
  .then(resolvedValue => {
    console.log(6, resolvedValue); // { restaurant: 'Sushi Place', dish: 'Sushi Place Special Roll' }
  });

// Promises report errors (called rejections) to a `.catch()` callback function. Any `.then()` callbacks are skipped.
getError()
  .then(resolvedValue => {
    console.log(7, resolvedValue); // not called
  })
  .catch(error => {
    console.error(8, error); // Something went wrong
  });

// Like `.then()`, `.catch()` returns a new Promise. If an error is caught, the Promise returned by `.catch()` resolves; it doesn't reject. This may be surprising.
getError()
  .catch(error => {
    /* ... */
  })
  .then(resolvedValue => {
    console.log(10, resolvedValue); // undefined
  });

// This is useful for when you want to handle an error and pass along a value to "get things working again". You can just return a value you want the Promise to resolve to. As we saw before, returning Promise.resolve() is unnecessary; you can return the value directly.
getError()
  .catch(error => {
    return 'fix';
  })
  .then(resolvedValue => {
    console.log(12, resolvedValue); // fix
  });

// If you want to do something in response to an error but then pass it along, you can return a rejected Promise. This is useful if another part of your app also needs to know about the error.
getError()
  .catch(error => {
    console.error(13, error); // Something went wrong
    return Promise.reject(error);
  })
  .catch(error => {
    console.error(14, error); // Something went wrong
  });

// Alternatively, you can use the `throw` keyword to throw the error.
getError()
  .catch(error => {
    console.error(15, error); // Something went wrong
    throw error;
  })
  .catch(error => {
    console.error(16, error); // Something went wrong
  });

// this also works inside a `.then()` block
getRestaurant()
  .then(() => {
    throw 'actually an error';
  })
  .catch(error => {
    console.error('B', error); // actually an error
  });

// So the rule is the same for both `.then()` and `.catch()`: they both return a Promise that resolves by default, and only rejects if you `throw` or return a rejected promise.
