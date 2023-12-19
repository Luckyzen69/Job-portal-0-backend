var jwt = require('jsonwebtoken');
//for authorization
function checkAuthentication(req, res, next) {
    console.log(req.headers.authorization);


    try {
        let loggedIn = false;
        let token = req.headers.authorization?.replace("Bearer ","")
        if (token) {
            try {
                var decoded = jwt.verify(token, "shhhhh")
                console.log(decoded);
                req.user = decoded
                loggedIn = true
            } catch (err) {
                console.log("json web token error");
            }

        }


        if (!loggedIn) {
            return res.status(401).send("unauthenticated")
        }


        console.log("here");
        next();
    } catch (err) {
        res.status(500).send({ error: err.message })

    }
}
module.exports = {
    checkAuthentication
}