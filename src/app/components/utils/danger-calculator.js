const _ = require('lodash'),
      freeze = require('deep-freeze');

export default class DangerCalculator {
    constructor(gameboard) {
        this.board = gameboard;
    }

    get neighborhood() {
        return freeze({
            // distance in steps from this square:
            //           vert. horz.
            NORTH:      [  1,  0 ],
            NORTHEAST:  [  1,  1 ],
            EAST:       [  0,  1 ],
            SOUTHEAST:  [ -1,  1 ],
            SOUTH:      [ -1,  0 ],
            SOUTHWEST:  [ -1, -1 ],
            WEST:       [  0, -1 ],
            NORTHWEST:  [  1, -1 ]
        });
    }

    forSquare(row, cell) {
        if (row >= 0 && cell >= 0) {
            const directions = _.keys(this.neighborhood),

                totalMines = _.reduce(directions, (total, direction) => {
                    const [vert, horiz] = this.neighborhood[direction],
                          neighbor = this.board.getSquareAt(row + vert, cell + horiz);

                    if (neighbor && neighbor.isMined())
                        total++;

                    return total;
                }, 0);

            return totalMines;
        }
    }
}
