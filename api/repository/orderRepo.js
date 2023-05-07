import { DateTime } from "luxon";
import { v4 as uuidv4 } from 'uuid';

export default(Order) => {
    let orders = [
        new Order('329d2e35-fdae-442e-aedf-88c8df8fccd1','2023-04-27','dc466424-4297-481a-a8de-aa0898852da1', 1, 'd8671313-020b-414e-a60a-589ba98999c6'),
        new Order('9105a30f-e667-4e91-8275-16f18a416fa3','2023-04-30','a35ce12d-d52b-4a07-90ad-68e985b779e7', 3, 'ab724d8c-38c0-4f6c-ba66-944750217338'),
    ];

    const listOrders = () => {
        return orders;
    }

    const getOrder = (id) => {
      return orders.find(order => order.id === id) || null;
    }

    const createOrder = (data) => {
        const order = new Order(
            uuidv4(),
            data.orderDate,
            data.recipeId,
            data.quantity,
            data.userId,
        )
        orders.push(order);
        return order;
    }

    const updateOrder = (id, data) => {
        const order = orders.find(order => order.id === id);
        if(!order) return null;
        else{
            order.orderDate = data.orderDate;
            order.recipeId = data.recipeId;
            order.quantity = data.quantity;
            order.userId = data.userId;

            return order;
        }
    }

    const deleteOrder = (id) => {
        let orderToDeleteIndex = orders.findIndex(order => order.id === id);
        if(orderToDeleteIndex < 0){
            return null
        }
        const deletedOrder = orders.splice(orderToDeleteIndex, 1)[0];
        return deletedOrder;
    }

    return{
        createOrder,
        updateOrder,
        deleteOrder,
        listOrders,
        getOrder
    }
}