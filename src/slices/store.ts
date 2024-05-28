import { Store } from "@/api/models/store";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { CreateStoreDto, storeApi, UpdateStoreDto } from "../api/store-api";
import { objFromArray } from "../utils/obj-from-array";
interface ByIdStore {
  [key: number]: Store;
}

interface StoreState {
  activeStoreId: number | null;
  stores: {
    byId: ByIdStore;
    allIds: number[];
  };
}

const initialState: StoreState = {
  activeStoreId: null,
  stores: {
    byId: {},
    allIds: [],
  },
};

const slice = createSlice({
  name: "store",
  initialState,
  reducers: {
    getStores(state, action: PayloadAction<Store[]>) {
      const stores = action.payload;
      state.stores.byId = objFromArray(stores);
      state.stores.allIds = Object.keys(state.stores.byId).map((el) => +el);
    },
    getStore(state, action: PayloadAction<Store>) {
      const store = action.payload;
      console.log(store)
      if (store) {
        state.stores.byId[store.id] = store;
        if (!state.stores.allIds.includes(store.id)) {
          state.stores.allIds.unshift(store.id);
        }
      }
    },
    addStore(state, action: PayloadAction<Store>) {
      const store = action.payload;
      state.stores.byId[store.id] = store;
      state.stores.allIds.push(store.id);
    },
    deleteStore(state, action: PayloadAction<number>) {
      const id = action.payload;
      delete state.stores.byId[id];
      state.stores.allIds = state.stores.allIds.filter(
        (_storeId) => _storeId !== id
      );
    },
    updateStore(state, action: PayloadAction<Store>) {
      const store = action.payload;

      state.stores.byId[store.id] = store;
    },
  },
});

export const { reducer } = slice;

export const getStores = () => async (dispatch: Dispatch) => {
  try {
    const response = await storeApi.getStores();
    dispatch(slice.actions.getStores(response.data));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getStore = (storeId: number) => async (dispatch: Dispatch) => {
  const response = await storeApi.getStorebyId(storeId);
  dispatch(slice.actions.getStore(response.data));
  return response;
};

export const createStore =
  (store: CreateStoreDto) => async (dispatch: Dispatch) => {
    const response = await storeApi.createStore(store);
    dispatch(slice.actions.addStore(response.data));
    return response;
  };

export const deleteStore = (storeId: number) => async (dispatch: Dispatch) => {
  const response = await storeApi.deleteStore(storeId);
  dispatch(slice.actions.deleteStore(response.data.id));
  return response;
};

export const updateStore =
  (storeId: number, store: UpdateStoreDto) => async (dispatch: Dispatch) => {
    const response = await storeApi.updateStore(storeId, store);
    dispatch(slice.actions.updateStore(response.data));
    return response;
  };
