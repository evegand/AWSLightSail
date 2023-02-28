const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.listen(port, () => {
    console.log(`Example app listening at http://localost:${port}`);
});

app.get("/", (req, res) => {
    res.send(`Hello ${port}`);
});

app.get("/:name", (req, res) => {
    res.send(`Hello ${req.params.name}`);
});
