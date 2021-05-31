import json

with open('emd.json') as f:
    data = json.load(f)

for c in data:
    content = f'''

###  http://www.prc.di.uminho.pt/2021/TestePRC2021#{c["nome"]["primeiro"]}_{c["nome"]["último"]}
:{c["nome"]["primeiro"]}_{c["nome"]["último"]} rdf:type owl:NamedIndividual ,
                        :Atleta ;
               :pertence :{c["clube"].replace(' ','_')} ;
               :pratica :{c["modalidade"].replace(' ','_')} ;
               :realiza :{c["_id"]} ;
               :email "{c["email"].replace(' ','_')}" ;
               :federado "{c["federado"]}" ;
               :género "{c["género"]}" ;
               :idade {c["idade"]} ;
               :morada "{c["morada"].replace(' ','_')}" .


###  http://www.prc.di.uminho.pt/2021/TestePRC2021#{c["modalidade"].replace(' ','_')}
:{c["modalidade"].replace(' ','_')} rdf:type owl:NamedIndividual ,
                  :Modalidade .


###  http://www.prc.di.uminho.pt/2021/TestePRC2021#{c["clube"].replace(' ','_')}
:{c["clube"].replace(' ','_')} rdf:type owl:NamedIndividual ,
                 :Clube .


###  http://www.prc.di.uminho.pt/2021/TestePRC2021#{c["_id"]}
<http://www.prc.di.uminho.pt/2021/TestePRC2021#{c["_id"]}> rdf:type owl:NamedIndividual ,
                                                                                  :EMD ;
                                                                         :referente :{c["modalidade"].replace(' ','_')} ;
                                                                         :data "{c["dataEMD"]}" ;
                                                                         :id {c["index"]} ;
                                                                         :resultado "{c["resultado"]}" .
'''

    print(content)