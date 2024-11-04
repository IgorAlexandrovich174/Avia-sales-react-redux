import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    transferSettings: {
      selectAllOptions: true,
      selectedTransfers: {
        0: true,
        1: true,
        2: true,
        3: true,
      },
    },
    qualityFilter: "cheapest",
  },
  reducers: {
    toggleSelectAll(state) {
      const currentStatus = state.transferSettings.selectAllOptions;
      state.transferSettings.selectAllOptions = !currentStatus;
      Object.keys(state.transferSettings.selectedTransfers).forEach((key) => {
        state.transferSettings.selectedTransfers[key] = !currentStatus;
      });
    },
    toggleTransferOption(state, action) {
      const option = action.payload;
      if (state.transferSettings.selectedTransfers[option]) {
        state.transferSettings.selectAllOptions = false;
      }
      state.transferSettings.selectedTransfers[option] =
        !state.transferSettings.selectedTransfers[option];
      if (
        state.transferSettings.selectedTransfers["0"] &&
        state.transferSettings.selectedTransfers["1"] &&
        state.transferSettings.selectedTransfers["2"] &&
        state.transferSettings.selectedTransfers["3"]
      ) {
        state.transferSettings.selectAllOptions = true;
      }
    },
    toggleQualityOption(state, action) {
      state.qualityFilter = action.payload;
    },
  },
});

export const { toggleSelectAll, toggleTransferOption, toggleQualityOption } =
  filterSlice.actions;

export default filterSlice.reducer;
