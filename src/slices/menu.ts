import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  branchesMenuApi,
  CreateCorridorDto,
  UpdateCorridorDto,
} from "../api/menu-board-api";
import {
  CreateProductDto,
  productsApi,
  UpdateProductDto,
} from "../api/product-api";
import { objFromArray } from "../utils/obj-from-array";
import { Corridor, CorridorState } from "@/api/models/corridor";
import { Product } from "@/api/models/product";
import { I } from "@/utils/generalObj";
import { Branch } from "@/api/models/branch";
interface ByIdRows {
  [key: number]: CorridorState;
}
interface IMenuBoard {
  rows: Corridor[];
  products: Product[];
}
interface ByIdProducts {
  [key: number]: Product;
}
interface MenuState {
  isLoaded: boolean;
  prevPosition: {
    rowId: number | null;
    index: number | null;
    cardId: number | null;
  };
  rows: {
    byId: ByIdRows;
    allIds: number[];
  };
  cards: {
    byId: ByIdProducts;
    allIds: number[];
  };
}
const initialState: MenuState = {
  isLoaded: false,
  prevPosition: {
    rowId: null,
    index: null,
    cardId: null,
  },
  rows: {
    byId: {},
    allIds: [],
  },
  cards: {
    byId: {},
    allIds: [],
  },
};

const slice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    getBoard(state, action: PayloadAction<IMenuBoard>) {
      const board = action.payload;

      state.rows.byId = objFromArray(board.rows);
      state.rows.allIds = Object.keys(state.rows.byId).map((el) => +el);
      state.cards.byId = objFromArray(board.products);
      state.cards.allIds = Object.keys(state.cards.byId).map((el) => +el);
      state.isLoaded = true;
    },
    createRow(state, action: PayloadAction<CorridorState>) {
      const row = action.payload;

      // state.rows.byId[row.id] = row;
      state.rows.byId[row.id] = { ...row, cardIds: row?.cardIds || [] };
      state.rows.allIds.push(row.id);
    },
    updateRow(state, action) {
      const row = action.payload;

      state.rows.byId[row.id] = row;
    },

    deleteRow(state, action) {
      const rowId = action.payload;

      delete state.rows.byId[rowId];
      state.rows.allIds = state.rows.allIds.filter(
        (_listId) => _listId != rowId
      );
    },
    createProductCard(state, action) {
      const card = action.payload;

      state.cards.byId[card.id] = card;
      state.cards.allIds.push(card.id);

      // Add the cardId reference to the row
      if (!state.rows.byId[card?.rowId || card?.corridorId]?.cardIds) {
        state.rows.byId[card?.rowId || card?.corridorId].cardIds = [];
      }
      state.rows.byId[card?.rowId || card?.corridorId].cardIds = [
        ...state.rows.byId[card?.rowId || card?.corridorId].cardIds,
        card.id,
      ];
    },
    updateProductCard(state, action) {
      const card = action.payload;
      const found = state.cards.byId[card.id];
      Object.assign(state.cards.byId[card.id], { ...found, ...card });
    },
    clearRow(state, action) {
      const rowId = action.payload;
      const { cardIds } = state.rows.byId[rowId];
      state.rows.byId[rowId].cardIds = [];
    },
    savePreviousPositionCard(state, action) {
      const { cardId } = action.payload;
      // find the current card
      const currentCard = state.cards.byId[cardId];
      // console.log(currentCard);
      state.prevPosition = {
        cardId,
        index: currentCard.index,
        rowId: currentCard.corridorId || null,
      };
    },
    moveProductCard(state, action) {
      const { cardId, position, rowId } = action.payload;
      const f = {...state.cards.byId};
      console.log(f);
      const sourceRowId = state.cards.byId[cardId].corridorId || 0;
      if (!sourceRowId)
        throw new Error(`Corridor not found Id in product card ${cardId}`);
      // Remove card from source row
      state.rows.byId[sourceRowId].cardIds = state.rows.byId[
        sourceRowId
      ].cardIds.filter((_cardId) => _cardId != cardId);

      // If rowId exists, it means that we have to add the card to the new row
      if (rowId) {
        // Change card's rowId reference
        state.cards.byId[cardId].corridorId = rowId;
        // Push the cardId to the specified position
        state.rows.byId[rowId].cardIds.splice(position, 0, cardId);
      } else {
        // Push the cardId to the specified position
        state.rows.byId[sourceRowId].cardIds.splice(position, 0, cardId);
      }
    },
    deleteProductCard(state, action) {
      const { id: cardId } = action.payload;

      const { corridorId: rowId } = state.cards.byId[cardId];
      if (!rowId) throw new Error(`error in cardid ${rowId}`);
      delete state.cards.byId[cardId];
      state.cards.allIds = state.cards.allIds.filter(
        (_cardId) => _cardId !== cardId
      );
      state.rows.byId[rowId].cardIds = state.rows.byId[rowId].cardIds.filter(
        (_cardId) => _cardId !== cardId
      );
    },
    undoMoveCard(state) {
      const { cardId, index, rowId } = state.prevPosition;
      if (!rowId) throw new Error(`error in cardid ${rowId}`);

      // Remove card from source row

      state.rows.byId = objFromArray(
        state.rows.byId[rowId].cardIds.filter((_cardId) => _cardId !== cardId)
      );
      if (cardId) {
        state.cards.byId[cardId].corridorId = rowId;
        if (index) state.rows.byId[rowId].cardIds.splice(index, 0, cardId);
      }
    },
  },
});

