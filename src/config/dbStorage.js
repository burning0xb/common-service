import Sequelize from 'sequelize';
import seqConf from './seqConf.json';
const dbStorage = new Sequelize(seqConf.database, seqConf.username, seqConf.password, {
  host: seqConf.host,
  dialect: 'mysql',
  port: seqConf.port,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    dateStrings: true, //禁止mysql的转换
    typeCast: true //覆盖了sequelize的转换，看代码，目前只影响date和GEOMETRY，能用
  },
  timezone: '+08:00'
});

export default dbStorage;
