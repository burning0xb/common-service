/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ATTENTION_USER', {
    OPENID: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true
    },
    NICKNAME: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SEX: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    LANGUAGE: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    CITY: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    PROVINCE: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    COUNTRY: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    HEADIMGURL: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    SUBSCRIBE_TIME: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    REMARK: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    GROUPID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    UNIONID: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    IS_DISPLAY: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    UPDATE_USER: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    UPDATE_TIME: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'ATTENTION_USER',
    timestamps: false
  });
};
