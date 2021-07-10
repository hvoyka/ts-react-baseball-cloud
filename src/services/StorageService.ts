import { UserData } from "./../types";

class StorageService {
  setUserData({ token, client, uid }: UserData) {
    localStorage.setItem("access-token", token);
    localStorage.setItem("client", client);
    localStorage.setItem("uid", uid);
  }

  getUserData() {
    const token = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    if (token && client && uid) {
      return { token, client, uid };
    }
  }

  removeUserData() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
  }
}

export default new StorageService();
