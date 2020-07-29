export const createStore = api => {
  const state = {
    widgets: [],
    weebles: [],
  };

  const getState = () => state;
  const loadWidgets = () =>
    api.getWidgets().then(widgets => {
      state.widgets = widgets;
    });
  const loadWeebles = () =>
    api.getWeebles().then(weebles => {
      state.weebles = weebles;
    });

  return {
    getState,
    loadWidgets,
    loadWeebles,
  };
};
