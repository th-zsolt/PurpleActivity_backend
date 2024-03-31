import { Sequelize } from "sequelize-typescript";

const sequelizeInstance = new Sequelize({
    database: process.env.DATABASE,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  //  host: ,
  // port: Number(),
    dialect: 'postgres',
  })
  


export default sequelizeInstance;