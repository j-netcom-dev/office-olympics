const {UserService} =require('../services/user-service.js')

const create =async(req, res) =>{
    const {status, message} =await UserService.create(req.body)
    return res.status(status).json({message});
}

module.exports ={
    create
}