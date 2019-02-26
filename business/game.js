const Frame = require('./frame');

module.exports = class Game {
    constructor() {
        this.frames = new Array(10);
        this.currentFrame = 0;
        this.frames[this.currentFrame] = new Frame();
        this._nextRollBonus = new Array();
        this._secondNextRollBonus = null;
    }

    parse(input) {
        let previous = null;

        for (let i=0; i<input.length; i++) {
            let current = input[i];
            switch(current) {
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
                    this.roll(Number.parseInt(current));
            }

            previous = current;
        }    
    }

    roll(pins) {
        //Apply bonus
        while (this._nextRollBonus.length > 0) {
            let  bonusFrame = this._nextRollBonus.pop();
            this.frames[bonusFrame].applyBonus(pins);
        }
        
        //Move second next roll bonus to next roll bonus
        if (this._secondNextRollBonus != null) {
            this._nextRollBonus.push(this._secondNextRollBonus);
            this._secondNextRollBonus = null;
        }

        //If previous frame is finished, create new frame
        let frame = this.frames[this.currentFrame];
        if (frame.isFinished) {
            this.currentFrame++;
            this.frames[this.currentFrame] = new Frame(this.currentFrame == 9);
            frame = this.frames[this.currentFrame];
        }
        
        //Roll
        frame.roll(pins);

        //Setup frame bonuses
        if (!frame.isFinal && frame.isSpare) {
            this._nextRollBonus.push(this.currentFrame);
        }
        if (!frame.isFinal && frame.isStrike) {
            this._nextRollBonus.push(this.currentFrame);
            this._secondNextRollBonus = this.currentFrame;
        }
    }

    score() {
        let score = 0;

        for (const frame of this.frames) {
            score += frame.score;
        }
        return score;
    }
}