import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginParams, RegisterParams } from "../types/Authentication";
import { State } from "../store";
import { APPLICATION_SLICE } from "../constants";

export type AuthenticationState = {
  introMessageShown: boolean;
  authenticationToken: string | null;
};

const initialState: AuthenticationState = {
  authenticationToken: null,
  introMessageShown: false,
};

interface AdditionalSliceFeatures {
  selectors: {
    authenticationToken(state: State): string | null;
    introMessageShown(state: State): boolean;
  };
}

export interface RegisterAction {
  params: RegisterParams;
  cb: () => void;
}

export interface LoginAction {
  params: LoginParams;
}

const _slice = createSlice({
  name: APPLICATION_SLICE.AUTH,
  initialState,
  reducers: {
    setAuthenticationToken(
      state: AuthenticationState,
      action: PayloadAction<string | null>
    ) {
      state.authenticationToken = action.payload;
    },
    setIntroMessageShown(
      state: AuthenticationState,
      action: PayloadAction<boolean>
    ) {
      state.introMessageShown = action.payload;
    },
    register(_, action: PayloadAction<RegisterAction>) {},
    login(_, action: PayloadAction<LoginAction>) {},
    logout() {},
  },
});

export const authenticationSlice: typeof _slice & AdditionalSliceFeatures =
  _slice as any;

authenticationSlice.selectors = {
  authenticationToken: (state: State): string | null => {
    return state.auth.authenticationToken;
  },
  introMessageShown: (state: State): boolean => {
    return state.auth.introMessageShown;
  },
};
