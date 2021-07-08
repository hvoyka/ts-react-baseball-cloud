import { UserData } from "./../types";

class StorageService {
  setUserData({ id, token, client, uid }: UserData) {
    localStorage.setItem("id", id.toString());
    localStorage.setItem("access-token", token);
    localStorage.setItem("client", client);
    localStorage.setItem("uid", uid);
  }

  getUserData() {
    const token = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");
    const id = localStorage.getItem("id");

    if (id && token && client && uid) {
      return { id, token, client, uid };
    }
  }

  removeUserData() {
    localStorage.removeItem("id");
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
  }
}

export default new StorageService();
