import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import sequelizeInstance from './models/sequlizeInstance';
import routes from './routes';
import { CustomError } from './utils/error';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use(routes);

app.get('*', function (req: Request, res: Response, next: NextFunction) {
  const error = new CustomError(
    `${req.ip} tried to access ${req.originalUrl}`,
  );

  error.statusCode = 301;

  next(error);
});

//Application-Level Middleware

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).redirect('/not-found');
  }

  return res
    .status(error.statusCode)
    .json({ error: error.toString() });
});

//Start

//test purposes only
const eraseDatabaseOnSync = false;


sequelizeInstance.sync({ force: eraseDatabaseOnSync }).then(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});

