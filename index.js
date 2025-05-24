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
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

//câu 3=> /=> GET

//câu 4=> /?page=1 =>GET

//câu 5 => /=> POST 
app.use("/", require("./routes/indexRouter"));


app.listen(port, () => {
    console.log(`Server is running at http://localhost: ${port}`);
});