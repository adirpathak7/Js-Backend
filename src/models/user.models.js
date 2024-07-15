import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const testSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        profilePicture: {
            type: String,
            required: true,
            trim: true
        },
        video: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)


testSchema.pre("save", async function (next){
    if(this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password, 8)
    next()
})

testSchema.methods.isPsswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

testSchema.methods.generateAccessToken = function(){
   return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            name:this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

testSchema.methods.refreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

testSchema.plugin(mongooseAggregatePaginate) // for aggregate query's

export const Test = mongoose.model("Test", testSchema)