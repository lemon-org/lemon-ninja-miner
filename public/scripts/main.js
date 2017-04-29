import * as mapController from 'map-controller';
import * as puzzleController from 'puzzle-controller';
//import * as userController from 'user-controller';

let router = new Navigo(null, true);

router
    .on('/', () => { router.navigate('/login'); })
    .on('map', () => mapController.get())
    .on('puzzle/:id', (params) => puzzleController.get(params))
    //       .on('/auth', userController.get)
 //   .on('/login', () => userController.login()) // ako se e lognal prenasochva kum 'map'
 //   .on('/register', () => userController.register())
  //  .on('/logout', () => userController.logout()) // logout i se prenasochva kum 'login'
    .on(() => { router.navigate('/login'); })
    .resolve();

//    $(window).on('load', () => router.navigate());
 //   $(window).on('hashchange', () => router.navigate());
export {router};