import mongoose from "mongoose";

const connectToMongoDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MOngodb");
        
    } catch (error) {
        console.log("error connecting to Mongodb",error.message);
    }

    
}

export default connectToMongoDb;