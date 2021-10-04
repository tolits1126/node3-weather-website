const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app= express()
//define path for express config
const publicdirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicdirPath))

 app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tolits'
    })
})

app.get('/about',(req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Joselito De Jesus'
    })
})

app.get('/help',(req, res) =>{
    res.render('help', {
        title: 'Help page',
        helpText: 'This is some helpful text',
        name: 'Joselito De Jesus'
    })
})

app.get('/weather',(req, res) =>{
if (!req.query.address) {
    return res.send({
        error: 'Please input your location'
    })
}


geocode(req.query.address,(error, {latitude, longtitude, location} = {} ) =>{
    if(error){
       return res.send({error})
    }
    forecast(latitude, longtitude,(error, forecastData) => {
        if (error) {
                return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })

    })
})

})


app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })

    }

    console.log(req.query.search);
    res.send({
    products: []

    })
} )


app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Joselito de Jesus',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Joselito de Jesus',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})