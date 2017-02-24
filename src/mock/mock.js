/* eslint-disable */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers } from '../resources/user';
import { Award } from '../resources/schools';
import { WorkDurationOptions } from '../resources/work-durations';
import { AcademicOptions } from '../resources/academics';
import UserAPI from './user';
import Mock from 'mockjs';

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock list request
    mock.onGet('/user/list').reply(UserAPI.list);

    mock.onPost('/user/add').reply(UserAPI.add);

    mock.onPost('/user/remove').reply(UserAPI.remove);

    mock.onPost('/user/edit').reply(UserAPI.edit);
    // mock success request
    mock.onPost('/resume/add').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功!!!', user }]);
          } else {
            resolve([200, { code: 500, msg: '用户名或密码错误!!!' }]);
          }
        }, Math.random() * 1000 + 1000);
      });
    });

    mock.onGet('/getAward').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(Award);
          let list = Award;
          resolve([200, {code: 200, msg: '请求成功!!!', list}]);
        }, Math.random() * 200 + 50);
      });
    });

    mock.onPost('/saveActivity').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {code: 200, msg: '上传成功', id: Mock.Random.guid()}]);
        }, Math.random() * 200 + 50);
      });
    });
  }
};
