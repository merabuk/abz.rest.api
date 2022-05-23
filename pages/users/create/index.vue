<template>
  <v-row>
    <info-message></info-message>
    <v-col cols="12">
      <v-row class="mt-1">
      <v-col cols="11">
        <v-text-field
          v-model="user.name"
          label="Name"
          :error-messages="errors.name"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="getToken"
              icon
              large
              outlined
              :color="btnColorToken"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-shield-key</v-icon>
            </v-btn>
          </template>
          <span>Get JWT token</span>
        </v-tooltip>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="user.email"
          label="Email"
          :error-messages="errors.email"
        ></v-text-field>
        <v-text-field
          v-model="user.phone"
          label="Phone"
          :error-messages="errors.phone"
        ></v-text-field>
        <v-select
          v-model="user.positionId"
          :items="positions"
          :error-messages="errors.position_id"
          item-text="name"
          item-value="id"
          prepend-icon="mdi-badge-account"
          label="Position"
        ></v-select>
        <v-file-input
          v-model="user.photo"
          :error-messages="errors.photo"
          label="Photo"
          prepend-icon="mdi-camera"
          accept="image/*"
          truncate-length="50"
          show-size
        ></v-file-input>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-btn to="/users">BACK</v-btn>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="saveUser"
                icon
                large
                outlined
                :color="btnColorSave"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </template>
            <span>Save User</span>
          </v-tooltip>
        </v-row>
      </v-col>
    </v-row>
    </v-col>
  </v-row>
</template>

<script>
import InfoMessage from '../../../components/InfoMessage'
export default {
  name: 'User',
  comments: { InfoMessage },
  data() {
    return {
      token: '',
      btnColorToken: 'grey',
      user: {
        name: '',
        email: '',
        phone: '',
        positionId: '',
        photo: null,
      },
      errors: {
        name: '',
        email: '',
        phone: '',
        position_id: '',
        photo: '',
      }
    }
  },
  computed: {
    positions () {
      return this.$store.state.positions.positions
    },
    btnColorSave () {
      return (
        this.btnColorToken == 'success'
        &&this.token
        && this.user.name
        && this.user.email
        && this.user.phone
        && this.user.positionId
        && this.user.photo !== null
      ) ? 'success' : 'grey';
    }
  },
  created() {
    if (!this.positions.length) {
      this.getPositions()
    } else {
      this.setMessage('');
    }
  },
  methods: {
    async getPositions () {
      await this.$api.$get('api/v1/positions')
        .then(res => {
          this.setMessage('');
          this.setPositions(res.positions);
        })
        .catch(err => {
          this.setMessage(err.response.data.message);
        });
    },
    async getToken () {
      await this.$api.$get(`api/v1/token`)
        .then(res => {
          this.token = res.token;
          this.btnColorToken = 'success';
        })
        .catch(err => {
          this.setMessage(err.response.data.message);
        });
    },
    async saveUser () {
      this.setMessage('');
      let formData = new FormData();
      formData.append('name', this.user.name);
      formData.append('email', this.user.email);
      formData.append('phone', this.user.phone);
      formData.append('position_id', this.user.positionId);
      formData.append('photo', this.user.photo);
      await this.$api.$post(`api/v1/users`,
        formData,
        {
        headers: {
          'Authorization': 'Bearer ' + this.token,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          this.setMessage(res.user_id + ' ' + res.message);
          this.errors = {};
        })
        .catch(err => {
          if (err.response.data.fails) {
            this.errors = err.response.data.fails;
          }
          this.setMessage(err.response.data.message);
        });
      this.btnColorToken = 'grey';
    },
    setPositions (positions) {
      this.$store.commit('positions/setPositions', positions)
    },
    setMessage (message) {
      this.$store.commit('setMessage', message)
    }
  }
}
</script>
