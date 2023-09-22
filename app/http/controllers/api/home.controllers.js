const Controller = require("../controller");

module.exports = new class HomeController extends Controller {
    indexPage(req, res, next) {
        return res.send('index page store')
    }
}