import { ReactiveVar, makeVar } from "@apollo/client";
import { UserData } from "types";

const userDataInitialValue: UserData = {
  token: "",
  client: "",
  uid: "",
};

export const userDataVar: ReactiveVar<UserData> =
  makeVar<UserData>(userDataInitialValue);
