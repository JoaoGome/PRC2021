var express = require('express');
var router = express.Router();
var axios = require('axios');

var prefixes = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX noInferences: <http://www.ontotext.com/explicit>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX : <http://www.di.uminho.pt/prc2021/Charada#>
`

router.get('/', function(req, res) {
  axios.get("http://localhost:7200/rest/repositories")
    .then(dados => {
      res.render('main', {info: dados.data})
    })
    .catch(erro => console.log(erro))
});

router.get('/repositorio/:id', function(req,res) {
  var getLink = "http://localhost:7200/repositories/" + req.params.id + "?query=" ;
  var query = `SELECT * WHERE { ?s a owl:Class .}`;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {
      classes = []
      dados.data.results.bindings.map(bind => classes.push(bind.s.value.split('#')[1]))
      res.render('repo',{id:req.params.id, info: classes})
    })
    .catch(erro => console.log(erro)) 
})

router.get('/repositorio/:id/classe/:c', function(req,res) {
  var getLink = "http://localhost:7200/repositories/" + req.params.id + "?query=" ;
  var query = `SELECT * WHERE { ?s rdf:type :${req.params.c} .}`;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {
      Lind = []
      dados.data.results.bindings.map(bind => Lind.push(bind.s.value.split('#')[1]))
      res.render('Listaind',{id:req.params.id, info: Lind})
    })
    .catch(erro => console.log(erro)) 
})

router.get('/repositorio/:id/ind/:i', function(req,res) {
  var getLink = "http://localhost:7200/repositories/" + req.params.id + "?query=" ;
  var query = `SELECT * WHERE {:${req.params.i} ?p ?o .}`;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {
      ind = []
      
      dados.data.results.bindings.map(bind => {
        var p = bind.p.value.split('#')[1];
        var value;
        if (bind.o.type === "uri")
          value = bind.o.value.split('#')[1];

        else value = bind.o.value;

        ind.push({
          type: p,
          value: value
        })
      })
      console.log(ind)
      res.render('ind',{id:req.params.id, info: ind})
    })
    .catch(erro => console.log(erro)) 
})


module.exports = router;

