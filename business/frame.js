module.exports = class Frame {
    constructor(final = false) {
        this._isFinal = final;
        this._rolls = new Array();
        this._currentRoll = -1;
        this._isFinished = false;
        this._isSpare = false;
        this._isStrike = false;
        this._pins = 0;
        this._bonus = 0;
    }

    get isFinal() { return this._isFinal; }
    get isFinished() { return this._isFinished; }
    get isSpare() { return this._isSpare; }
    get isStrike() { return this._isStrike; }
    get pins() { return this._pins; }
    get score() { 
        return this._rolls.reduce((a,b) => a + b, 0) +  this._bonus;
    }

    roll(pins) {
        this._currentRoll++;
        this._rolls.push(pins);
        this._pins += pins;

        if (this._currentRoll == 0 && pins == 10) {
            this._isStrike = true;
        } else if (this._currentRoll == 1 && this._rolls[0] + this._rolls[1] == 10) {
            this._isSpare = true;
        }

        if (!this._isFinal && (
                this._currentRoll ==  1
                    ||
                this._pins == 10)) {
            this._isFinished = true;
        }
    }

    applyBonus(points) {
        this._bonus += points;
    }
}