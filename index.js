const express = require('express');
const app = express();
const port = 3000;
const expressHbs = require('express-handlebars');
const { createPagination } = require('express-handlebars-paginate');

app.use(express.static(__dirname + '/public'));

app.engine("hbs",
    expressHbs.engine({
        layoutsDir: __dirname + "/views/layouts",
        defaultLayout: "main",
        extname: ".hbs",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
        },
        helpers: {
            createPagination,
        },
    })
);
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/indexRouter"));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});