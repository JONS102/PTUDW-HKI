const models = require('../models/index');
models.sequelize.sync().then(() => console.log('Table created successfully!'));