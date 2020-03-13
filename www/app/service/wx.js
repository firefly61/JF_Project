'use strict';

const Service = require('egg').Service;

class wxService extends Service {

    // 获取token
    async getToken() {
        let result = await this.ctx.curl('https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid='+ WX_CONFIG.CORPID +'&corpsecret='+WX_CONFIG.SECRET, {
            dataType: 'json'
        })
        return result.data;
    }

    // 读取成员信息
    async getUser(token, userid) {
        let result = await this.ctx.curl('https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=' + token + '&userid=' + userid, {
            dataType: 'json'
        })
        return result.data;
    }
}

module.exports = wxService;
