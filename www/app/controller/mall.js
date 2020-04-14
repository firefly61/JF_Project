'use strict'

const BaseController = require('./base')

class MallController extends BaseController {

    // 获取项目信息
    async getInfo() {
        const {ctx} = this
        const {mall} = ctx.request.body
        let mallData = await this.ctx.model.Mall.findOne({code: mall})
        console.log(mallData)
        if(mallData){
            this.success(mallData)
        } else {
            this.error('error')
        }
    }

    // 修改重点商户
    // async updateImpStore() {

    // }

}

module.exports = MallController