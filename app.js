const express = require('express')
const Datastore = require('nedb-promise')

const users = new Datastore({ filename: 'users.db', autoload: true })

const app = express()

app.use(express.json())


app.get('/users', async(req, res) => {
    const responseJSON = await users.find({})
    res.json({ "results": responseJSON })
        // let responseBody = JSON.stringify(responseJSON)
        // res.set("Content-Type", "application/json")
        // res.send(responseBody)
})

app.get('/users/:id', async(req, res) => {
    const results = await users.findOne({ _id: req.params.id }) // Hämtar den användaren som jag skriver in i url:en med ett id.
    res.json({ 'results': results })
})

app.post('/users', async(req, res) => {
    const newUsers = {
        name: {
            title: req.body.title,
            first: req.body.first,
            last: req.body.last,
        },
        email: req.body.email,
        nat: req.body.nat
    }
    const result = await users.insert(newUsers)
    res.json({ 'result': result })
})

app.patch('/users/:id', async(req, res) => {
    const result = await users.update({ _id: req.params.id }, { $set: { "name.title": req.body.title, "name.first": req.body.first, "name.last": req.body.last, email: req.body.email, nat: req.body.nat } })
    res.json(result)
})


app.delete('/users/:id', async(req, res) => {
    const result = await users.remove({ _id: req.params.id })
    res.json(result)
})


app.listen(8080, console.log("Server started"))