const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const { response } = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin: '*',
}))
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.get("/", (req, res)=>{
   res.status(200).send("Welcome TO TODO Server!!!!")
})
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
    // const task = await Task.findById('5c2e505a3253e18a43e612e6')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user = await User.findById('5c2e4dcb5eac678a23725b5b')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
// }

// main()