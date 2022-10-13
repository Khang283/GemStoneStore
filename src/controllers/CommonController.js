class CommonController {
    //[GET]
    home(req, res) {
        res.render('home');
    }
}

module.exports = new CommonController();
