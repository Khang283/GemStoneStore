const Account = require('../models/Account');

class LoginController {
    //[POST] create_account
    create(req, res) {
        const formData = req.body;
        console.log(formData);
        const account = new Account(formData);
        account.save();

        res.render('success_account');
    }

    //[GET] create_account
    new(req, res) {
        res.render('create_account');
    }

    //[GET] login
    index(req, res) {
        res.render('login');
    }
}

module.exports = new LoginController();
