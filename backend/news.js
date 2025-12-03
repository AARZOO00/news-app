const router = require('express').Router();
const axios = require('axios');

// GET /api/news?category=technology&page=1&q=ai
router.get('/', async (req,res)=>{
  try{
    const {category, q, page=1} = req.query;
    const params = {
      apiKey: process.env.NEWSAPI_KEY,
      pageSize: 20,
      page,
      q,
      category,
      language: 'en'
    };
    // remove undefined query params
    Object.keys(params).forEach(k => params[k]===undefined && delete params[k]);
    const response = await axios.get('https://newsapi.org/v2/top-headlines',{params});
    res.json(response.data);
  }catch(err){
    console.error(err.response?.data || err.message);
    res.status(500).json({error:'news fetch failed'});
  }
});

module.exports = router;
