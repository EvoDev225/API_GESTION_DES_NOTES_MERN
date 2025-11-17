const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv")
const connectDB = require("./config/db");
const etudiantrouter = require("./routes/etudiantRoutes");
const routeClasse = require("./routes/routeClasse")
dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.text({ type: 'text/plain' }));
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log('=== DEBUG MIDDLEWARE ===');
    console.log('Time:', new Date().toISOString());
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body:', req.body);
    console.log('Body type:', typeof req.body);
    console.log('=== FIN DEBUG ===');
    next();
});
// Connexion à MongoDB
connectDB();

app.use("/etudiant", etudiantrouter);
app.use("/classe", routeClasse);

app.listen(process.env.PORT || 3000, () => {
    console.log("server running !");
});
