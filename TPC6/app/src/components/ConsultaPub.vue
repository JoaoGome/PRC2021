<template>
  <div class="w3-container">
    <h3 class="w3-header w3-blue">Pub {{idPub}}</h3>
    <b>Autores</b>
    <ul v-for="autor in dados.autores" :key="autor">
        <li>{{autor}}</li>
    </ul>
    <p><b>Titulo: </b> {{dados.title}}</p>
    <p><b>Tipo: </b> {{dados.type}}</p>
    <p><b>Address: </b> {{dados.address}}</p>
    <p><b>BookTitle: </b> {{dados.booktitle}}</p>
    <p><b>Doi: </b> {{dados.doi}}</p>
    <p><b>Month: </b> {{dados.month}}</p>
    <p><b>Year: </b> {{dados.year}}</p>

    
  </div> 
</template>
<script>
import axios from 'axios';

  export default {
    name: 'Pub',

    props: ["idPub"],

    data() {
      return {
            dados: null,
        };
    },

    created: function() {
      axios
        .get('http://localhost:8080/teste/pubs/' + this.idPub)
        .then(res => {
          this.dados = res.data;
        })
    }
  }
</script>
<style>
</style>