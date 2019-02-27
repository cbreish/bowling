const assert = require('assert');
const { describe, it } = require('mocha');
const Game = require('../business/game');

describe('Bowling Score', () => {
  it('XXXXXXXXXXXX should return 300', () => {
    const game = new Game();
    game.parse('XXXXXXXXXXXX');
    assert.equal(game.score(), 300);
  });

  it('9-9-9-9-9-9-9-9-9-9- should return 90', () => {
    const game = new Game();
    game.parse('9-9-9-9-9-9-9-9-9-9');
    assert.equal(game.score(), 90);
  });

  it('9/9/9/9/9/9/9/9/9/9/9 should return 190', () => {
    const game = new Game();
    game.parse('9/9/9/9/9/9/9/9/9/9/9');
    assert.equal(game.score(), 190);
  });

  it('5/5/5/5/5/5/5/5/5/5/5 should return 150', () => {
    const game = new Game();
    game.parse('5/5/5/5/5/5/5/5/5/5/5');
    assert.equal(game.score(), 150);
  });

  it('33333333333333333333 should return 60', () => {
    const game = new Game();
    game.parse('33333333333333333333');
    assert.equal(game.score(), 60);
  });

  it('------------------X10 should return 11', () => {
    const game = new Game();
    game.parse('------------------X10');
    assert.equal(game.score(), 11);
  });
});
