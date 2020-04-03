module.exports = app => {
    let mongoose = app.mongoose
    let Schema = mongoose.Schema

    const UserSchema = new Schema({
        __v:{type:Number, select:false},
        name:{type:String, require:true},
        nickname:{type:String, require:true},
        sexy:{type:String, require:false},
        pwd:{type:String, require:true},
        mall:{type:String, require: false},
        avatar:{type:String, require:false, default:'/user.png'}
    }, {timestamps:true})
    return mongoose.model('User', UserSchema)
}