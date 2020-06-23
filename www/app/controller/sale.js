'use strict'

const BaseController = require('./base')

class SaleController extends BaseController {

    // 录入每日销售数据
    async create() {
        const { ctx } = this
        console.log('提交', ctx.request.body)

        let obj = ctx.request.body;
        let saleObj = {
            mall: obj.mall,
            dateStamp: obj.today,
            dateStr: obj.today,
            todaySale: obj.todaySale,
            monthProgress: obj.monthProgress,
            todayCustomer: obj.todayCustomer,
            todayWXCustomer: obj.todayWXCustomer,
            monthTarget: obj.monthTarget,
            monthSale: obj.monthSale,
            monthTargetNoTH: obj.monthTargetNoTH ? obj.monthTargetNoTH : undefined,
            monthSaleNoTH: obj.monthSaleNoTH ? obj.monthSaleNoTH : undefined,
            lastYearWeek: obj.lastYearWeek,
            lastYearDay: obj.lastYearDay,
            lastWeek: obj.lastWeek,
            floors: obj.floors,
            format: obj.format,
            impStore: obj.impStore,
            createTime: Date.now(),
            updateTime: Date.now()
        };
        this.message('提交成功')
        if (await this.checkDate(obj.today, obj.mall)) {
            this.error('当日数据已提交')
        } else {
            let ret = await ctx.model.Sale.create(saleObj);

            if (ret._id) {
                this.success({
                    id: ret._id
                })
            } else {
                this.error('添加失败')
            }

            // 提取目标销售额
            let targetObj = {
                month: new Date(saleObj.dateStr).getMonth() + 1,
                monthTarget: saleObj.monthTarget,
                mall_code: saleObj.mall,
                dailySales: []
            }
            // 提取当日销售额
            let daySaleObj = {
                day: new Date(saleObj.dateStr).getDate(),
                sale: saleObj.todaySale
            }

            console.log('month:', targetObj.month)

            // 获取当月已存目标销售额
            let _target = await ctx.model.Target.findOne({ month: targetObj.month, mall_code: targetObj.mall_code })
            if(_target) {
                targetObj.dailySales = _target.dailySales.push(daySaleObj)
            }else {
                targetObj.dailySales[0] = daySaleObj
            }
            console.log(targetObj)


            // 检查是否已存入当月销售总额
            if (_target) {
                // 更新每日销售数据
                ctx.model.Target.update({ month: targetObj.month, mall_code: targetObj.mall_code }, {
                    dailySales: targetObj.dailySales,
                    updateTime: Date.now()
                })
                console.log(targetObj, '目标更新成功')
            } else {
                targetObj.createTime = targetObj.updateTime = Date.now()
                ctx.model.Target.create(targetObj)
                console.log(targetObj, '目标插入成功')
            }

        }
    }

    // 获取某月销售目标和每日销售数据
    async getTarget() {
        const { ctx } = this
        let obj = ctx.request.body;
        if(!obj.month) {
            this.error('参数错误')
        }else {
            let res = await ctx.model.Target.findOne({month: obj.month, mall_code: obj.code})
            if(res) {
                this.success(res)
            }else {
                this.error('请求错误')
            }
        }
    }

    // 更新数据
    async update() {
        const { ctx } = this
        console.log('更新', ctx.request.body)

        let obj = ctx.request.body;
        let saleObj = {
            mall: obj.mall,
            dateStamp: obj.today,
            dateStr: obj.today,
            todaySale: obj.todaySale,
            monthProgress: obj.monthProgress,
            todayCustomer: obj.todayCustomer,
            todayWXCustomer: obj.todayWXCustomer,
            monthTarget: obj.monthTarget,
            monthSale: obj.monthSale,
            monthTargetNoTH: obj.monthTargetNoTH ? obj.monthTargetNoTH : undefined,
            monthSaleNoTH: obj.monthSaleNoTH ? obj.monthSaleNoTH : undefined,
            lastYearWeek: obj.lastYearWeek,
            lastYearDay: obj.lastYearDay,
            lastWeek: obj.lastWeek,
            floors: obj.floors,
            format: obj.format,
            impStore: obj.impStore,
            updateTime: Date.now()
        };
        this.message('提交成功')
        if (await this.checkDate(obj.today, obj.mall)) {
            this.error('当日数据已提交')
        } else {
            let ret = await ctx.model.Sale.update(saleObj);
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
        const dataSet = await this.ctx.model.Sale.findOne({ dateStamp: dateStr, mall: mall })
        return dataSet;
    }

    // 获取门店某日数据
    async getDaySale() {
        const { ctx } = this
        const { date, mall } = ctx.request.body
        let dataSet = await ctx.model.Sale.findOne({ dateStamp: date, mall: mall })
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
        const { ctx } = this
        /**
         * 条件查询
         * mall 门店id
         * timestamp 某一天
         */
        const { mall } = ctx.request.body
        let dataSet = await this.ctx.model.Sale.find({ mall: mall })
        if (dataSet) {
            this.success(dataSet)
        } else {
            this.error('error')
        }
    }

    // 查询某月数据
    async getMonthSales() {
        const { ctx } = this
        const { mall, year, month } = ctx.request.body
        const arr = [1, 3, 5, 7, 8, 10, 12]
        let day = arr.indexOf(month) > 0 ? 31 : 30
        let firstDay = new Date(year + '-' + month + '-' + 1).getTime()
        let lastDay = new Date(year + '-' + month + '-' + day).getTime()
        let result = [];
        console.log(1, firstDay, lastDay)
        let dataSet = await this.ctx.model.Sale.find({ 'mall': mall, 'dateStamp': { $gte: firstDay, $lte: lastDay } })

        if (dataSet) {
            dataSet.forEach(v => {
                result.push({
                    day: new Date(v.dateStamp).getDate(),
                    sale: v.todaySale
                })
            })
            this.success(result)
        } else {
            this.error('error')
        }
    }
}

module.exports = SaleController