import { Branch as BranchModel } from "@/api/models/branch";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import {
  addressesApi,
  CreateAddressDto
} from "../api/address-api";
import {
  branchesApi,
  CreateBranchDto,
  UpdateBranchDto,
} from "../api/branch-api";
import {
  CreateWeekdayScheduleDto,
  scheduleApi
} from "../api/schedule-api";
import { storeApi } from "../api/store-api";
import { objFromArray } from "../utils/obj-from-array";
interface ByIdBranch {
  [key: number]: BranchModel;
}
interface BranchesState {
  activeBranchId: number | null;
  branches: {
    byId: ByIdBranch;
    allIds: number[];
  };
}
const initialState: BranchesState = {
  activeBranchId: null,
  branches: {
    byId: {},
    allIds: [],
  },
};

const slice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    getBranches(state, action) {
      const branches = action.payload;
      state.branches.byId = objFromArray(branches);
      state.branches.allIds = Object.keys(state.branches.byId).map((el) => +el);
    },
    getBranch(state, action) {
      const branch = action.payload;
      // console.log(branch)
      if (branch) {
        state.branches.byId[branch.id] = branch;
        if (!state.branches.allIds.includes(branch.id)) {
          state.branches.allIds.unshift(branch.id);
        }
      }
    },
    addBranch(state, action) {
      const branch = action.payload;
      state.branches.byId[branch.id] = branch;
      state.branches.allIds.push(branch.id);
    },
    deleteBranch(state, action) {
      const branchId = action.payload;
      delete state.branches.byId[branchId];
      state.branches.allIds = state.branches.allIds.filter(
        (_branchId) => _branchId !== branchId
      );
    },
    updateBranch(state, action) {
      const branch = action.payload;
      state.branches.byId[branch.id] = branch;
    },
    updateSchedule(state, action) {
      const { scheduleId, id, weekdaySchedules } = action.payload;
      state.branches.byId[id] = {
        ...state.branches.byId[id],
        schedule: {
          id: scheduleId,
          branchId: id,
          weekdaySchedules,
        },
      };
    },

    setAddress(state, action) {
      const { branchId, address } = action.payload;
      state.branches.byId[branchId] = {
        ...state.branches.byId[branchId],
        address,
      };
    },
  },
});

export const { reducer } = slice;

export const getAddress =
  ({ addressId }: { addressId: number }) =>
  async (dispatch: Dispatch) => {
    const response = await addressesApi.getAddressById(addressId);
    dispatch(
      slice.actions.setAddress({
        branchId: response.data.branchId,
        address: response.data,
      })
    );
    return response;
  };

export const createAddress =
  ({ address }: { address: CreateAddressDto }) =>
  async (dispatch: Dispatch) => {
    const response = await addressesApi.createAddress({ ...address });
    dispatch(
      slice.actions.setAddress({
        branchId: address.branchId,
        address: response.data,
      })
    );
    return response;
  };

export const updateAddress =
  ({ branchId, address }: { branchId: number; address: any }) =>
  async (dispatch: Dispatch) => {
    const response = await addressesApi.updateAddress(address.id, address);
    dispatch(slice.actions.setAddress({ branchId, address: response.data }));
    return response;
  };

export const getBranches = (storeId: number) => async (dispatch: Dispatch) => {
  const { data } = await storeApi.getStorebyId(storeId);
  if (!data) return;
  dispatch(slice.actions.getBranches(data.branches));
  return data;
};

export const getBranch = (branchId: number) => async (dispatch: Dispatch) => {
  const response = await branchesApi.getBranchById(branchId);
  dispatch(slice.actions.getBranch(response.data));
  return response;
};

export const createBranch =
  (branch: CreateBranchDto) => async (dispatch: Dispatch) => {
    const response = await branchesApi.createBranch(branch);
    dispatch(slice.actions.addBranch(response.data));
    return response;
  };

export const deleteBranch =
  (branchId: number) => async (dispatch: Dispatch) => {
    const response = await branchesApi.deleteBranch(branchId);
    dispatch(slice.actions.deleteBranch(response.data.id));
    return response;
  };

export const updateBranch =
  (branchId: number, branch: UpdateBranchDto) => async (dispatch: Dispatch) => {
    const response = await branchesApi.updateBranch(branchId, branch);
    dispatch(slice.actions.updateBranch(response.data));
    return response;
  };

export const upsertSchedule =
  ({
    weekdaySchedules,
    branchId,
  }: {
    weekdaySchedules: CreateWeekdayScheduleDto[];
    branchId: number;
  }) =>
  async (dispatch: Dispatch) => {
    const response = await scheduleApi.upsertSchedule({
      branchId,
      weekdaySchedules,
    });
    dispatch(slice.actions.updateBranch(response));
    return response;
  };
