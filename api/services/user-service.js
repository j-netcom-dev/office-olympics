const User =require('../models/user-model.js');
const { BAD_REQUEST, CREATED, CONFLICT } =require('../constants.js')

class UserService{

    static create =async data =>{
        const {first_name, last_name} =data
        try {
            const userFound =await User.findOne({first_name, last_name})
            if(userFound) return {status: CONFLICT, message: `Name: ${first_name} ${last_name} already taken`}
            const user =new User({first_name, last_name});
            await user.save()
            return {status: CREATED,  message: user._id}
        } catch ({message}) {
            return {status: BAD_REQUEST, message}
        }
    }
}

module.exports ={ UserService };