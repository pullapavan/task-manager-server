const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const User = require('../models/user')
const { countDocuments } = require('../models/user')
const router = new express.Router()

//TO insert New Task...
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//To get all taks of a user....
router.get('/tasks', auth, async (req, res) => {
    try {
        const user = await req.user.populate('tasks').execPopulate()
        res.status(200).send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

//To get all taks of a user for admin
router.get('/admin/tasks/:id', auth, admin, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.params.id })
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})


//TO update the task status
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//to delete a task
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            res.status(404).send()
        }

        res.status(200).send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router