<template>
  <div class="w3-container">
    <h3>Publicações do Autor {{idAut}}:</h3>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>Id</th>
          <th>Título</th>
          <th>Ano</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in dados" v-bind:key="p.id"> 
          <td>{{p.id}}</td>
          <td>{{p.title}}</td>
          <td>{{p.year}}</td>
          <td>{{p.type}}</td>
        </tr>
      </tbody>
    </table> 
  </div> 
</template>
<script>
import axios from 'axios';

  export default {
    name: 'Autor',

    props: ["idAut"],

    data() {
      return {
            dados: null,
        };
    },

    created: function() {
      axios
        .get('http://localhost:8080/teste/autores/' + this.idAut)
        .then(res => {
          this.dados = res.data;
        })
    }
  }
</script>
<style>
</style>