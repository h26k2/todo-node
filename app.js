const express = require("express");
const requests = require("./controllers/requests");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine","ejs");

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

requests(app);

app.listen(3000,()=>{
    console.log(`node app is live at port 3000`);
});