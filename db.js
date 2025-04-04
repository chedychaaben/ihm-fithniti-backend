import { Sequelize } from 'sequelize';



const sequelize = new Sequelize("ride", "root", "", {
  host: "localhost",
  dialect: "mysql",
});


export default sequelize;