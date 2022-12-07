const shared=require('./ShareFunction');
const cookies_session=require('cookie-session');

class CommonController {
    //[GET]
    home(req, res) {
       try{
            var account=shared.verifyToken(req.session);
            if(account){
                res.render('home',{account});
            }
       }
       catch(err){
            var account={
                username: "None",
                role: "USER",
            };
            res.render('home');
       }
    }
}

module.exports = new CommonController();
