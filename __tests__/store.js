import { createStore } from '../store';

describe('store', () => {
  describe('initial state', () => {
    it('has empty widgets', () => {
      const store = createStore();
      expect(store.getState().widgets).toEqual([]);
    });

    it('has empty weebles', () => {
      const store = createStore();
      expect(store.getState().weebles).toEqual([]);
    });
  });

  describe('getWidgets', () => {
    it('stores the widgets on the state', async () => {
      const widgets = [1, 2, 3];
      const api = {
        getWidgets: jest.fn().mockName('getWidgets').mockResolvedValue(widgets),
      };
      const store = createStore(api);
      await store.loadWidgets();
      expect(store.getState().widgets).toEqual(widgets);
    });
  });

  describe('getWeebles', () => {
    it('stores the weebles on the state', async () => {
      const weebles = [1, 2, 3];
      const api = {
        getWeebles: jest.fn().mockName('getWeebles').mockResolvedValue(weebles),
      };
      const store = createStore(api);
      await store.loadWeebles();
      expect(store.getState().weebles).toEqual(weebles);
    });
  });

  describe('getAll', () => {
    it('loads both widgets and weebles', async () => {
      const widgets = [1, 2, 3];
      const weebles = [4, 5, 6];
      const api = {
        getWidgets: jest.fn().mockName('getWidgets').mockResolvedValue(widgets),
        getWeebles: jest.fn().mockName('getWeebles').mockResolvedValue(weebles),
      };
      const store = createStore(api);
      await store.loadAll();
      expect(store.getState().widgets).toEqual(widgets);
      expect(store.getState().weebles).toEqual(weebles);
    });
  });
});
