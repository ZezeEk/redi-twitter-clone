const { default: mongoose } = require("mongoose")

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
         //const conn = await mongoose.connect("mongodb+srv://zeynepekicice_db_user:rlk3ex1qNtsTZcUj@TwitterCluster.fxwty3w.mongodb.net/TwitterDb?retryWrites=true&w=majority");
        //const conn = await mongoose.connect("mongodb+srv://zeynepekicice_db_user:rlk3ex1qNtsTZcUj@twitterdb.blpok2x.mongodb.net/?appName=TwitterDb");
    }
    catch(error){
        console.log("db connection:",error);
        process.exit(1);
    }
}

export default connectDb;