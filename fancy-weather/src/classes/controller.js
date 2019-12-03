export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.getInitialData();
  }

  async getInitialData() {
    try {
      const position = await this.model.loadInitialData();
      const result = await this.model.loadData(position.coords.latitude, position.coords.longitude);
      this.model.loadedData = result;
    } catch (err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    this.view.displayData(this.model.loadedData);
  }

  // async getData() {

  // }
}
