
class Cell {
    constructor(row, col) {
        this._row = row;
        this._col = col;
        this.isMine = false;
        this.isOpen = false; // maybe not
    }

    get row() {
        return this._row;
    }
    get col() {
        return this._col;
    }
    get isMine() {
        return this._isMine;
    }
    set isMine(value) {
        this._isMine = value;
    }
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        this._isOpen = value;
    }
}

class Puzzle {
    constructor(points, difficultness, repeatedTimes) {
        this.level = 0;
        this._points = points;
        this._difficultness = difficultness;
        this._repeatedTimes = repeatedTimes;
        this._size = points/10 - difficultness;
        this._field = createField(points/10, difficultness);
        this.isLocked = true;
        this.isCurrent = false;
        this._scores = [];
        this._rowMinesCount = initializeMines(this._field,this._size).initializationRows;
        this._colMinesCount = initializeMines(this._field,this._size).initializationColumns;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get points() {
        return this._points;
    }
    get difficultness() {
        return this._difficultness;
    }
    get repeatedTimes() {
        return this._repeatedTimes;
    }
    get size() {
        return this._size;
    }
    get field() {
        return this._field; // coppy?!
    }
    get isLocked() {
        return this._isLocked;
    }
    set isLocked(value) {
        this._isLocked = value;
    }
    get isCurrent() {
        return this._isCurrent;
    }
    set isCurrent(value) {
        this._isCurrent = value;
    }
    get rowMinesCount() {
        return this._rowMinesCount;
    }
    get colMinesCount() {
        return this._colMinesCount;
    }
    // AddScore(player) {
    //      this._scores.push();
    //  }
    //   GetHightScores() {
    //
    //   }
}

function createPuzzle(points, difficultness, repeatedTimes) {
    return new Puzzle(points, difficultness, repeatedTimes);
}

function generateNextPuzzle(lastPuzzle) {
    let nextPuzzlePoints,
        nextPuzzleDifficultness,
        nextPuzzleRepeatedTimes;
    const maxRepeatedTimes = lastPuzzle.points / 100 | 0 + 2;

    if (lastPuzzle.difficultness === 1) {
        nextPuzzleDifficultness = 3;
        if (lastPuzzle.repeatedTimes === maxRepeatedTimes) {
            nextPuzzlePoints = lastPuzzle.points + 10;
            nextPuzzleRepeatedTimes = 1;
        }
        else {
            nextPuzzlePoints = lastPuzzle.points;
            nextPuzzleRepeatedTimes = lastPuzzle.repeatedTimes + 1;
        }
    }
    else {
        nextPuzzleDifficultness = lastPuzzle.difficultness - 1;
        nextPuzzlePoints = lastPuzzle.points;
        if (lastPuzzle.repeatedTimes === maxRepeatedTimes) {
            nextPuzzleRepeatedTimes = lastPuzzle.repeatedTimes;
        }
        else {
            nextPuzzleRepeatedTimes = lastPuzzle.repeatedTimes;
        }
    }
    return createPuzzle(nextPuzzlePoints, nextPuzzleDifficultness, nextPuzzleRepeatedTimes);
};

function generateMines(fieldSize, puzzleDifficultness) {
    const count = (fieldSize * fieldSize / 2 | 0) + 1 - puzzleDifficultness,
        mines = [];
    let row, col;
    for (let i = 0; i < count; i += 1) {
        row = Math.floor((Math.random() * fieldSize - 1) + 1);
        col = Math.floor((Math.random() * fieldSize - 1) + 1);

        let mine = { row: row, col: col };
        while (mines.findIndex(m => m.row === mine.row && m.col === mine.col) !== -1) {
            mine.row = Math.floor((Math.random() * fieldSize - 1) + 1);
            mine.col = Math.floor((Math.random() * fieldSize - 1) + 1);
        }
        mines.push(mine);
    }
    return mines;
};

function createField(puzzlePoints, puzzleDifficultness) {
    const size = puzzlePoints - puzzleDifficultness,
        field = new Array(size);

    for (let i = 0; i < size; i += 1) {
        field[i] = new Array(size);
        for (let j = 0; j < size; j += 1) {
            field[i][j] = new Cell(i, j);
        }
    }

    const mines = generateMines(size, puzzleDifficultness);

    mines.forEach(m => {
        field[m.row][m.col].isMine = true;
    });
    return field;
}

function initializeMines(field, size) {
    const initializationRows = [],
        initializationColumns = [];
    for (let i = 0; i < size; i += 1) {
        let init = '';
        for (let j = 0; j < size; j += 1) {
            let counter = 0;
            if (field[i][j].isMine) {
                counter += 1;
                j += 1;
                while (j < size && field[i][j].isMine) {
                    counter += 1;
                    j += 1;
                }
                init += ' ' + counter;
                counter = 0;
            }
        }
        initializationColumns.push(init);
        init = '';
        for (let j = 0; j < size; j += 1) {
            let counter = 0;
            if (field[j][i].isMine) {
                counter += 1;
                j += 1;
                while (j < size && field[j][i].isMine) {
                    counter += 1;
                    j += 1;
                }
                init += ' ' + counter;
                counter = 0;
            }
        }
        initializationRows.push(init);
        init = '';
    }
    return {
        initializationRows,
        initializationColumns
    }
}
const puzzles = [];
var puzzle1 = createPuzzle(60, 1, 1);
puzzle1.isLocked = false;
puzzle1.isCurrent = true;
puzzle1.level = 1;
puzzles.push(puzzle1);

for (let i = 1; i < 20; i += 1) {
    let newPuzzle = generateNextPuzzle(puzzles[i - 1]);
    while (newPuzzle.size < 5) {
        newPuzzle = generateNextPuzzle(newPuzzle);
    }
    newPuzzle.level = i + 1;
    puzzles.push(newPuzzle);

}


