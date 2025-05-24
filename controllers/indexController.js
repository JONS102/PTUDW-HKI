const controller = {};
const models = require("../models");

controller.show = async(req, res) => {
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
};

controller.reserve = (req, res) => {
    res.render("index");
};

module.exports = controller;