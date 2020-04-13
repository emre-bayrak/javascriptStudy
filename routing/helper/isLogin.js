const isLogin = (req, res, next) => {
    const isLogin = true;
    if(isLogin)
        next();
    else
        res.send("Please login");  
};


module.exports = isLogin;