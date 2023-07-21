import mongoose from "mongoose";

export default class dbConnect {
  constructor() {}

  initializeConnection() {
    // const options = {
    // //   autoIndex: false, // Don't build indexes
    // //   maxPoolSize: 10, // Maintain up to 10 socket connections
    // //   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    // //   socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    //   family: 4, // Use IPv4, skip trying IPv6
    // };

    const url =
      "mongodb+srv://Koro:1234567887654321@cluster0.wbxh5ug.mongodb.net/?retryWrites=true&w=majority";

    mongoose.connect(url,{}).then(() => console.log('Database connected'));
  }
}
