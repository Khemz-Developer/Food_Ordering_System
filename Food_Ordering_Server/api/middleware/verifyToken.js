//middleware to verify token
const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
  
    if(!req.headers.authorization){
      return res.status(401).send("Unauthorized Request");
    }
  
    const token = req.headers.authorization.split(' ')[1];
    //console.log(token); 
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
      if(err){
        return res.status(401).send("Unauthorized Request Token is invalid !!");
      }
  
      req.decoded = decoded;
      next();
    })
  
  }

module.exports = verifyToken;