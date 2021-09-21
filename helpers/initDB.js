import  mongoose from "mongoose";

function initDB() {
    if(mongoose.connections[0].readyState){
        console.log('Already connected')
        return
    }
  mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useCreateIndex:true,
    //     useFindAndModify:false,
    //     useUnifiedTopology: true
  });
  mongoose.connection.on("connected", () => {
    console.log("Connected to mongodb");
  });
  mongoose.connection.on("error", () => {
    console.log("Connectd to mongo");
  });
}

export default initDB;
