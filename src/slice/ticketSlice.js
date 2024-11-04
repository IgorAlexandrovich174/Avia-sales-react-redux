import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const fetchUserId = createAsyncThunk("tickets/fetchUserId", async () => {
  const response = await fetch(
    "https://aviasales-test-api.kata.academy/search",
  );
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return await response.json();
});

export const fetchTicketsList = createAsyncThunk(
  "tickets/fetchTicketsList",
  async (_, { getState, rejectWithValue }) => {
    const usId = getState().tickets.userId;
    const response = await fetch(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${usId}`,
    );
    if (!response.ok) {
      return rejectWithValue(response.status);
    }
    return await response.json();
  },
);

export const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    status: null,
    tickets: [],
    userId: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userId = action.payload.searchId;
      })
      .addCase(fetchUserId.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchTicketsList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTicketsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.stop) {
          return;
        }
        state.tickets.push(
          ...action.payload.tickets.map((item) => {
            return { ...item, id: nanoid() };
          }),
        );
      })
      .addCase(fetchTicketsList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default ticketSlice.reducer;
