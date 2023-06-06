class ApiManager
{
  constructor(storage_name) {
    this.base_url = "https://bezkomisijas.lv/api-storage/eee0788a37c07de748cd6ae690eed69b/" + storage_name + "/";
  }

  getRequest (callback) {
    fetch(this.base_url + "?action=get-all")
      .then((response) => response.json())
      .then((result) => {
        if (result.status == true) {
          callback(result.entries);
        }
      });
  }
  
  postRequest (form_data, callback) {
    fetch(this.base_url + "?action=create", {
      method: 'post',
      body: form_data
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == true) {
          callback(result);
        }
      });
  }
}

//https://bezkomisijas.lv/api-storage/eee0788a37c07de748cd6ae690eed69b/reviews/?action=get-all