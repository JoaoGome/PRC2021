var express = require('express');
var router = express.Router();
var axios = require('axios')

repoID = "EMD";
var getLink = "http://localhost:7200/repositories/" + repoID + "?query=" ;
var prefixes = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX noInferences: <http://www.ontotext.com/explicit>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX : <http://www.prc.di.uminho.pt/2021/TestePRC2021#>
`

router.get('/api/emd', function(req, res, next) {

  if (req.query.res === "OK")
  {
    var query = `
              SELECT ?s WHERE {
                  ?s a :EMD .
                  ?s :resultado "True" .
              }
              `;

  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
  .then(dados => {
    var result = [];

    dados.data.results.bindings.map(bind => {
      emd = bind.s.value.split('#')[1];

      result.push({
        emd: emd,
      })
      
    })

    res.send(result);
  })
  .catch(erro => console.log(erro));
  }

  else {
    var query = `
              SELECT ?s ?id ?nome ?data ?resultado WHERE {
                ?nome :realiza ?s .
                  ?s :id ?id .
                  ?s :data ?data .
                  ?s :resultado ?resultado .
              }
              `;

  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
  .then(dados => {
    var result = [];

    dados.data.results.bindings.map(bind => {
      emd = bind.s.value.split('#')[1];
      id = bind.id.value;
      nome = bind.nome.value.split('#')[1];
      data = bind.data.value;
      resultado = bind.resultado.value;

      result.push({
        emd: emd,
        id: id,
        nome: nome,
        data: data,
        resultado: resultado
      })
      
    })

    res.send(result);
  })
  .catch(erro => console.log(erro));
  }
  

});

router.get('/api/emd/:id', function(req, res, next) {
  var query = `
                SELECT ?resultado ?id ?data ?nome ?genero ?morada ?email ?federado ?idade ?modalidade ?clube WHERE {
                  :${req.params.id} :resultado ?resultado .
                    :${req.params.id} :id ?id .
                    :${req.params.id} :data ?data .
                        :${req.params.id} :referente ?modalidade .
                  ?nome :realiza :${req.params.id} .
                    ?nome :género ?genero .
                    ?nome :morada ?morada .
                    ?nome :email ?email .
                    ?nome :federado ?federado .
                    ?nome :idade ?idade .
                    ?nome :pertence ?clube .
                }
              `;

  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
  .then(dados => {
    var result = [];

    dados.data.results.bindings.map(bind => {
      género = bind.genero.value;
      id = bind.id.value;
      nome = bind.nome.value.split('#')[1];
      data = bind.data.value;
      resultado = bind.resultado.value;
      morada = bind.morada.value;
      email = bind.email.value;
      federado = bind.federado.value;
      idade = bind.idade.value;
      modalidade = bind.modalidade.value.split('#')[1];
      clube = bind.clube.value.split('#')[1];


      result.push({
        género: género,
        id: id,
        nome: nome,
        data: data,
        resultado: resultado,
        morada: morada,
        email: email,
        federado: federado,
        idade: idade,
        modalidade: modalidade,
        clube: clube
      })
      
    })

    res.send(result);
  })
  .catch(erro => console.log(erro));

});

router.get('/api/modalidades', function(req, res, next) {
  var query = `
                    SELECT DISTINCT ?modalidade WHERE {
                      ?modalidade a :Modalidade .
                  }
              `;

  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
  .then(dados => {
    var result = [];

    dados.data.results.bindings.map(bind => {
      modalidade = bind.modalidade.value.split('#')[1];


      result.push({
        modalidade: modalidade
      })
      
    })

    res.send(result);
  })
  .catch(erro => console.log(erro));

});

router.get('/api/modalidades/:id', function(req, res, next) {
  var query = `
  SELECT ?s WHERE {
    ?s a :EMD .
    ?s :referente :${req.params.id} .
}
              `;

  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
  .then(dados => {
    var result = [];

    dados.data.results.bindings.map(bind => {
      emd = bind.s.value.split('#')[1];


      result.push({
        emd: emd
      })
      
    })

    res.send(result);
  })
  .catch(erro => console.log(erro));

});

router.get('/api/atletas', function(req, res, next) {

  if (req.query.gen)
  {
    var query = `
    SELECT ?s WHERE {
      ?s a :Atleta .
      ?s :género "${req.query.gen}" .
      }
  
  order by (?s) 
              `;

  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
  .then(dados => {
    var result = [];

    dados.data.results.bindings.map(bind => {
      atleta = bind.s.value.split('#')[1];


      result.push({
        atleta: atleta
      })
      
    })

    res.send(result);
  })
  .catch(erro => console.log(erro));

  }

  else if (req.query.clube)
  {
    var query = `
    SELECT ?s WHERE {
      ?s a :Atleta .
      ?s :pertence :${req.query.clube} .
  }
  
  order by (?s) 
              `;

  var encoded = encodeURIComponent(prefixes + query);

  axios.get(getLink + encoded)
  .then(dados => {
    var result = [];

    dados.data.results.bindings.map(bind => {
      atleta = bind.s.value.split('#')[1];


      result.push({
        atleta: atleta
      })
      
    })

    res.send(result);
  })
  .catch(erro => console.log(erro));
}
});
module.exports = router;
