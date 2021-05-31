var axios = require('axios')
var prefixes = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX noInferences: <http://www.ontotext.com/explicit>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX : <http://prc.di.uminho.pt/2021/myfamily#>
        `

execQuery = async function (query){
    var getLink = "http://localhost:7200/repositories/Ex2?query="
    var encoded = encodeURIComponent(prefixes + query)
    var result = await axios.get(getLink + encoded)
    return result.data
}

execTransaction = async function(query){
    var postLink = "http://localhost:7200/repositories/Ex2/statements"
    var encoded = encodeURIComponent(prefixes + query)
    var response
    try{
        response = await axios.post(postLink, `update=${encoded}`)
        return response.data
    }catch(error){
        throw(error)
    }
}

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



execQuery(query).then( dados => {
     query2 = `INSERT DATA {
        ${dados}
    }`
    execTransaction(query2)
}
)