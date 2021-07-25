import express from 'express';
import morgan from "morgan";
import helmet from 'helmet';
var app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(function (_, res) {
    res.sendStatus(404);
});
app.use(function (error, _, res) {
    console.error(error);
    res.sendStatus(404);
});
app.listen(8080, function () {
    console.log('Start Server');
});
