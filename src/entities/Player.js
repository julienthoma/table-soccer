import Entity from './Entity';

/**
 * @class PlayerEntity
 * @property {string} id
 * @property {string} name
 * @property {number} winStreak
 * @property {number} wins
 * @property {number} winsAttack
 * @property {number} winsDefense
 * @property {number} losses
 * @property {number} lossesAttack
 * @property {number} lossesDefense
 * @property {number} games
 * @property {number} gamesAttack
 * @property {number} gamesDefense
 * @property {number} goals
 * @property {number} goalsAttack
 * @property {number} goalsDefense
 * @property {number} gpg
 * @property {GameEntity[]} gameEntites
 * @property {function} getWinPercent
 */
export default class Player extends Entity {
  constructor(props) {
    super(props);
    this.gameEntites = [];
    this.winStreak = 0;
    this.wins = 0;
    this.winsAttack = 0;
    this.winsDefense = 0;
    this.losses = 0;
    this.lossesAttack = 0;
    this.lossesDefense = 0;
    this.games = 0;
    this.gamesAttack = 0;
    this.gamesDefense = 0;
    this.goals = 0;
    this.goalsAttack = 0;
    this.goalsDefense = 0;
    this.gpg = 0;
    this.elo = 1500;
    this.goalsAgainst = 0;
    this.playTime = 0;
    this.playTimeAttack = 0;
    this.playTimeDefense = 0;
  }

  getWinPercent() {
    if (this.wins === 0) {
      return '-';
    }

    return `${Math.round((this.wins / this.games) * 100)}%`;
  }

  getPlayTime() {
    return this.getHourString(this.playTime);
  }

  getPlayTimeAttack() {
    return this.getHourString(this.playTimeAttack);
  }

  getPlayTimeDefense() {
    return this.getHourString(this.playTimeDefense);
  }

  getHourString(time) {
    if (time === 0) {
      return '-';
    }

    return `${Math.round(time / 60 / 60)}h`;
  }
}
