<template>
  <ConsultaAut :idAut="$route.params.idAut"/>
</template>

<script>
import ConsultaAut from "@/components/ConsultaAut.vue";

export default {
  components: {
    ConsultaAut
  }
};
</script>
