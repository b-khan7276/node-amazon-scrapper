const express = require('express');
const request = require('request-promise')

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

const apiKey= '36b27a837cb214654d24e38c4b195acc';
const baseUrl =`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;



app.get('/',(req, res)=>{
  res.send("Welcome")
})
// Get product details

app.get('/products/:productId', async(req,res)=>{
  const {productId} = req.params;

  try{
    const response = await  request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`)
      res.json(JSON.parse(response));
  }
  catch(error)
  {
    res.json(error);
    
  }

})
// Product reviews
app.get('/products/:productId/reviews', async(req,res)=>{
  const {productId} = req.params;

  try{
    const response = await  request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`)
      res.json(JSON.parse(response));
  }
  catch(error)
  {
    res.json(error);
    
  }

})
// Product Offers
app.get('/products/:productId/offers', async(req,res)=>{
  const {productId} = req.params;

  try{
    const response = await  request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
      res.json(JSON.parse(response));
  }
  catch(error)
  {
    res.json(error);
    
  }

})

// Get search Result 
app.get('/search/:searchQuery', async(req,res)=>{
  const {searchQuery} = req.params;

  try{
    const response = await  request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`)
      res.json(JSON.parse(response));
  }
  catch(error)
  {
    res.json(error);
    
  }

})


app.listen(PORT, ()=>{console.log(`App is listing on port ${PORT}`)});
