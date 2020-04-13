const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=> {
    const user = true;

    if (user)
        res.send("User page");
    else
        return next({ status: 404, message: "User is not found!"});
});


module.exports = router;