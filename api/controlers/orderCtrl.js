import { DateTime } from "luxon";

export default (orderRepo, recipeRepo, userRepo) => {

    const listOrders = (_, res) => {
        let orders = orderRepo.listOrders();
        if(orders){
            return res.send({data: orders});
        }
        return res.status(404).send({error: 'No orders found'})
    };

    const getOrder = (req, res) => {
        let _id = req.params.id;
        let order = orderRepo.getOrder(_id);

        if(order){
            return res.status(200).send({data: order})
        }

        return res.status(404).send({error: `Order ${_id} not found`})
    }

    const createOrder = (req, res) => {
        let {orderDate, recipeId, quantity, userId} = req.body;
        
        //CHECK IF DATA IS MISSING
        if(!orderDate || !recipeId || !quantity || !userId){
            return res.status(400).send({
                error: 'Data is missing'
            })
        }

        //CHECK IF DATE FORMAT IS INVALID
        if(!/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(orderDate)){
            return res.status(400).send({
                error: 'Order Date format is invalid : YYYY-MM-DD'
            })
        }

        //CHECK IF RECIPE IS EXISTING
        if(!isExistingRecipe(recipeId)){
            return res.status(404).send({
                error: `Recipe ${recipeId} not found`
            })
        }

        if(!isExistingUser(userId)){
            return res.status(404).send({
                error: `User ${userId} not found`
            })
        }

        //birthDate = DateTime.toUnixInteger(birthDate);
        let order = orderRepo.createOrder({orderDate, ...req.body});
        
        return res.status(201).send({data: order});
        
    }

    const updateOrder = (req,res) => {
        let {orderDate, recipeId, quantity, userId} = req.body;
        let _id = req.params.id;

        //CHECK IF DATA IS MISSING
        if(!orderDate || !recipeId || !quantity || !userId){
            return res.status(400).send({
                error: 'Data is missing'
            })
        }

        //CHECK IF DATE FORMAT IS INVALID
        if(!/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(orderDate)){
            return res.status(400).send({
                error: 'Order Date format is invalid : YYYY-MM-DD'
            })
        }

        //CHECK IF RECIPE IS EXISTING
        if(!isExistingRecipe(recipeId)){
            return res.status(404).send({
                error: `Recipe ${recipeId} not found`
            })
        }

        if(!isExistingUser(userId)){
            return res.status(404).send({
                error: `User ${userId} not found`
            })
        }
        

        const updatedOrder = orderRepo.updateOrder(
            _id,
            req.body
        );

        if(updatedOrder){
            return res.status(200).send({data: updatedOrder})
        }

        return res.status(404).send({error: `Order ${_id} not found`})
    }
    

    const deleteOrder = (req,res) => {
        let _id = req.params.id;

        let deleted = orderRepo.deleteOrder(_id);

        if(deleted){
            return res.status(200).send({meta: {deleted}})
        }

        return res.status(404).send({error: `Order ${_id} not found`})

    }

    //CHECK IF RECIPE IS EXISTING
    const isExistingRecipe = (recipeId) => {
        return recipeRepo.findRecipe(recipeId);
    }
    
    //CHECK IF USER IS EXISTING
    const isExistingUser = (userId) => {
        return userRepo.getUser(userId);
    }

    return {
        listOrders,
        getOrder,
        createOrder,
        updateOrder,
        deleteOrder
    }
}