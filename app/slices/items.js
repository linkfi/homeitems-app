import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ItemService from '../services/ItemService';

const initialState = [];

export const createItem = createAsyncThunk(
  'items/create',
  async ({ name, count, manufacturer }) => {
    const res = await ItemService.create({ name, count, manufacturer });
    console.log(res);
    console.log(res.data);
    return res.data;
  },
);

export const retrieveItems = createAsyncThunk(
  'items/retrieve',
  async () => {
    const res = await ItemService.getAll();  
    return res.data;
  },
);

export const updateItem = createAsyncThunk(
  'items/update',
  async ({ _id, data }) => {
    const res = await ItemService.update(_id, data);   
    return res.data;
  },
);

export const deleteItem = createAsyncThunk(
  'items/delete',
  async ( _id ) => {
    await ItemService.remove(_id);
    return { _id };
  },
);


const itemSlice = createSlice({

  name: 'item',
  initialState,
  extraReducers: {

    [createItem.fulfilled]: (state, action) => {
        console.log('createItem.fulfilled');
      state.push(action.payload);
    },

    [retrieveItems.fulfilled]: (state, action) => [...action.payload],

    [updateItem.fulfilled]: (state, action) => {
      const index = state.findIndex((item) => item._id === action.payload._id);    
      /* eslint-disable no-param-reassign */
      state[index] = { ...state[index], ...action.payload };

      /* eslint-enable no-param-reassign */
    },

    [deleteItem.fulfilled]: (state, action) => {
      const index = state.findIndex(({ _id }) => _id === action.payload._id);
      state.splice(index, 1);
    },
   
  },
});

const { reducer } = itemSlice;
export default reducer;
