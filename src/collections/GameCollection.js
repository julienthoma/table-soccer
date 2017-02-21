import Collection from './Collection';
import Game from '../entities/Game';

export default class GameCollection extends Collection {
  constructor(rawGames, owner) {
    super(rawGames.map(rawGame => new Game(rawGame)))
    this.owner = owner;
  }

  filterByPlayer = id => this.items.filter(game => game.playerParticipates(id));
  filterByPosition = (position, id = this.owner) => new GameCollection(this.items.filter(game => game.getPlayers().filter(player => {
    return player.position === position && player.id === id;
  }).length > 0), id);
  filterByPlayerWins = (id = this.owner) =>
    new GameCollection(this.items.filter(game => game.raw.winners.filter(winner => winner.id === id).length > 0), id);
  filterByPlayerLosses = (id = this.owner) =>
    new GameCollection(this.items.filter(game => game.raw.losers.filter(loser => loser.id === id).length > 0), id);

  getDuration = () => this.items.reduce((sum, item) => sum + item.getDuration(), 0);

  getDurationString = () =>  (this.getDuration() / 60 / 60).toFixed(1) + 'h';

  getGoalsByPlayer = (id = this.owner) => this.items.reduce((sum, item) => sum + item.getGoalsByPlayer(id).length, 0);
  getGpgByPlayer = () => {
    const goals = this.getGoalsByPlayer();

    if (goals === 0) {
      return 0
    }

    return (goals / this.count()).toFixed(2);
  }

  getWinPercent = () => {
    const wins = this.filterByPlayerWins().count();

    if (wins === 0) {
      return '0%';
    }

    return ((wins / this.count()) * 100).toFixed(0) + '%';
  }
}

