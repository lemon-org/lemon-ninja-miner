import { templateLoader } from 'template-loader';
import * as data from 'data';
import 'jquery';
import { router } from 'main';

const $root = $('#root');

export function get() {
  
    Promise.all([
        templateLoader.get('map'),
        data.getPuzzles()
    ])
        .then(([template, puzzles]) => {
            $root.html(template(puzzles));
            return Promise.resolve(puzzles);
        })
        .then(puzzles => {
            $('.level').on('click', function () {
               
                const id = $(this).attr('id');
                if (!$(this).hasClass('locked')) {
                    router.navigate(`puzzle/${id}`);
                }
            });
        });
}