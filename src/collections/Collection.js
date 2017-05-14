export default class Collection {
  constructor(items) {
    this.items = items;
  }

  count() {
    return this.items.length;
  }
}
