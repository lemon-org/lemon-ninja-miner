import * as mapController from 'map-controller';
import * as puzzleController from 'puzzle-controller';
import * as userController from 'user-controller';
import * as data from 'data';

let router = new Navigo(null, true);

router
    .on({
        
        'logout': () => userController.logout(),
        '': () => {
            if (!data.isLogged()) {
                userController.get();
                location.href = "#/login";
            }
            else {
                mapController.get();
                location.href = "#/map";
            }
        },
        'map': () => mapController.get(),
        'puzzle/:id': (params) => puzzleController.get(params),
        'login': () => userController.get()
    })
    .resolve();

export { router };