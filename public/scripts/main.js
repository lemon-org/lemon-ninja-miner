import * as mapController from 'map-controller';
import * as puzzleController from 'puzzle-controller';
import * as userController  from 'user-controller';
import * as data from 'data';

let router = new Navigo(null, true);

router
    .on({
        '': () => {
            if (!data.isLogged()) { 
                userController.get();
                location.href="#/login";
            }
            else{
                mapController.get();
                 location.href="#/map";
            }
        },
        'map': () => mapController.get(),
        'puzzle/:id': (params) => puzzleController.get(params), //proverka dali e otkluchen
        'login': () => userController.get(),


    })

    //       .on('/auth', userController.get)
    //   .on('/login', () => userController.login()) // ako se e lognal prenasochva kum 'map'
    //   .on('/register', () => userController.register())
    //  .on('/logout', () => userController.logout()) // logout i se prenasochva kum 'login'
    .on(() => { router.navigate('/login'); })
    .resolve();

//    $(window).on('load', () => router.navigate());
//   $(window).on('hashchange', () => router.navigate());
export { router };