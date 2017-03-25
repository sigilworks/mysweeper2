const { LinearCongruentialGenerator } = require('lib'),
      generator = new LinearCongruentialGenerator,
      // get a random integer between 0 and the total number of squares in the board
      getRandomNumber = (dimensions) => generator.rand() * (dimensions * dimensions) | 0;

export default class MineLayer {
    constructor(mines = 0, dimensions = 0) {
        this.mines = mines;
        this.dimensions = dimensions;
    }

    getLocations() {
        const rands = [];

        for (let i = 0, mines = this.mines; i < mines; ++i) {
            const rnd = getRandomNumber(this.dimensions);

            if (!rands.includes(rnd))
                rands.push(rnd);
            // ...otherwise, give it another go 'round:
            else
                mines++;
        }

        return rands.map(rnd => {
            // get to whatever row & cell that the random applies to
            // e.g., in a 9x9 board, if `rnd` = 12:
            //      row: ~~(12/9) //=>  row 1
            //      cell: 12 % 9  //=> cell 3
            const row = Math.floor(rnd / this.dimensions),
                cell = rnd % this.dimensions;
            return [row, cell];
        });
    }
}
