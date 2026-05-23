const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(express.static('./'));

const CLIENT_ID = '1507533598700605570';
const CLIENT_SECRET = 'OC0bTdTmP1-_CMSim1Htv3MdZhRWa5QY';
// Cambiamos a tu dominio real
const REDIRECT_URI = 'https://blutter.xyz/'; 

app.get('/api/login', (req, res) => {
    // La URL de autorización ahora usa tu dominio
    const authUrl = `https://discord.com/oauth2/authorize?client_id=1507533598700605570&response_type=code&redirect_uri=https%3A%2F%2Fblutter.xyz%2F&scope=identify+guilds`;
    res.redirect(authUrl);
});

app.get('/api/login', (req, res) => {
    console.log("Iniciando proceso de login...");
    const authUrl = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify+guilds`;
    
    console.log("Redirigiendo a:", authUrl);
    res.redirect(authUrl); // Aquí debería saltar a Discord inmediatamente
});
app.listen(3000, () => console.log('Servidor corriendo en https://blutter.xyz'));