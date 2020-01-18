const express= require('express')
const path =require('path')
const app = express()
const hbs =require('hbs')
const geo=require('./utils/geocode')
const forcast=require('./utils/forcast')
//paths for express
const publicDir = path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../views/views')
const partialPath = path.join(__dirname,'../views/partials')


hbs.registerPartials(partialPath)
app.set('view engine','hbs')
app.set('views',viewPath)
const name='harsh'
app.get('',(req,res)=>{
    res.render('index',{
        title:'title',
        name
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about us',
        help:'this website is all about me',
        name
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        help : 'you can get any help here',
        name,
        title:'help page'
    })
})
app.use(express.static(publicDir))

app.get('/weather',(req,res)=>{
    const location=req.query.location
if(!req.query.location){
   res.send({
       error:'enter location',
       title:'title',
        name
    })
}
else{
    geo.geocode(location,(error,data)=>{
        if(error){
            res.send({
                error:'geocode not found',
                title:'title',
        location:data.location,
        name
         })
        }
        const {latitude,longitude,location:address} = data
    forcast.forcast(latitude,longitude,location,(error,data)=>{

   if(!error){
    res.send({
        title:'title',
        location:address,
        forcast:data,
        name
    })

   }
    else{
        res.send({
            title:'title',
        location,
        name,
      error: 'failed to get location'
        })
    }
})})}
})
app.get('/product',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'you must enter place'

        })
    }
    res.send({
        search:req.query.search,
        products:[]
    })
})
app.listen(3000,()=>{
    console.log('server is up on 300')
})
app.get('/help/*',(req,res)=>{
    res.render('page404',{
        text:'artical not found',
        name
    })
})


app.get('*',(req,res)=>{
    res.render('page404',{
        text:'page not found',
        name
    })
})