  class ListEntryManager
{

  constructor(callbacks = {}) {
    this.callbacks = callbacks;
    const form = document.querySelector('.form_list_entries');
    const obj = this;
    this.template = document.querySelector('.tamplate_list_entry');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      obj.handleSubmit(form);
    });
  }

  handleSubmit(form) {
    const form_data = new FormData(form);
    form.reset();
    const data = {};

    for (const field_name of form_data.keys()) {
      const field = form.querySelector('[name="' + field_name + '"]'); //[name="comment"]
      const field_value = form_data.get(field_name).trim();
      if (field.required && field_value.length == 0) {
        return;
      }
      data[field_name] = field_value;
    }

    let id = null;
    if (this.callbacks.hasOwnProperty('beforeCreateHook')) {
      id = this.callbacks.beforeCreateHook(form_data);
    }

    this.addListElement(data, id);
  }

  addListElement(data, id = null) {
    const new_el = this.template.content.firstElementChild.cloneNode(true);
    if (id !== null) {
      new_el.dataset.id = id;
    }

    for (const field_name in data) {
      const place = new_el.querySelector('.place_' + field_name);
      if (place !== null) {
        place.textContent = data[field_name];
        
      }
    }

    this.template.parentElement.prepend(new_el);

    if (this.callbacks.hasOwnProperty('afterAddToListHook')) {
      this.callbacks.afterAddToListHook(new_el, data);
    }
  }
}