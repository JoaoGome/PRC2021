<template>
  <div class="w3-container">
    <h3>Publicações:</h3>
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
        <tr v-for="p in pubs" v-bind:key="p.id" @click="goPub(p.id)"> 
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
    name: 'Pubs',

    data() {
      return {
            pubs: null,
        };
    },

    created: function() {
      axios
        .get('http://localhost:8080/teste/pubs')
        .then(res => {
          this.pubs = res.data;
        })
    },
    
    methods: {
        goPub: function(id){
            this.$router.push('/pubs/' + id);
        }
    }
  }
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
</style>