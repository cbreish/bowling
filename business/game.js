const Frame = require('./frame');

module.exports = class Game {
  constructor() {
    this._frames = new Array(10);
    this._currentFrame = 0;
    this._frames[this._currentFrame] = new Frame();
    this._nextRollBonus = [];
    this._secondNextRollBonus = null;
  }

  parse(input) {
    let previous = null;

    for (let i = 0; i < input.length; i += 1) {
      const current = input[i];
      switch (current) {
        case 'X':
          this.roll(10);
          break;
        case '/':
          this.roll(10 - previous);
          break;
        case '-':
          this.roll(0);
          break;
        default:
          this.roll(Number.parseInt(current, 10));
      }

      previous = current;
    }
  }

  roll(pins) {
    // Apply bonus
    while (this._nextRollBonus.length > 0) {
      const bonusFrame = this._nextRollBonus.pop();
      this._frames[bonusFrame].applyBonus(pins);
    }

    // Move second next roll bonus to next roll bonus
    if (this._secondNextRollBonus != null) {
      this._nextRollBonus.push(this._secondNextRollBonus);
      this._secondNextRollBonus = null;
    }

    // If previous frame is finished, create new frame
    let frame = this._frames[this._currentFrame];
    if (frame.isFinished) {
      this._currentFrame += 1;
      this._frames[this._currentFrame] = new Frame(this._currentFrame === 9);
      frame = this._frames[this._currentFrame];
    }

    // Roll
    frame.roll(pins);

    // Setup frame bonuses
    if (!frame.isFinal && frame.isSpare) {
      this._nextRollBonus.push(this._currentFrame);
    }
    if (!frame.isFinal && frame.isStrike) {
      this._nextRollBonus.push(this._currentFrame);
      this._secondNextRollBonus = this._currentFrame;
    }
  }

  score() {
    let score = 0;

    for (const frame of this._frames) {
      score += frame.score;
    }
    return score;
  }
};