export const { reducer } = slice;

export const getBoard =
  ({ branchId }: { branchId: number }) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await branchesMenuApi.getBoard(branchId);
      const store = response.data.corridors.reduce<IMenuBoard>(
        (prev: IMenuBoard, currCorridor: Corridor) => {
          const { products, ...row } = currCorridor;
          return {
            rows: [
              ...prev.rows,
              { ...row, cardIds: products.map((el) => el.id) },
            ],
            products: [...prev.products, ...products],
          } as IMenuBoard;
        },
        { rows: [], products: [] } as IMenuBoard
      );
      dispatch(slice.actions.getBoard(store));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

export const createRow =
  (body: CreateCorridorDto) => async (dispatch: Dispatch) => {
    const response = await branchesMenuApi.createCorridorRow(body);
    const cardIds = response.data.products.reduce<number[]>(
      (prev: number[], currProd: Product) => {
        if (currProd && currProd?.id) return [...prev, currProd.id];
        return [...prev];
      },
      []
    );
    dispatch(
      slice.actions.createRow({
        ...response.data,
        cardIds,
      })
    );
    return response;
  };

export const deleteRow = (rowId: number) => async (dispatch: Dispatch) => {
  const response = await branchesMenuApi.deleteCorridorRow({
    corridorId: rowId,
  });
  dispatch(slice.actions.deleteRow(rowId));
  return response;
};

export const clearRow = (rowId: number) => async (dispatch: Dispatch) => {
  const response = await branchesMenuApi.clearCorridorRow({
    corridorId: rowId,
  });
  dispatch(slice.actions.clearRow(rowId));
  return response;
};

export const moveProductCard =
  ({
    cardId,
    position,
    rowId,
    branchId,
  }: {
    cardId: number;
    position: number;
    rowId?: number;
    branchId: number;
  }) =>
  async (dispatch: Dispatch) => {
    const body: I = { index: position };
    if (rowId) body["corridorId"] = rowId;
    await dispatch(slice.actions.savePreviousPositionCard({ cardId }));
    dispatch(slice.actions.moveProductCard({ cardId, position, rowId }));
    try {
      // throw new Error("errorcito")
      const response = await branchesMenuApi.moveCard({
        branchId,
        corridorId: rowId,
        index: position,
        productId: cardId,
      });

      return response;
    } catch (error) {
      dispatch(slice.actions.undoMoveCard());
      console.log(error);
      throw error;
    }
  };

export const updateRow =
  ({ corridorId, body }: { corridorId: number; body: UpdateCorridorDto }) =>
  async (dispatch: Dispatch) => {
    const response = await branchesMenuApi.updateCorridorRow({
      corridorId,
      body,
    });
    dispatch(slice.actions.updateRow(response.data));
    return response;
  };
export const createProductCard =
  ({ product }: { product: CreateProductDto }) =>
  async (dispatch: Dispatch) => {
    const response = await productsApi.createProduct({ body: product });
    dispatch(slice.actions.createProductCard(response.data));
    return response;
  };

export const updateProductCard =
  ({ productId, product }: { productId: number; product: UpdateProductDto }) =>
  async (dispatch: Dispatch) => {
    const response = await productsApi.updateProduct({
      productId,
      body: product,
    });
    dispatch(slice.actions.updateProductCard(response.data));
    return response;
  };

export const updateProductCardImage =
  ({ productId, body }: { productId: number; body: UpdateProductDto }) =>
  async (dispatch: Dispatch) => {
    const response = await productsApi.updateProductImage({
      productId,
      image: body.image,
    });
    dispatch(slice.actions.updateProductCard(response.data));
    return response;
  };

export const deleteProductCard =
  ({ productId }: { productId: number }) =>
  async (dispatch: Dispatch) => {
    const response = await productsApi.deleteProduct({ productId });
    dispatch(slice.actions.deleteProductCard(response.data));
    return response;
  };
