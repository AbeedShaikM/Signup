const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const request = require("request");
const https = require("https");
const { response } = require("express");
// const { json } = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
})
app.post("/", function (req, res) {
    const first_name = req.body.first;
    const last_name = req.body.last;
    const gmail = req.body.gmail;
    const data = {
        members: [
            {
                email_address: gmail,
                status: "subscribed",
                merge_fields: {
                    FNAME: first_name,
                    LNAME: last_name
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/631fbe1ac2";
    const options = {
        method: "POST",
        auth: "Abeed17:cc0018b8cf647036cf15a33f0cd2be3d-us14"
    }
    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
            // response.send(Json.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})
app.listen(3000, function () {

})
// 2bcc1112322ae9adaaa8e2ddf86fb84c-us10
// 258800434fcd4600acaf20fefd70d9b5-us10
// 258800434fcd4600acaf20fefd70d9b5-us10
// 00fce3f3f6
// cc0018b8cf647036cf15a33f0cd2be3d-us14