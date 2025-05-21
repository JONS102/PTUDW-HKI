const express = require('express');
const app = express();
const port = 3000;

app.engine("hbs",
    expressHbs.engine({
        layoutsDir: __dirname + "/views/layouts",
        defaultLayout: "main",
        extname: ".hbs",
    })
);
app.set("view engine", "hbs");
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost: ${port}`);
});