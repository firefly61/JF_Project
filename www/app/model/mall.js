module.exports = app => {
    let mongoose = app.mongoose
    let Schema = mongoose.Schema

    const MallSchema = new Schema({
        __v:{type:Number, select:false},
        code:{type:Number, require: true},
        label:{type:String, require: true},
        floorNum:{type:Number, require: true},
        impStore:{type:Array, require: true}
    })

    return mongoose.model('Mall', MallSchema)
}
