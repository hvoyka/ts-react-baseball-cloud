import ApiService from "./ApiService";
import { AuthData } from "../types";

export const signInRequest = ({ email, password }: AuthData) => {
  return ApiService.post("/auth/sign_in", { email, password });
};

export const signUpRequest = ({ email, password }: AuthData) => {
  return ApiService.post("/auth", { email, password });
};

export const signOutRequest = () => {
  return ApiService.delete("/auth/sign_out");
};

export const forgotPasswordRequest = ({ email }: AuthData) => {
  return ApiService.post("/auth/password", { email });
};

export const resetPasswordRequest = ({ email, password }: AuthData) => {
  return ApiService.put("/auth/password", { email, password });
};
