var express = require('express');
var router = express.Router();
var axios = require('axios')

var repoID = "tabelaP"
var groupP = "";
var periodP = "";
var elementP = "";
var getLink = "http://localhost:7200/repositories/" + repoID + "?query=" ;

// ------- Pagina principal ---------------
router.get('/', function(req, res) {
  var prefixes = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX noInferences: <http://www.ontotext.com/explicit>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  `
  var query = `select * where { ?s a owl:Class .}`;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {
      
      dados.data.results.bindings.map(bind => {
        if (bind.s.value.split('#')[1] === "Period")
          periodP = (bind.s.value.split('#')[0]).replace(/\//g,'_');

        else if (bind.s.value.split('#')[1] === "Group")
          groupP = (bind.s.value.split('#')[0]).replace(/\//g,'_');

        else if (bind.s.value.split('#')[1] === "Element")
          elementP = (bind.s.value.split('#')[0]).replace(/\//g,'_');

      })
      res.render('index', {group:groupP, element: elementP, period: periodP});
    })
    .catch(erro => console.log(erro)) 
})

// ------- Pagina com lista de elementos ---------------
router.get('/elementos/:e/:g/:p', function(req,res) {
  var prefixes = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX noInferences: <http://www.ontotext.com/explicit>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX : <${req.params.e.replace(/_/g,'/')}#>
  `
  var query = `select * where { ?s a :Element .}`;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {
      elementos = []
      dados.data.results.bindings.map(bind => elementos.push(bind.s.value.split('#')[1]))
      res.render('elementos',{info:elementos,group:req.params.g, element: req.params.e, period: req.params.p})
    })
    .catch(erro => console.log(erro)) 
})

// ------- Pagina com informação de elemento individual ---------------
router.get('/elemento/:e/:g/:p/:id', function(req,res) {
  var prefixes = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX noInferences: <http://www.ontotext.com/explicit>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX : <${req.params.e.replace(/_/g,'/')}#>
  `
  var query = `select * where { :${req.params.id} ?p ?o .}`;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {
      var ind = []
      
      dados.data.results.bindings.map(bind => {
        if (bind.p.value.split('#')[1] != "type")
        {
          var p = bind.p.value.split('#')[1];
          var value;

          if (bind.o.type === "uri")
            value = bind.o.value.split('#')[1];

          else value = bind.o.value;

          ind.push({
            type: p,
            value: value
          })
        }
      })
      
      res.render('elemento',{info:ind, group:req.params.g, element: req.params.e, period: req.params.p})
    })
  .catch(erro => console.log(erro));
})

// ------- Pagina com lista de grupos ---------------

router.get('/grupos/:e/:g/:p', function(req,res) {
  var prefixes = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX noInferences: <http://www.ontotext.com/explicit>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX : <${req.params.g.replace(/_/g,'/')}#>
  `
  var query = `select * where { ?s a :Group .}`;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {
      grupos = []
      dados.data.results.bindings.map(bind => grupos.push(bind.s.value.split('#')[1]))
      res.render('grupos',{info:grupos,group:req.params.g, element: req.params.e, period: req.params.p})
    })
    .catch(erro => console.log(erro)) 
})

module.exports = router;

// ------- Pagina com informação de grupo individual ---------------
router.get('/grupo/:e/:g/:p/:id', function(req,res) {
  var prefixes = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX noInferences: <http://www.ontotext.com/explicit>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX : <${req.params.g.replace(/_/g,'/')}#>
  `

  console.log(prefixes)
  var query = `select * where { :${req.params.id} ?p ?o .}`;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {
      var grupos = []
      
      dados.data.results.bindings.map(bind => {
        if (bind.p.value.split('#')[1] != "type")
        {
          var p = bind.p.value.split('#')[1];
          var value;

          if (bind.o.type === "uri")
            value = bind.o.value.split('#')[1];

          else value = bind.o.value;

          grupos.push({
            type: p,
            value: value
          })
        }
      })
      
      res.render('grupo',{info:grupos, group:req.params.g, element: req.params.e, period: req.params.p})
    })
  .catch(erro => console.log(erro));
})


// ------- Pagina com lista de períodos ---------------

router.get('/periodos/:e/:g/:p', function(req,res) {
  var prefixes = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX noInferences: <http://www.ontotext.com/explicit>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX : <${req.params.p.replace(/_/g,'/')}#>
  `
  var query = `select * where { ?s a :Period .}`;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {
      periodos = []
      dados.data.results.bindings.map(bind => periodos.push(bind.s.value.split('#')[1]))
      res.render('periodos',{info:periodos,group:req.params.g, element: req.params.e, period: req.params.p})
    })
    .catch(erro => console.log(erro)) 
})

module.exports = router;

// ------- Pagina com informação de período individual ---------------
router.get('/periodo/:e/:g/:p/:id', function(req,res) {
  var prefixes = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX noInferences: <http://www.ontotext.com/explicit>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX : <${req.params.p.replace(/_/g,'/')}#>
  `

  console.log(prefixes)
  var query = `select * where { :${req.params.id} ?p ?o .}`;
  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {
      var periodos = []
      
      dados.data.results.bindings.map(bind => {
        if (bind.p.value.split('#')[1] != "type")
        {
          var p = bind.p.value.split('#')[1];
          var value;

          if (bind.o.type === "uri")
            value = bind.o.value.split('#')[1];

          else value = bind.o.value;

          periodos.push({
            type: p,
            value: value
          })
        } 

        console.log(bind)
      })
      
      res.render('periodo',{info:periodos, group:req.params.g, element: req.params.e, period: req.params.p})
    })
  .catch(erro => console.log(erro));
})
