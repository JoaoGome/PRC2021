const fs = require('fs')

fs.readFile('./dataset.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    var content = JSON.parse(jsonString);
    var cidades = content.cidades; var ligações = content.ligações;
    var mapIdName = [];
    
    for (i = 0; i < cidades.length; i++)
    {
        nome = cidades[i].nome.replace(/ /g,'_');
        console.log('###  http://www.di.uminho.pt/prc2021/tpc8#' + nome);
        console.log(':' + nome + ' rdf:type owl:NamedIndividual ,');
        console.log(':cidade ;');
        console.log(':descrição "' + cidades[i].descrição + '" ;');
        console.log(':distrito "' + cidades[i].distrito + '" ;');
        console.log(':id "' + cidades[i].id + '" ;');
        console.log(':população ' + cidades[i].população + ' .');
        console.log('\n');
        mapIdName.push(
            {
                "id": cidades[i].id,
                "nome": nome
            }
        )
    }

    for (i = 0; i < ligações.length; i++)
    {
        console.log('###  http://www.di.uminho.pt/prc2021/tpc8#' + ligações[i].id);
        console.log(':' + ligações[i].id + ' rdf:type owl:NamedIndividual ,');
        console.log(':ligação ;');
        var nomeOrigem = "";
        var nomeDestino = "";

        for (j = 0; j < mapIdName.length; j++)
        {
            if (mapIdName[j].id === ligações[i].origem)
                nomeOrigem = mapIdName[j].nome;
        }
            
        
        for (k = 0; k < mapIdName.length; k++)
        {
            if (mapIdName[k].id === ligações[i].destino)
                nomeDestino = mapIdName[k].nome;
        }
            
        console.log(':temOrigem :' + nomeOrigem + ' ;');
        console.log(':temDestino :' + nomeDestino + ' ;');
        console.log(':id "' + ligações[i].id + '" ;');
        console.log(':distância ' + ligações[i].distância + ' .');
        console.log('\n');
    }

})