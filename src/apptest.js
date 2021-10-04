const path = require('path')
const express = require('express')

const app = express()

const dirPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.use(express.static(dirPath))

app.get('',(req, res) => {
    res.render('indextest', {
        title: 'Home Page',
        name: 'Tolits'
    })
})

app.get('/about',(req, res) => {
    res.render('abouttest',{
        title: 'About Page',
        name: 'Tolits'
    })
})

app.get('/help',(req, res) => {
    res.render('helptest',{
        title: 'Help page',
        name: 'Tolits'
    })
})

app.listen(3000,() => {
    console.log('Connected to localhost');
})