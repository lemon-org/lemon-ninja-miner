import { templateLoader } from 'template-loader';
import * as data from 'data';
import { router } from 'main';

// fix empty cell property - level4
const $root = $('#root'),
    $popupDiv = $('<div/>')
        .attr('id', 'endgame-message')
        .hide(),
    $img = $('<img/>').appendTo($popupDiv),
    $message = $('<span/>').appendTo($popupDiv),
    $btn = $('<a/>')
        .attr('class', 'btn')
        .attr('href', '#/map')
        .html('Continue')
        .appendTo($popupDiv);

const promise = new Promise(function (resolve, reject) {
    resolve($popupDiv);
});

function endGame(message, img, $original) {
    $message.text(message);
    $img.attr('src', img);
    promise
        .then(($popupDiv) => {
            $('.container').addClass('stop-game');
            $('iframe').hide();
            $popupDiv.show()
            return Promise.resolve($original);
        })
        .then(($original) => {
            $('.btn').on('click', function () {
                $('.container').replaceWith($original.clone());
                $popupDiv.hide();
                $('iframe').show();
                router.navigate('map');
            });
        });
}

export function get(params) {
    const { level } = params;
    Promise.all([
        templateLoader.get('puzzle'),
        data.getPuzzle(level)
    ])
        .then(([template, puzzle]) => {
            $root.html(template(puzzle));
            const $original = $('.container').clone();
            $popupDiv.appendTo($root);

            return Promise.resolve([puzzle, $original]);
        })
        .then(([puzzle, $original]) => {
            let counter = 0;
            const minesCount = (puzzle.size * puzzle.size / 2 | 0) + 1 - puzzle.difficultness,
                emptyCellsCount = puzzle.size * puzzle.size - minesCount;
            let pointsFunc = setInterval(function () { decreasePoints() }, 2000); // promise
            function decreasePoints() {
                let points = $('#current-points').html();
                points -= 1;
                if (points <= 0) {
                    points = 0;
                    clearInterval(pointsFunc);
                    endGame("Sorry! You couldn't solved The Lemon-Miner puzzle! Try again",
                        '../../css/images/sad-ninja.jpg',
                        $original);
                }
                $('#current-points').html(points);
            }

            $('.cell').on('click', function () {

                const col = $(this).parent().children().index($(this));
                const row = $(this).parent().parent().children().index($(this).parent());
                $(this).removeClass('close');
                $(this).removeClass('mark');
                if (puzzle.field[row - 1][col - 1].isMine) {
                    $(this).addClass('mine');
                    let points = $('#current-points').html();
                    points -= 10;
                    if (points <= 0) {
                        points = 0;
                        clearInterval(pointsFunc);
                        endGame("Sorry! You couldn't solved The Lemon-Miner puzzle! Try again",
                            '../../css/images/sad-ninja.jpg',
                            $original);
                    }
                    $('#current-points').html(points);
                }
                else {
                    counter += 1;
                }

                if (counter === emptyCellsCount) {
                    clearInterval(pointsFunc);

                    let points = $('#current-points').html();
                    data.getReachedLevel() //puzzle.level
                        .then(currentLevel => {
                            data.saveScore(points, puzzle.level);
                            if (currentLevel == puzzle.level) {
                                const reachedLevel = currentLevel + 1;
                                data.updateReachedLevel(reachedLevel);
                            }
                        });

                    endGame("Great! You have solved The Lemon-Miner puzzle!",
                        '../../css/images//won-game.jpg',
                        $original);
                }
            });

            $('.cell').on('contextmenu', function () {
                if ($(this).hasClass('close')) {
                    $(this).toggleClass('mark');
                }
            });
        });
}