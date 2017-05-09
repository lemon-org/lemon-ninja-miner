const mongoose = require('mongoose');

function populatePuzzles(puzzleModel) {

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
        constructor(level, points, difficultness, repeatedTimes) {
            this.level = level;
            this._points = points;
            this._difficultness = difficultness;
            this._repeatedTimes = repeatedTimes;
            this._size = points / 10 - difficultness;
            this._field = createField(points / 10, difficultness);
            this.isLocked = true;
            this.isCurrent = false;
            this._scores = [];
            this._rowMinesCount = initializeMines(this._field, this._size).initializationRows;
            this._colMinesCount = initializeMines(this._field, this._size).initializationColumns;
        }
        get level() {
            return this._level;
        }
        set level(value) {
            this._level = value;
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

    function createPuzzle(level, points, difficultness, repeatedTimes) {
        return new Puzzle(level, points, difficultness, repeatedTimes);
    }

    function generateNextPuzzle(lastPuzzle) {
        let nextPuzzleLevel = lastPuzzle.level + 1,
            nextPuzzlePoints,
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
        return createPuzzle(nextPuzzleLevel, nextPuzzlePoints, nextPuzzleDifficultness, nextPuzzleRepeatedTimes);
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
    var puzzle1 = createPuzzle(1, 60, 1, 1);
    puzzle1.isLocked = false;
    puzzle1.isCurrent = true;
    puzzles.push(puzzle1);

    for (let i = 1; i < 20; i += 1) {
        let newPuzzle = generateNextPuzzle(puzzles[i - 1]);
        while (newPuzzle.size < 5) {
            newPuzzle = generateNextPuzzle(newPuzzle);
        }
        newPuzzle.level = i + 1;
        puzzles.push(newPuzzle);

    }
    console.log(puzzles[0].level)
    let puzzlesToSave = puzzles.map(p => {
        return {
            level: p.level,
            field: p.field.map(c => {
                return c.map(cell => {
                    return {
                        row: cell.row,
                        col: cell.col,
                        isMine: cell.isMine
                    }
                })
            }),
            rowMinesCount: p.rowMinesCount,
            colMinesCount: p.colMinesCount,
            difficultness: p.difficultness,
            isCurrent: p.isCurrent,
            isLocked: p.isLocked,
            points: p.points,
            size: p.size,
            repeatedTimes: p.repeatedTimes
        }
    })
    puzzleModel.create(puzzlesToSave);

}

module.exports = (config) => {
    mongoose.connect('mongodb://admin:admin@ds133991.mlab.com:33991/lemon-ninja-miner');

    let userModel = require('./models/user-model'),
        puzzleModel = require('./models/puzzle-model');
    populatePuzzles(puzzleModel);
    return {
        findUserById(id) {
            return new Promise((resolve, reject) => {
                userModel.findById(id, (err, user) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(user);
                    }
                })
            })
        },
        findUserByName(name) {
            return new Promise((resolve, reject) => {
                userModel.findOne({ username: name }, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        },
        createUser(user) {
            return new Promise((resolve, reject) => {
                userModel.create(user, (err, user) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(user);
                    }
                })
            })
        },
        updateUser(reachedlevel, userId){
            return new Promise((resolve, reject) => {
                userModel.update({_id: userId}, {$set: {reachedLevel: reachedlevel}}, (err, raw) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(raw);
                    }
                })
            })
        },
        getPuzzleById(id) {
            return new Promise((resolve, reject) => {
                puzzleModel.findById(id, (err, puzzle) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(puzzle);
                    }
                })
            })
        },
        getPuzzleByLevel(level) {
            return new Promise((resolve, reject) => {
                puzzleModel.findOne({ level: level }, (err, puzzle) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (puzzle) {
                            puzzle.scores = puzzle.scores.sort((a, b) => b.score - a.score).slice(0, 3);
                            resolve(puzzle)
                        }
                    }
                })
            })
        },
        getAllPuzzles() {
            return new Promise((resolve, reject) => {
                puzzleModel.find((err, puzzles) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(puzzles.sort((a,b)=> {
                            return a._doc.level - b._doc.level;
                        }));
                    }
                })
            })
        },
        updatePuzzle(level, username, score){
            return new Promise((resolve, reject) => {
                puzzleModel.findOneAndUpdate({level: level}, {$push: { scores: {username, score}}}, (err, res) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(res);
                    }
                })
            })
        }

    }
}