import * as actions from './index';

describe('actions', () => {
  it('UPDATE_DATA', () => {
    expect(actions.updateData({ fu: 'bar' }))
      .toEqual({ type: 'UPDATE_DATA', data: { fu: 'bar' } });
  });

  it('START_GAME', () => {
    expect(actions.startGame())
      .toEqual({ type: 'START_GAME' });
  });

  it('END_GAME', () => {
    expect(actions.endGame({ fu: 'bar' }))
      .toEqual({ type: 'END_GAME', game: { fu: 'bar' } });
  });

  it('EXIT_GAME', () => {
    expect(actions.exitGame())
      .toEqual({ type: 'EXIT_GAME' });
  });

  it('ADD_GOAL', () => {
    expect(actions.addGoal(2))
      .toEqual({ type: 'ADD_GOAL', index: 2 });
  });

  it('UNDO_LAST_GOAL', () => {
    expect(actions.undoLastGoal(2))
      .toEqual({ type: 'UNDO_LAST_GOAL', index: 2 });
  });

  it('SET_PLAYERS', () => {
    expect(actions.setPlayers([1, 2, 3]))
      .toEqual({ type: 'SET_PLAYERS', players: [1, 2, 3] });
  });

  it('TOGGLE_SNACKBAR', () => {
    expect(actions.toggleSnackbar('Info', 'Action', null))
      .toEqual({
        type: 'TOGGLE_SNACKBAR',
        infoText: 'Info',
        actionText: 'Action',
        callbackFn: null
      });
  });
});
