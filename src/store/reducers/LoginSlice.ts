// import { firstValueFrom, Observable } from "rxjs";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { ILoginPayload } from "@/app/Components/LoginForm";

export interface LoginSliceType {
  loginDetails?: any;
  loading?: boolean;
  error?: string;
}

// const loginService = new LoginServiceApi();

const createCustomAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();

export const fetchLoginDetail = createCustomAsyncThunk(
  "userDetails/fetchLoginDetail",
  async (userDetails: ILoginPayload) => {
    return userDetails;
  }
);

const initialState: LoginSliceType = {};

function onPending(state: LoginSliceType) {
  state.loading = true;
}

function onReject(state: LoginSliceType, action: any) {
  state.error = action.error.message;
}

function userDetailsFetched(state: LoginSliceType, action: PayloadAction<any>) {
  state.loading = false;
  state.error = undefined;
  state.loginDetails = {...action.payload};
  console.log(state.loginDetails)
}

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    reset(state: LoginSliceType) {
      state.error = undefined;
      state.loading = undefined;
      state.loginDetails = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginDetail.pending, onPending)
      .addCase(fetchLoginDetail.rejected, onReject)
      .addCase(fetchLoginDetail.fulfilled, userDetailsFetched);
  },
});

export const { reset } = userDetailSlice.actions;
export default userDetailSlice.reducer;
