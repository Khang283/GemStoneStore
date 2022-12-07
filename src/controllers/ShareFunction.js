const jwt=require('jsonwebtoken');

class sharedFunction{
    verifyToken(cookie){
        var token=cookie.login;
        var account=jwt.verify(token.cookie, 'data_login');
        return account;
    }
}

module.exports= new sharedFunction();