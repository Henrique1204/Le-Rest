const fetch = require('node-fetch');
const cors = require('cors');

require("dotenv-safe").config();
var jwt = require('jsonwebtoken');
 
var http = require('http'); 
const express = require('express') 
const app = express() 
var cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser()); 
 
app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})

app.get('/pratos', verifyJWT, (req, res, next) => {
    fetch('http://localhost:3000/pratos')
    .then(resFetch => resFetch.json())
    .then(json => {
        res.json(json);
    })
    .catch(erro => res.json(erro));
})

app.post('/pratos', verifyJWT, (req, res, next) => {
    console.log("Adicionou!");
    fetch('http://localhost:3000/pratos', {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(resFetch => resFetch.json())
    .then(json => res.json(json))
    .catch(erro => res.json(erro));
})

app.put('/pratos', verifyJWT, (req, res, next) => {
    fetch(`http://localhost:3000/pratos/${req.body.id}`, {
        method: "PUT",
        body: JSON.stringify(req.body.dados),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(resFetch => resFetch.json())
    .then(json => res.json(json))
    .catch(erro => res.json(erro));
})

app.delete('/pratos', verifyJWT, (req, res, next) => {
    console.log("Deletou!");
    fetch(`http://localhost:3000/pratos/${req.body.id}`, {method: "DELETE"})
    .then(resFetch => resFetch.json())
    .then(json => res.json(json))
    .catch(erro => res.json(erro));
})

var server = http.createServer(app); 
server.listen(3001);
console.log("Servidor escutando na porta 3001...")
 
//authentication
app.post('/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'luiz' && req.body.pwd === '123'){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: (60 * 60 * 2) // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Login inválido!'});
})
 
app.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})

function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'Você não tem o token.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}
