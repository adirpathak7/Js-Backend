import express from "express";
import connectToMongo from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

// const app = express()

dotenv.config({
    path: './env'
})

connectToMongo()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    }).catch((error) => {
        console.log("MONGODB connection failed! " + error)
    })



// const connectToMongo = async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         console.log("Connected to MongoDB")
//         app.on("error", (error) => {
//             console.log("Error connecting to MongoDB", error)
//         })

//         app.listen(process.env.PORT, () => {
//             console.log("Server is running on port", process.env.PORT)
//         })
//     } catch (error) {
//         console.log(`Error when Mongo is connect ${error}`);
//     }
// }