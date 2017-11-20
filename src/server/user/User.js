import { AttentionUser } from '../../model';
import dbStorage from '../../config/dbStorage';
import moment from 'moment';
import autobind from 'autobind-decorator'
import { logger } from '../../log4j';

@autobind
export default class User {
  constructor() {
  }

  /**
   * [getUserList 获取用户信息]
   * @param  {Function} cb   [description]
   * @param  {[type]}   info [description]
   * @return {Promise}       [description]
   */
  async getUserList(cb, info) {
    logger.warn(`this is moment format ${moment().format('YYYY-MM-DD hh:mm:ss')}`);
    const attentionUser = await AttentionUser.findAndCount({
      limit: 10,
      offset: 0
    });
    cb({ code: '00000', attentionUser });
  }

  /**
   * [saveWechatUser 保存微信用户]
   * @method saveWechatUser
   * @param  {Function}     cb   [description]
   * @param  {[type]}       info [description]
   * @return {Promise}           [description]
   */
  async saveWechatUser(cb, info) {
    console.log(info);
    const count = await AttentionUser.count({
      where: {
        OPENID: info.openid
      }
    });
    const t = await dbStorage.transaction();
    if (count === 0) {
      try {
        const user = await StoreUser.findOne({
          where: {
            OPENID: info.openid
          }
        });
        const res = await AttentionUser.create({
          OPENID: info.openid,
          NICKNAME: info.nickname,
          USER_ID: user ? user.USER_ID : null,
          SEX: info.sex,
          LANGUAGE: info.language,
          CITY: info.city,
          PROVINCE: info.province,
          COUNTRY: info.country,
          HEADIMGURL: info.headimgurl,
          SUBSCRIBE_TIME: new Date(parseInt(info.subscribe_time, 10) * 1000),
          REMARK: info.remark,
          GROUPID: info.groupid,
          REC_INVENTION_CODE: info.recInventionCode ? info.recInventionCode : null,
          IS_DISPLAY: 'Y',
          UPDATE_USER: 'admin',
          UPDATE_TIME: new Date()
        }, { transaction: t });
        t.commit();
        cb({ code: '00000', res })
      } catch (err) {
        t.rollback();
        console.log(err);
        cb({ code: '00001', err: err });
      }
    } else {
      try {
        const res = await AttentionUser.update({
          IS_DISPLAY: 'Y',
          NICKNAME: info.nickname,
          SEX: info.sex,
          LANGUAGE: info.language,
          CITY: info.city,
          PROVINCE: info.province,
          COUNTRY: info.country,
          HEADIMGURL: info.headimgurl,
          SUBSCRIBE_TIME: new Date(parseInt(info.subscribe_time, 10) * 1000),
          UPDATE_TIME: new Date()
        }, {
          where: {
            OPENID: info.openid
          }
        }, { transaction: t });
        t.commit();
        cb({ code: '00000' })
      } catch (err) {
        t.rollback();
        console.log(err);
        cb({ code: '00001', err: err });
      }
    }
  }

  /**
   * [unsubscribe 取消关注]
   * @method unsubscribe
   * @param  {Function}  cb   [description]
   * @param  {[type]}    info [description]
   * @return {Promise}        [description]
   */
  async unsubscribe(cb, info) {
    const t = await dbStorage.transaction();
    try {
      const res = await AttentionUser.update({
        IS_DISPLAY: 'N',
        UPDATE_TIME: new Date()
      }, {
        where: {
          OPENID: info.openid
        }
      }, { transaction: t });
      t.commit();
      cb({ code: '00000', res })
    } catch (err) {
      t.rollback();
      console.log(err);
      cb({ code: '00001', err: err });
    }
  }

}
