const Account = require('../models/Account');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const cookiesParser=require('cookie-parser');

class LoginController {
    logout(req, res){
        try {
            var token=req.session.login;
            var ketqua=jwt.verify(token.cookie, 'data_login');
            if(ketqua){
                req.session=null;
                res.redirect('/');
            }
        }
        catch(err){
            res.send("Đã xảy ra lỗi");
        }
    }

    private(req,res){
        //parse cookie từ header
        var token=req.session.login;
        var ketqua = jwt.verify(token.cookie,'data_login');
        console.log(ketqua);
        if(ketqua){
            res.redirect('/');
        }
        else{
            res.send("Thất bại");
        }
    }

    //[POST] login check
    login(req, res){
        const username = req.body.username;
        const password = req.body.password;
        Account.findOne({ username: username, password: password }, (err, account) => {
            if(account){
                var token = jwt.sign({
                    //Phải là 1 object
                    _id: account._id,
                    username: account.username,
                    role: account.role,
                }, 'data_login', { expiresIn: '24h' });
                //tạo cookie
                req.session.login = {
                    cookie: token,
                };
                //lưu vào header với field tên Cookie
                res.redirect('/');
            }
            else{
                res.send("Không tìm thấy tài khoản");
            }
        });
    }

    //[POST] create_account
    create(req, res) {
        const formData = req.body;
        console.log(formData);
        const account = new Account(formData);
        account.save();
        var token = jwt.sign({
            //Phải là 1 object
            _id: account._id,
            username: account.username,
            role: account.role,
        }, 'data_login', { expiresIn: '24h' });
        //tạo cookie
        req.session.login = {
            cookie: token,
        };
        res.render('success_account');
    }

    //[GET] create_account
    new(req, res) {
        try{
            var token=req.session.login;
            var account = jwt.verify(token.cookie,'data_login');
            var role = account.role;
            console.log(role);
            res.render('create_account', {account});
        }
        catch(err){
           var account={
                username: "None",
                role: "USER",
           }
            res.render('create_account', {account});
        }
        
    }

    //[GET] login
    index(req, res) {
        res.render('login');
    }
}

module.exports = new LoginController();
