const Dogs = require ("../models/dogModel");

const listMyDogs = async (req, res) => {

    try {
        const page = Number (req.query.page) || 1;
        const limit = Number (req.query.limit) || 2;
        if (page < 1 || limit < 1) {
            return res.status(400).json("Page and limit must be positive integers");
        }

        const filter = {registeredBy: req.user._id};
        
        const status = req.query.status;
        if (status) {
            if (status === "available")
                filter.isAdopted = false; 
            else if (status === "adopted")
                filter.isAdopted = true;
            else {
                return res.status (400).json ("Invalid Status! Allowed values are 'available' or 'adopted'");
            }
        }
        console.log ("filter: ", filter, "page: ", page, " limit: ", limit);

        const totalNoDogs  = await Dogs.countDocuments (filter);

        const dogs = await Dogs.find (filter)    //filter by given status
                            .skip ((page - 1)*limit)  //pagination
                            .limit (limit);
        
        if (totalNoDogs === 0)
            return res.status (200).json (`No Dogs Registered for User: ${req.user.username}`);
        else if (dogs.length === 0)
            return res.status (200).json ("No more dogs!");
        else
            return res.status (200).json (dogs);
        
    }
    catch (error) {
        return res.status(500).json (`Error while finding Dogs Registered by you! Error: ${error}`);
    }

}

const registerDog = async (req, res) => {
    const {name, description} = req.body;

    try {
        const dog = await Dogs.create ({name: name, description: description, registeredBy: req.user._id});
        
        return res.status (201). json (dog);
    }
    catch (error) {
        return res.status (500).json (`Error while Registering Dog. Error: ${error}`);
    }
}

const adoptDog = async (req, res) => {
   
    try {
        const dog = await Dogs.findById ({_id: req.params.id});
        if (!dog)
            return res.status (404).json ("Dog Adoption Failed! No Dog Found");
        else {
            //console.log ("During Adoption userId: ", req.user._id, " redisteredBy: ", dog.registeredBy)
            const {thankYouMessage} = req.body;
            if (dog.registeredBy.equals(req.user._id)) {
                return res.status (403).json ("Dog Adoption Failed! Cannot Adopt dog you Registered!");
            }
            else if (dog.isAdopted) {
                return res.status (403).json (`Dog Adoption Failed! This Dog is already Adopted by ${dog.adoptedBy}`)
            }
            else if (!thankYouMessage || thankYouMessage.length == 0) {
                return res.status (400).json ("Dog Adoption failed! Please give Thank You Message to the Owner!");
            }
            else {
                dog.adoptedBy = req.user._id;
                dog.thankYouMessage = thankYouMessage;
                dog.isAdopted = true;
                const updatedDog = await dog.save ();
                return res.status (200).json ("Dog Adoption Successful!");
            }
        }

    }
    catch (error) {
        //console.log ("Error during adopt dog error: ", error);
        return res.status (500).json (`Error during adopt dog error: ${error}`);
    }
}

const removeDog = async (req, res) => {
    
    try {
        const dog = await Dogs.findById ({_id: req.params.id});
        //console.log ("user: ", req.user._id, " registeredBy: ", dog.registeredBy, " dog: ", dog);
        if (!dog) {
            return res.status (404).json(`Remove Dog Failed!  No Dog Found`);
        }
        else {
            if (dog.isAdopted)
                return res.status (403).json ("Remove Dog Failed! Cannot Remove since it is already Adopted");
            else if (!dog.registeredBy.equals(req.user._id)) {
                return res.status (403).json ("Remove Dog Failed! This Dog is not Registered by you.")
            }
            else {
                await dog.deleteOne ();
                return res.status (200).json ("Removed Dog Successfully");
            }

        }
    }
    catch (error) {
        return res.status (500).json (`Error while Removing Dog! Error: ${error}`);
    }
}
const listMyAdoptedDogs = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 2;
        if (page < 1 || limit < 1) {
            return res.status (400).json ("Page and limit must be positive integers");
        }
        
        const totalNoDogs = await Dogs.countDocuments ({adoptedBy: req.user._id});

        const dogs = await Dogs.find ({adoptedBy: req.user._id})
                                .skip ((page - 1)*limit)
                                .limit(limit);

        if (totalNoDogs === 0)
            return res.status (200).json ("No Dogs are Adopted by You!");
        else if (dogs.length === 0)
            return res.statu(200).json ("No more Dogs");
        else
            return res.status (200).json (dogs);
    }
    catch (error) {
        return res.status(500).json (`Error while finding Dogs Adopted by you! Error: ${error}`);
    }
}

module.exports = {listMyDogs,  
                    registerDog,
                    removeDog,
                    adoptDog,
                    listMyAdoptedDogs};