module.exports = app => {
    let mongoose = app.mongoose
    let Schema = mongoose.Schema

    const UserSchema = new Schema({
        __v:{type:Number, select:false},
        name:{type:String, require:false},
        nickname:{type:String, require:true},
        pwd:{type:String, require:true},
        avatar:{type:String, require:false, default:'/user.png'}
    }, {timestamps:true})
    return mongoose.model('User', UserSchema)
}