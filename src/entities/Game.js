import Entity from './Entity';

export default class Game extends Entity {
  getScore = () => ({
    winner: this.raw.winners[0].score + this.raw.winners[1].score,
    loser: this.raw.losers[0].score + this.raw.losers[1].score
  });
s
  getDuration = () =>
    Math.ceil(((new Date(this.raw.enddate)).getTime() - (new Date(this.raw.startdate)).getTime()) / 1000);

  getDurationInMinutes() {
    return Math.round(this.getDuration() / 60);
  }

  getGoalsByPlayer = id => this.raw.scoreTimeline.filter(scorer => scorer.id === id);

  getEloByPlayer = id => this.raw.elo[id];

  getPlayers = () => this.raw.winners.concat(this.raw.losers);

  getPlayerPosition = id => this.getPlayers().filter(player => player.id === id)[0].position;

  playerParticipates = id => this.getPlayers().filter(player => player.id === id).length > 0;

  isPlayerHot(id) {
    return this.raw.elo.winStreak[id] >= 3;
  }
}
