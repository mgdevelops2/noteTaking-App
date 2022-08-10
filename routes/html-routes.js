const router = require('express').Router();
const path = require('path');

router.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/notes.html"));
})

// this is the default route = the route that it will pull no matter what. Usually at the end of all routes.
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})



module.exports = router;
