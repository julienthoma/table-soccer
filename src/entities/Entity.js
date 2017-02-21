export default class Entity {
  constructor(rawEntity) {
    this.raw = rawEntity;

    Object.keys(rawEntity).forEach(key => {
      this[key] = rawEntity[key];
    });
  }
}