import { createAsyncThunk } from '@reduxjs/toolkit';
import * as signalR from '@microsoft/signalr';

export const connectSignalR = createAsyncThunk(
  'signalR/connect',
  async (url, thunkAPI ) => {

    try {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(url).withAutomaticReconnect()
        .build();

      await connection.start()
      return {connectionId: connection.connectionId, state: connection.state}
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
