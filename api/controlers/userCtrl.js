import { DateTime } from "luxon";

export default (userRepo) => {

    const listUsers = (_, res) => {
        let users = userRepo.listUsers();
        if(users){
            return res.send({
                data: users
            });
        }
        return res.status(404).send({error: 'No users found'})
    };

    const getUser = (req, res) => {
        let _id = req.params.id;
        let user = userRepo.getUser(_id);

        if(user){
            return res.status(200).send({data: user})
        }

        return res.status(404).send({error: `User ${_id} not found`})
    }

    const createUser = (req, res) => {
        let {lastName, firstName, birthDate, address, phone, email} = req.body;
        
        //CHECK IF DATA IS MISSING
        if(!lastName || !firstName || !birthDate || !address || !phone|| !email){
            return res.status(400).send({
                error: 'Data is missing'
            })
        }

        //CHECK IF DATE FORMAT IS INVALID
        if(!/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(birthDate)){
            return res.status(400).send({
                error: 'BirthDate format is invalid : YYYY-MM-DD'
            })
        }

        //CHECK IF PHONE NUMBER FORMAT IS INVALID
        if(!/^(0|\+33|0033)[1-9][0-9]{8}$/.test(phone)){
            return res.status(400).send({
                error: 'Phone number is invalid : (+33 ou 0 ou 0033) suivi de exactement 9 chiffres'
            })
        }

        //birthDate = DateTime.toUnixInteger(birthDate);
        let user = userRepo.createUser({birthDate, ...req.body});
        
        return res.status(201).send({data: user});
        
    }

    const updateUser = (req,res) => {
        let {lastName, firstName, birthDate, address, phone, email} = req.body;
        let _id = req.params.id;

        //CHECK IF DATE FORMAT IS INVALID
        if(!/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(birthDate)){
            return res.status(400).send({
                error: 'BirthDate format is invalid : YYYY-MM-DD'
            })
        }

        //CHECK IF PHONE NUMBER FORMAT IS INVALID
        if(!/^(0|\+33|0033)[1-9][0-9]{8}$/.test(phone)){
            return res.status(400).send({
                error: 'Phone number is invalid : (+33 ou 0 ou 0033) suivi de exactement 9 chiffres'
            })
        }

        let updatedUser = userRepo.updateUser(
            _id,
            req.body
        );

        if(updatedUser){
            return res.status(200).send({data: updatedUser})
        }

        return res.status(404).send({error: `User ${_id} not found`})
    }
    

    const deleteUser = (req,res) => {
        let _id = req.params.id;

        let deleted = userRepo.deleteUser(_id);

        if(deleted){
            return res.status(200).send({meta: {deleted}})
        }

        return res.status(404).send({error: `User ${_id} not found`})

    }
    

    return {
        listUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser
    }
}