import { templateLoader } from 'template-loader';
import * as data from 'data';
import { router } from 'main';
import { logout } from 'user-controller';

const $root = $('#root');

export function get() {
    Promise.all([
        templateLoader.get('map'),
        data.getPuzzles(),
        data.getReachedLevel()
    ])
        .then(([template, puzzles, reachedLevel]) => {
            //    reachedLevel = reachedLevel || 1;
            for (let i = 0; i < reachedLevel; i += 1) {
                puzzles[i].isLocked = false;
            }
            puzzles[reachedLevel].isCurrent = true;
            $root.html(template(puzzles));
            return Promise.resolve(puzzles);
        })
        .then(puzzles => {
            $('.level').on('click', function () {
                const id = $(this).attr('id');
                if (!$(this).hasClass('disabled')) {
                    router.navigate(`puzzle/${id}`);
                }
            });
            $('.btn-logout').on('click', function () {
                logout();
            });
        });
}