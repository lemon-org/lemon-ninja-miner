import { templateLoader } from 'template-loader';
import * as data from 'data';

const $root = $('#root');

export function get() {
    // const { level } = params; //?

    Promise.all([
        templateLoader.get('map'),
        data.getPuzzles()
    ])
        .then(([template, puzzles]) => {
            console.log(puzzles);
            $root.html(template(puzzles));
        });
}