export default class Entity {
  constructor(rawEntity) {
    Object.keys(rawEntity).forEach(key => {
      this[key] = rawEntity[key];
    });
  }
}
