var express = require('express');
var router = express.Router();
var axios = require('axios')

repoID = "tpc6";
var getLink = "http://localhost:7200/repositories/" + repoID + "?query=" ;
var prefixes = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX noInferences: <http://www.ontotext.com/explicit>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX : <http://www.di.uminho.pt/prc2021/tpc5#>
`

// get para os autores
router.get('/autores', function(req,res) {
  var query = ` select ?s ?nome (count(?pub) as ?npubs) where { 
                  ?s a :author .
                  ?s :nome ?nome .
                  ?pub :hasAuthor ?s .
                }
                group by ?s ?nome
                `
                ;

  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {
      var result = []
      
      dados.data.results.bindings.map(bind => {

        id = bind.s.value.split('#')[1];
        npubs = bind.npubs.value;
        nome = bind.nome.value.replace("_"," ");
        
        
        result.push({
          id: id,
          npubs: npubs,
          nome: nome
        })

      })

      res.send(result);
    })
    .catch(erro => console.log(erro)) 
})

// get para um dado autor
router.get('/autores/:id', function(req,res) {
  var query = ` select ?pub ?Title ?Year ?Type where { 
                ?pub :hasAuthor :${req.params.id} .
                ?pub a ?Type .
	              FILTER(?Type IN (:inproceedings, :proceedings, :article, :misc, :book, :inbook, :masterthesis, :phdthesis))
                OPTIONAL {?pub :title ?Title .}
                OPTIONAL {?pub :year ?Year .}
                }`
                ;

  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {
      var result = []

      dados.data.results.bindings.map(bind => {
        
        type = bind.Type.value.split("#")[1];
        year = bind.Year.value;
        title = bind.Title.value;
        id = bind.pub.value.split("#")[1];

        result.push({
          id: id,
          type: type,
          title: title,
          year: year
        })

      })

      res.send(result);
    })
    .catch(erro => console.log(erro)) 
})

// get para as pubs
router.get('/pubs', function(req,res) {
  var query = ` select * where { 
                ?s a ?Type  .
	              FILTER(?Type IN (:inproceedings, :proceedings, :article, :misc, :book, :inbook, :masterthesis, :phdthesis))
                OPTIONAL {?s :title ?Title .}
                OPTIONAL {?s :year ?Year .}
                }`
                ;

  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {
      var result = []
      
      dados.data.results.bindings.map(bind => {

        if (bind.s)
          id = bind.s.value.split('#')[1];
        
        if (bind.Type)
          type = bind.Type.value.split('#')[1];

        if (bind.Year)
          year = bind.Year.value;

        if (bind.Title)  
          title = bind.Title.value;
        
        
        
        result.push({
          id: id,
          type: type,
          title: title,
          year: year
        })

      })

      res.send(result)
    })
    .catch(erro => console.log(erro)) 
})

// get para uma pub especifica
router.get('/pubs/:id', function(req,res) {
  var query = ` select * where { 
                :${req.params.id} ?o ?p  .
                }`
                ;

  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
    .then(dados => {
      var autores = []
      type = ""; address = ""; booktitle = ""; doi = ""; month = ""; title = ""; year = "";

      dados.data.results.bindings.map(bind => {
        if (bind.o.value.split('#')[1] === "type" && bind.p.value.split('#')[1] != "NamedIndividual")
          type = bind.p.value.split('#')[1]

        if (bind.o.value.split('#')[1] === "hasAuthor")
          autores.push(bind.p.value.split("#")[1]);

        if (bind.o.value.split('#')[1] === "address")
          address = bind.p.value;
        
        if (bind.o.value.split('#')[1] === "booktitle")
          booktitle = bind.p.value;  
        
        if(bind.o.value.split('#')[1] === "doi")
          doi = bind.p.value;
        
        if(bind.o.value.split('#')[1] === "month")
          month = bind.p.value;
        
        if(bind.o.value.split('#')[1] === "title")
          title = bind.p.value;
        
        if(bind.o.value.split('#')[1] === "year")
          year = bind.p.value;

      })

      result = {
        type: type,
        autores: autores,
        address: address,
        booktitle: booktitle,
        doi: doi,
        month: month,
        title: title,
        year: year
      }

      res.send(result)

    })
    .catch(erro => console.log(erro)) 
})

module.exports = router;
