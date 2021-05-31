axios = require('axios');

repoID = "Ex2";

var getLink = "http://localhost:7200/repositories/" + repoID + "?query=" ;
var prefixes = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX noInferences: <http://www.ontotext.com/explicit>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX : <http://prc.di.uminho.pt/2021/myfamily#>
`

// usando a query construct da segunda alinea -- Constrói os triplos da relação Bisavô

var query = `
              CONSTRUCT {
                ?c1 :bisavo ?c2 .
            }
            WHERE
            {
                ?c2 :temProgenitor ?c3 .
                ?c3 :temProgenitor ?c4.
                ?c4 :temProgenitor ?c1 .
            }
              `;

var encoded = encodeURIComponent(prefixes + query);

axios.get(getLink + encoded)
.then(dados => {

    var query2 = `
                INSERT DATA {
                    ${dados}
                }
    `
    var postLink = "http://localhost:7200/repositories/Ex2/statements"
    var encoded2 = encodeURIComponent(prefixes + query2);
    axios.post(postLink, `update=${encoded2}`)
        .then(dados2 => {
            console.log("Good"); 
    })
    .catch(erro => console.log(erro))

})
.catch(erro => console.log(erro));
              