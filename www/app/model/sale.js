module.exports = app => {
    let mongoose = app.mongoose
    let Schema = mongoose.Schema

    const SaleSchema = new Schema({
        __v:{type:Number, select:false},
        mall: { type: String, require: true },
        today: { type: String, require: true },
        todaySale: { type: String, require: true },
        monthProgress: { type: String, require: true },
        todayCustomer: { type: String, require: true },
        todayWXCustomer: { type: String, require: false },
        monthTarget: { type: String, require: true },
        monthSale: { type: String, require: true },
        monthTargetNoTH: { type: String, require: false }, 
        monthSaleNoTH: { type: String, require: false },
        lastYearWeek: { type: String, require: true },
        lastYearDay: { type: String, require: true },
        lastWeek: { type: String, require: true },
        floors: { type: Array, require: true },
        format: { type: Array, require: true },
        impStore: { type: Array, require: true }
    })

    return mongoose.model('Sale', SaleSchema)
}