import { templateLoader } from 'template-loader';
import * as data from 'data';
import 'jquery';

const $root = $('#root');

const $popupDiv = $('<div/>')
    .attr('id', 'endgame-message')
    .hide();
    const $btn=$('button').html('Continue')

export function get(params) {
    const { id } = params;
    Promise.all([
        templateLoader.get('puzzle'),
        data.getPuzzle(id)
    ])
        .then(([template, puzzle]) => {
            $root.html(template(puzzle));
            $popupDiv.appendTo($root);
            //      let points = $('#current-points').html();
            //      while (points>0) {
            //         setTimeout(function () {points-=1;}, 1000);
            //      }
            //      $('#current-points').html(points);
            let counter = 0;
            return Promise.resolve([puzzle, counter]);
        })
        .then(([puzzle, counter]) => {
            $('.cell').on('click', function () {
                const col = $(this).parent().children().index($(this));
                const row = $(this).parent().parent().children().index($(this).parent());

                if (puzzle.field[row - 1][col - 1].isMine) {
                    let points = $('#current-points').html();
                    points -= 10;
                    if (points <= 0) {
                        $popupDiv.html("Sorry! You couldn't solved The Lemon-Miner puzzle! Try again");
                        $popupDiv.show();
                    }
                    $('#current-points').html(points);
                }
                else {
                    $(this).removeClass('close');
                    counter += 1;
                }
                if (counter === 13) { // broi prazni poleta
                    $popupDiv.html("Great! You have solved The Lemon-Miner puzzle!"); // stop na igrata
                    $popupDiv.show();
                }
            });
            $('.cell').on('contextmenu', function () {
                $(this).toggleClass('mark');
            });
        });
}