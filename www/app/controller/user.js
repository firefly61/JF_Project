'use strict';

const md5 = require('md5')
const BaseController = require('./base');

class UserController extends BaseController {
  // 获取用户信息
  async info() {
    const { ctx } = this;
    // const wxToken = await this.service.wx.getToken();
    // ctx.session.wxtoken = wxToken;
    this.success({
      name: 'nicole',
      nickname: 'test'
    });
  }

  // 获取验证码
  async captcha() {
    const { ctx } = this;
    const captcha = this.service.tools.captcha()

    // 存储在session.留作验证
    ctx.session.captcha = captcha.text;
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data
  }

  // 登陆
  async login() {
    const { ctx, app } = this;
    let { nickname, pwd, captcha } = ctx.request.body;
    // 用户验证
    let user = await ctx.model.User.findOne({
      nickname,
      pwd: pwd
    })
    // if (captcha.toUpperCase() == ctx.session.captcha.toUpperCase()) {
    if (user) {
      let { nickname, name, sexy, mall, avatar } = user;
      const token = app.jwt.sign({
        name,
        nickname,
        sexy,
        mall,
        avatar,
        _id: user._id
      }, app.config.jwt.secret, {
        expiresIn: '1h'
      })
      this.success({
        name, nickname, sexy, mall, avatar, token
      })
    } else {
      this.error('用户名密码错误')
    }
    // } else {
    //   this.error('验证码错误')
    // }
  }

  // 创建用户
  async create() {

    const { ctx } = this

    let ret = await ctx.model.User.create({
      name: 'test3',
      nickname: 'tt3',
      pwd: md5('test3')
    })
    if (ret._id) {
      this.success('新建成功')
    }
  }
}

module.exports = UserController;
