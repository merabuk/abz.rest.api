<template>
  <v-row
    v-if="message"
    class="mt-1"
  >
    <v-col
      cols="11"
      class="text-center"
    >
      <v-card
        class="d-flex pa-2"
        outlined
        tile
      >
        <div>
          {{ message }}
        </div>
      </v-card>
    </v-col>
    <v-col cols="1">
      <v-btn @click="clearMessage"
             color="primary"
             elevation="2"
             icon
             outlined
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    message () {
      return this.$store.state.message
    }
  },
  methods: {
    clearMessage() {
      this.$store.commit('setMessage', '');
    }
  }
}
</script>
