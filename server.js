const express = require('Express');
const app = express();
const PORT = 3001;
const htmlRoutes = require('./routes/html-routes.js')
const apiRoutes = require('./routes/apiRoutes.js')
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"))
app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => { 
    console.log('Listenining on PORT: 3001');
})
