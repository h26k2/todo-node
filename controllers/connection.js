const connection = (mongoose) => {

    mongoose.connect("mongodb://localhost/todoapp",{useNewUrlParser : true});

    //checking connection 
    mongoose.connection.once('open',()=>{
        console.log(`Database connection is successfully opened!`);
    }).on('connected',()=>{
        console.log('succesfully connected to the database!');
    }).on('disconnected',()=>{
        console.log('Database connection disconnected');
    }).on('errror',(err)=>{
        console.log(`Error occured while connecting to the database\n ${err}`);
    })

    
}

module.exports = connection;