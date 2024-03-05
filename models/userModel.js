const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    password:String,
    gender:String,
    phno:String,
    uniqueId:String,
    classname:String,
    email:String,
    dob:Date,
    userType: String,
})

// For teacher
// Body :
// {
//     firstname,
//     lastname,
//     password,
//     gender,
//     phno,
//     uniqueId,
//     email,
//     dob,
//     userType
// }

// For student
// Body :
// {
//     firstname,
//     lastname,
//     password,
//     gender,
//     phno,
//     uniqueId,
//     email,
//     dob,
//     classname,
//     userType
// }


userSchema.methods.generateAuthToken = async function generateToken(){
    try {
        const token = jwt.sign({ _id: this._id.toString(),userType: this.userType.toString() }, 'my secret key', {
          expiresIn: '1y',
        });

        return token;
    } catch (error) {
        console.log(error);
        return null;
      }
}

module.exports=mongoose.model('user',userSchema);