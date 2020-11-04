const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@cluster0.qoaxi.mongodb.net/taskmanager?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})