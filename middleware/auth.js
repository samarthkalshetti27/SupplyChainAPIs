const jwt= require("jsonwebtoken")
const {TOKEN_SECRET} =require("../config/envs")





module.exports.auth = (req, res,next) => {
    const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401).json({error: 'Unauthorized'})

    jwt.verify(token,TOKEN_SECRET,(err, user)=>{
        if (err) return res.status(403).json({error: err})            
        req.user = user
    })

    next()
}