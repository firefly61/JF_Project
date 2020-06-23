module.exports = app => {
    let mongoose = app.mongoose
    let Schema = mongoose.Schema

    const SaleSchema = new Schema({
        __v:{type:Number, select:false},
        mall: { type: Number, require: true },
        dateStamp: { type: Number, require: true },
        dateStr: { type: String, require: true },
        createTime: { type: Date, require: true},
        updateTime: { type: Date, require: true},
        todaySale: { type: Number, require: true },
        monthProgress: { type: String, require: true },
        todayCustomer: { type: Number, require: true },
        todayWXCustomer: { type: Number, require: false },
        monthTarget: { type: Number, require: true },
        monthSale: { type: Number, require: true },
        monthTargetNoTH: { type: Number, require: false }, 
        monthSaleNoTH: { type: Number, require: false },
        lastYearWeek: { type: String, require: true },
        lastYearDay: { type: String, require: true },
        lastWeek: { type: String, require: true },
        floors: { type: Array, require: true },
        format: { type: Array, require: true },
        impStore: { type: Array, require: true }
    })

    return mongoose.model('Sale', SaleSchema)
}