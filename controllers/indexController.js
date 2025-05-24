const controller = {};
const models = require("../models");
showData = async(req, res) => {
    let limit = 6;
    //page có thể truyền trên query string
    let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);

    let foods = await models.Food.findAll({
        attributes: ['name', 'imagePath', 'price', 'summary'],
        order: [
            ["price", "ASC"]
        ],
        // limit: 6,// có phân trang nên có thể bỏ limit
    });
    let totalRows = foods.length;
    let offset = (page - 1) * limit;
    foods = foods.slice(offset, offset + limit);
    foods.forEach((item, index) => {
        item.price = parseFloat(item.price).toFixed(2);
        item.isRight = index == 2 || index == 3;
    });
    res.locals.foods = foods;
    res.locals.pagination = {
        page,
        limit,
        totalRows,
    }
    res.render("index");
}
controller.show = async(req, res) => {
    await showData(req, res); // lấy dữ liệu từ db
};

controller.reserve = async(req, res) => {
    let { name, email, message } = req.body;
    try {
        models.Reservation.create({
            name,
            email,
            message,
            submittedAt: new Date(),
            checkstatus: false,
        });
        res.locals.message = "Đặt bàn thành công";
    } catch (err) {
        res.locals.message = "Đặt bàn thất bại, vui lòng thử lại";
    }
    await showData(req, res); // lấy dữ liệu từ db

};

module.exports = controller;