import { templateLoader } from 'template-loader';
import * as data from 'data';

const $root = $('#root');

export function get(params) {
    const { id } = params; 
    Promise.all([
        templateLoader.get('puzzle'),
        data.getPuzzle(id)
    ])
        .then(([template, puzzle]) => {
           console.log(puzzle);
            $root.html(template(puzzle));
        });
}