class ApiManager {
  constructor(storage_name) {
    this.base_url =
      "https://bezkomisijas.lv/api-storage/1afa146fca636c3026b1804c03cd7266/" +
      storage_name +
      "/";
  }

  getRequest(callback) {
    fetch(this.base_url + "?action=get-all")
      .then((response) => response.json())
      .then((result) => {
        if (result.status == true) {
          callback(result.entries);
        }
      });
  }

  create(form_data, callback) {
    this.postRequest("create", form_data, callback);
  }

  delete(id) {
    const form_data = new FormData();
    form_data.append("id", id);

    this.postRequest("delete", form_data);
  }

  postRequest(action, form_data, callback = null) {
    fetch(this.base_url + "?action=" + action, {
      method: "post",
      body: form_data,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == true && callback != null) {
          callback(result);
        }
      });
  }
}

// https://bezkomisijas.lv/api-storage/1afa146fca636c3026b1804c03cd7266/
// {
//   "status": true,
//   "0": "https://bezkomisijas.lv/api-storage/1afa146fca636c3026b1804c03cd7266/{storage_name}/?action=create",
//   "1": "https://bezkomisijas.lv/api-storage/1afa146fca636c3026b1804c03cd7266/{storage_name}/?action=get-all",
//   "2": "https://bezkomisijas.lv/api-storage/1afa146fca636c3026b1804c03cd7266/{storage_name}/?action=update",
//   "3": "https://bezkomisijas.lv/api-storage/1afa146fca636c3026b1804c03cd7266/{storage_name}/?action=delete",
//   "4": "https://bezkomisijas.lv/api-storage/1afa146fca636c3026b1804c03cd7266/{storage_name}/?action=clear"
// }
