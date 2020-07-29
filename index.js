const getWidgets = () => Promise.resolve(['Widget 1', 'Widget 2']);
const getWeebles = () => Promise.resolve(['Weeble A', 'Weeble B']);

// getWidgets().then(widgets => {
//   console.log(widgets);
// });
//
// getWeebles().then(console.log);

// getWidgets()
//   .then(() => {
//     return getWeebles();
//   })
//   .then(result => {
//     console.log(result);
//   });

// getWidgets().then(widgets => {
//   getWeebles().then(weebles => {
//     console.log({ widgets, weebles });
//   });
// });

// getWidgets()
//   .then(widgets => {
//     return getWeebles().then(weebles => {
//       return { widgets, weebles };
//     });
//   })
//   .then(result => {
//     console.log(result);
//   });
