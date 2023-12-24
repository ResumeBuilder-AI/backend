const express = require('express')
const http = require('http');
const cors = require('cors');
const supertokens = require('supertokens-node');
const {middleware, errorHandler} = require("supertokens-node/framework/express")
require("./src/services/login"); // supertokens init
const config = require("./src/config")
const { ioAttachToServer } = require('./io');
require("./src/services/queue_worker/workers") // bullmq workers init

const app = express();
const server = http.createServer(app);
ioAttachToServer(server);

app.use(cors({
    origin: config.WEB_URL,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));
app.use(middleware());

const routes = require('./src/routes/index');

app.use(errorHandler())

app.use("/", routes);

server.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`)
})
