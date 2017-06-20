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
 * @property {function} getWinPercent
 */
export default class Player extends Entity {
  constructor(props) {
    super(props);
    this.goalsPosStriker = 0;
    this.goalsPosMidfield = 0;
    this.goalsPosDefense = 0;
    this.goalsPosKeeper = 0;
    this.ownGoals = 0;
    this.winStreak = 0;
    this.longestWinStreak = 0;
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
    this.winsAttackDuration = 0;
    this.lossDefenseDuration = 0;
    this.goalsWinnerAttack = 0;
    this.goalsAgainstDefense = 0;
    this.winRatio = 0;
  }

  getWinPercentFormatted() {
    return `${Math.round(this.winRatio * 100)}%`;
  }

  getPlayTime() {
    return Player.getHourString(this.playTime);
  }

  getPlayTimeAttack() {
    return Player.getHourString(this.playTimeAttack);
  }

  getPlayTimeDefense() {
    return Player.getHourString(this.playTimeDefense);
  }

  static getHourString(time) {
    if (time === 0) {
      return '-';
    }

    return `${Math.round(time / 60 / 60)}h`;
  }
}
