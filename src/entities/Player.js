import Entity from './Entity';

export default class Player extends Entity {
  constructor(props, gameCollection) {
    super(props);
    this.games = gameCollection;
  }
}
