export interface AuthData {
  email: string;
  password?: string;
  password_confirmation?: string;
  role?: string;
  redirect_url?: string;
}

export type FetchStatus = "idle" | "pending" | "fulfilled" | "rejected";

export enum ROLES {
  PLAYER = "player",
  SCOUT = "scout",
}

export interface UserData {
  id: string;
  token: string;
  client: string;
  uid: string;
}
