'use strict'

const BaseController = require('./base')

class SaleController extends BaseController {

    // 录入数据
    async create() {
        const { ctx } = this
        console.log('提交', ctx.request.body)

        let obj = ctx.request.body;
        this.message('提交成功')
        if (await this.checkDate(obj.today, obj.mall)) {
            this.error('当日数据已提交')
        } else {
            let ret = await ctx.model.Sale.create(obj);
            if (ret._id) {
                this.success({
                    id: ret._id
                })
            } else {
                this.error('添加失败')
            }
        }

    }


    // 检查当日数据是否已录入
    async checkDate(dateStr, mall) {
        const dataSet = await this.ctx.model.Sale.findOne({ today: dateStr, mall:mall })
        return dataSet;
    }

    // 获取门店某日数据
    async getDaySale() {
        const { ctx } = this
        const { date, mall } = ctx.request.body
        let dataSet = await this.ctx.model.Sale.findOne({ today: date, mall: mall })
        if (dataSet) {
            this.success(dataSet)
        } else {
            this.error('opooosss!请管理员在后台录入' + this.formatDate(new Date(date)) + '的数据')
        }
    }

    formatDate(date) {
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    }

    // 获取门店销售数据列表
    async getMallSaleList() {
        const {ctx} = this
        const {mall} = ctx.request.body
        let dataSet = await this.ctx.model.Sale.find({mall: mall})
        if(dataSet) {
            this.success(dataSet)
        }else {
            this.error('error')
        }
    }

}

module.exports = SaleController