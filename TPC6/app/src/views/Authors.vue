<template>
  <div class="w3-container">
    <h3>Autores:</h3>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name </th>
          <th>Numero de Pubs</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="autor in autores" v-bind:key="autor.id"> 
          <td>{{autor.id}}</td>
          <td>{{autor.nome}}</td>
          <td @click="goAut(autor.id)">{{autor.npubs}}</td>
        </tr>
      </tbody>
    </table> 
  </div> 
</template>
<script>
import axios from 'axios';


  export default {
    name: 'Authors',

    data() {
      return {
            autores: null,
        };
    },

    created: function() {
      axios
        .get('http://localhost:8080/teste/autores')
        .then(res => {
          this.autores = res.data;
        })
        .catch(this.r = 'error' )
    },
    methods: {
        goAut: function(id){
            this.$router.push('/author/' + id);
        }
    }
  }
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
</style>