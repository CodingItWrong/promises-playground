const runOnNextTick = func => {
  const promise = new Promise((resolve, reject) => {
    func().then(resolve).catch(reject);
  });
  return promise;
};

export const createStore = api => {
  const state = {
    widgets: [],
    weebles: [],
  };

  const getState = () => state;
  const loadWidgets = () =>
    runOnNextTick(api.getWidgets).then(widgets => {
      state.widgets = widgets;
    });
  const loadWeebles = () =>
    runOnNextTick(api.getWeebles).then(weebles => {
      state.weebles = weebles;
    });
  const loadAll = () =>
    loadWidgets().then(() => {
      // loadWeebles();
      return loadWeebles();
    });

  return {
    getState,
    loadWidgets,
    loadWeebles,
    loadAll,
  };
};
