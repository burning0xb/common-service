import { AttentionUser } from '../../model';
import dbStorage from '../../config/dbStorage';
import moment from 'moment';
import autobind from 'autobind-decorator'

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
    console.log(moment().format('YYYY-MM-DD hh:mm:ss'));
    const attentionUser = await AttentionUser.findAndCount({
      limit: 10,
      offset: 0
    });
    cb({ code: '00000', attentionUser });
  }

}
