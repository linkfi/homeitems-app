import { configureStore } from '@reduxjs/toolkit';

import itemReducer from './slices/items';

const reducer = {
  items: itemReducer,
};

const store = configureStore(
  {
    reducer,
    devTools: true,
  },
);

export default store;
