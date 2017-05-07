import { templateLoader } from 'template-loader';
import * as data from 'data';
import { router } from 'main';


const $root = $('#root');

const $popupDiv = $('<div/>')
    .attr('id', 'endgame-message')
    .hide();

const $message = $('<span/>').appendTo($popupDiv);
const $btn = $('<a/>')
    .attr('class', 'btn')
    .attr('href', '#/map')
    .html('Continue')
    .appendTo($popupDiv);

const promise = new Promise(function (resolve, reject) {
    resolve($popupDiv);
});

export function get(params) {
    const { id } = params;
    Promise.all([
        templateLoader.get('puzzle'),
        data.getPuzzle(id)
    ])
        .then(([template, puzzle]) => {
            const $original = $('.container').clone();
            $root.html(template(puzzle));
            $popupDiv.appendTo($root);

            let pointsFunc = setInterval(function () { decreasePoints() }, 2000); //
            function decreasePoints() {
                let points = $('#current-points').html();
                points -= 1;
                if (points <= 0) {
                    clearInterval(pointsFunc); //promise?
                    $('#current-points').html('0');
                    $message.text("Sorry! You couldn't solved The Lemon-Miner puzzle! Try again");
                    $popupDiv.css('background-image', "url('../../css/images/sad-ninja.jpg')");

                    promise
                        .then(($popupDiv) => {
                            $popupDiv.show()
                            return Promise.resolve($original);
                        })
                        .then(($original) => {
                            $('.btn').on('click', function () {
                                $('.container').replaceWith($original.clone());
                                $popupDiv.hide();
                                router.navigate('map');
                            });
                        });
                }
                else {
                    $('#current-points').html(points);
                }
            }
            let counter = 0;
            return Promise.resolve([puzzle, counter, $original]);
        })
        .then(([puzzle, counter, $original]) => {
            $('.cell').on('click', function () {
                const col = $(this).parent().children().index($(this));
                const row = $(this).parent().parent().children().index($(this).parent());
                $(this).removeClass('close');
                if (puzzle.field[row - 1][col - 1].isMine) {
                    $(this).addClass('mine');
                    let points = $('#current-points').html();
                    points -= 10;
                    if (points <= 0) {
                        $('#current-points').html('0');
                        $message.text("Sorry! You couldn't solved The Lemon-Miner puzzle! Try again");
                        $popupDiv.show();
                        promise
                            .then(($popupDiv) => {
                                $popupDiv.show()
                                return Promise.resolve($original);
                            })
                            .then(($original) => {
                                $('.btn').on('click', function () {
                                    $popupDiv.hide();
                                    $('.container').replaceWith($original.clone());
                                    router.navigate('map');
                                });
                            });
                    }
                    else {
                        $('#current-points').html(points);
                    }

                }
                else {

                    counter += 1;
                }
                if (counter === 13) { // broi prazni poleta
                    const reachedLevel = data.getReachedLevel()
                    $message.text("Great! You have solved The Lemon-Miner puzzle!"); // stop na igrata
                    $popupDiv.show(); //other image
                    promise
                        .then(($popupDiv) => {
                            $popupDiv.show()
                            return Promise.resolve($original);
                        })
                        .then(($original) => {
                            $('.btn').on('click', function () {
                                $popupDiv.hide();
                                $('.container').replaceWith($original.clone());
                                router.navigate('map');
                            });
                        });
                }

            });
            //  $('.cell').on('contextmenu', function () {
            //      $(this).toggleClass('mark');
            //  });
        });
}