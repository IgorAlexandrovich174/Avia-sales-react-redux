import { configureStore } from "@reduxjs/toolkit";
import filterSliceReducer from "../slice/filterSlice.js";
import ticketsSliceReducer from "../slice/ticketSlice.js";

const store = configureStore({
  reducer: {
    filter: filterSliceReducer,
    tickets: ticketsSliceReducer,
  },
});

export default store;
