import Entity from './Entity';

export default class Player extends Entity {
  constructor(props, gameCollection) {
    super(props);
    this.games = gameCollection;
    this.winStreak = 0;
  }

  getElo() {
    if (this.games.count() === 0) {
      return 1500;
    }

    return this.games.items[this.games.count() - 1].elo.total[this.id];
  }

  getWinStreak() {
    if (this.games.count() === 0) {
      return 0;
    }

    return this.games.items[this.games.count() - 1].elo.winStreak[this.id];
  }
}
