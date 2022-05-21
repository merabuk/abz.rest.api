<template>
  <v-row>
    <info-message></info-message>
    <v-row
      v-if="!$store.state.message"
      class="mt-1"
    >
    <v-col
      cols="2"
    >
      <v-text-field
        :value="user.id"
        label="Id"
        readonly
      ></v-text-field>
    </v-col>
    <v-col
      cols="10"
    >
      <v-text-field
        :value="user.name"
        label="Name"
        readonly
      ></v-text-field>
    </v-col>
    <v-col
      cols="10"
    >
      <v-text-field
        :value="user.email"
        label="Email"
        readonly
      ></v-text-field>
      <v-text-field
        :value="user.phone"
        label="Phone"
        readonly
      ></v-text-field>
    </v-col>
    <v-col
      cols="2"
    >
      <v-text-field
        :value="user.photo"
        label="Photo"
        readonly
      ></v-text-field>
    </v-col>
    <v-col
      cols="10"
    >
      <v-text-field
        :value="user.position"
        label="Position"
        readonly
      ></v-text-field>
    </v-col>
    <v-col
      cols="2"
    >
      <v-text-field
        :value="user.position_id"
        label="Position Id"
        readonly
      ></v-text-field>
    </v-col>
  </v-row>
  </v-row>
</template>

<script>
import InfoMessage from '../../components/InfoMessage'
export default {
  name: 'User',
  comments: { InfoMessage },
  data() {
    return {
      user: {}
    }
  },
  created () {
    this.getUsersById()
  },
  methods: {
    async getUsersById () {
      await this.$api.$get(`api/v1/users/${this.$route.params.id}`)
        .then(res => {
          this.setMessage('');
          this.user = res.user;
        })
        .catch(err => {
          this.setMessage(err.response.data.message)
        });
    },
    setMessage (message) {
      this.$store.commit('setMessage', message)
    }
  }
}
</script>
