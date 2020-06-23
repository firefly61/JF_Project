/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582525848840_4501';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    myAppName: 'JF_mobile_data',
  };

  return {
    ...config,
    ...userConfig,
    security: {
      csrf: {
        enable:false
      }
    },
    // oracle: {
    //   client: {
    //     user: '',
    //     password: '',
    //     connectString: '',
    //   },
    // }
    mongoose: {
      url: 'mongodb://127.0.0.1:27017/test'
      // url: 'mongodb://192.168.202.20:27017/test'
    },
    jwt: {
      secret: 'sweety@liuying'
    }
  };
};
