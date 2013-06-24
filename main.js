"use strict";

var express = require("express"),
    app = express();

app.configure(function() {
    app.use(express.static(__dirname + "/static"));
});

app.get("/", function(req, res) {
    res.sendfile(__dirname + "/index.html");
});

app.listen(3030);