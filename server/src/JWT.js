const {sign, verify} = require('jsonwebtoken');

const createTokens = (user) => {

    // "jwtsecretplschange" is  a secret and need to be change in production.
    // current the refreash token is not set it's meen that the token is valid forever.
    // we need to add refresh token as an argument (after "jwtsecretplschange")
    const accessToken = sign(
        {username: user.username, id: user.id}, 
        "jwtsecretplschange" 
        );
    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if(!accessToken) 
        return res.status(400).json({error: "User not Authenticated!"});

    try {
        // check if it's a vaild token
        const validToken = verify(accessToken, "jwtsecretplschange");
        if(validToken){
            req.autenticated = true;
            return next();
        }
    } catch (error) {
        return res.status(400).json({error: error});
    }

}

module.exports = { createTokens, validateToken };