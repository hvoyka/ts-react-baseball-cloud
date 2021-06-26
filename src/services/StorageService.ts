interface StorageData {
  token: string;
  client: string;
  uid: string;
}

class StorageService {
  setData({ token, client, uid }: StorageData) {
    localStorage.setItem("access-token", token);
    localStorage.setItem("client", client);
    localStorage.setItem("uid", uid);
  }

  getData() {
    const token = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");
    if (token && client && uid) {
      return { token, client, uid };
    }
    return false;
  }

  removeData() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
  }
}

export default new StorageService();
