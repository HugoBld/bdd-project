import { DateTime } from "luxon";
import { v4 as uuidv4 } from 'uuid';

export default(User) => {
    let users = [
        new User('ab724d8c-38c0-4f6c-ba66-944750217338','BLANCHARD','Hugo', DateTime.fromISO("2000-12-17").toFormat('yyyy-MM-dd'),'Nantes', '+33609080706', 'hugo.blanchard17@gmail.com'),
        new User('d8671313-020b-414e-a60a-589ba98999c6','LEE','Bruce', DateTime.fromISO("1999-01-13").toFormat('yyyy-MM-dd'),'Nantes', '+33609086543', 'bruce.lee@gmail.com')
    ];

    const listUsers = () => {
        return users;
    }

    const getUser = (id) => {
      return users.find(user => user.id === id) || null;
    }

    const createUser = (data) => {
        const user = new User(
            uuidv4(),
            data.lastName,
            data.firstName,
            data.birthDate,
            data.address,
            data.phone,
            data.email
        )
        users.push(user);
        return user;
    }

    const updateUser = (id, data) => {
        const user = users.find(user => user.id === id);
        if(!user) return null;
        else{
            user.lastName = data.lastName;
            user.firstName = data.firstName;
            user.birthDate = data.birthDate;
            user.address = data.address;
            user.phone = data.phone;
            user.email = data.email;

            return user;
        }
    }

    const deleteUser = (id) => {
        let userToDeleteIndex = users.findIndex(user => user.id === id);
        if(userToDeleteIndex < 0){
            return null
        }
        const deletedUser = users.splice(userToDeleteIndex, 1)[0];
        return deletedUser;
    }

    return{
        createUser,
        updateUser,
        deleteUser,
        listUsers,
        getUser
    }
}