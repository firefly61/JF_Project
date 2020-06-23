module.exports = app => {
    let mongoose = app.mongoose
    let Schema = mongoose.Schema

    const TargetSchema = new Schema({
        __v:{type:Number, select: false},
        mall_id: {type: String, require: true},
        mall_code: {type: String, require: true},
        month: {type: Number, require: true},
        monthTarget: {type: String, require: true},
        dailySales: {type: Array, require: true},
        createTime: {type: Date, require: true},
        updateTime: {type: Date, require: true}
    })

    return mongoose.model('Target', TargetSchema)
}