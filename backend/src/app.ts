import express, {Request, Response} from 'express';
import morgan from "morgan";
import helmet from 'helmet';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

app.use((_: Request, res: Response) => {
    res.sendStatus(404);
})

app.use((error, _: Request, res: Response) => {
    console.error(error);
    res.sendStatus(404);
})

app.listen(8080, () => {
    console.log('Start Server')
})