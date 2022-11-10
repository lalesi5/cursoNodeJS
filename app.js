require("dotenv").config()
const express = require("express");
const cors = require("cors");
const morganBody = require("morgan-body");
const loggerStream = require("./utils/handleLogger");
const dbConnectNoSql = require('./config/mongo');
const {dbConnectMysql} = require('./config/mysql');
const app = express();
const ENGINE_DB = process.env.ENGYNE_DB;

app.use(cors())
app.use(express.json())
app.use(express.static("storage"))


morganBody(app, {
    noColors: true,
    skip: function (req, res) {
        return res.statusCode < 400
    },
    stream: loggerStream
})

const port = process.env.PORT || 3000


//aqui invocamos a las rutas

app.use("/api", require("./routes"))

app.listen(port, () => {
    console.log(`Tu app esta lista por http://localhost:${port}`)
});

(ENGINE_DB === 'nosql') ? dbConnectNoSql() : dbConnectMysql()
