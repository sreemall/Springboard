const {Router} = require ("express");
const {listMyDogs, registerDog, removeDog, adoptDog, listMyAdoptedDogs} = require ("../controllers/dogController");


const dogRouter = Router ();

dogRouter.route ("/").post (registerDog);

dogRouter.route ("/:id").delete (removeDog);

dogRouter.route ("/my-dogs").get (listMyDogs)

dogRouter.route ("/:id/adopt").post (adoptDog);

dogRouter.route ("/my-adoptions").get (listMyAdoptedDogs);


module.exports = dogRouter;