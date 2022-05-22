<template>
  <v-row>
    <v-col
      cols="12"
      class="text-center"
    >
      <info-message></info-message>
      <v-row
        v-if="!$store.state.message"
        class="mt-1"
      >
        <v-row>
          <v-col cols="2">
            <v-text-field
              v-model="perPage"
              label="Users per Page"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="page"
              label="Page number"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="offset"
              label="Offset"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            class="d-flex justify-space-around"
          >
            <v-btn
              @click="showMore"
              color="primary"
            >Show More</v-btn>
            <v-btn
              @click="refresh"
              color="info"
            >Fetch Data</v-btn>
            <v-btn
              to="users/create"
              color="success"
            >Create</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-center">
                  Id
                </th>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Email
                </th>
                <th class="text-left">
                  Phone
                </th>
                <th class="text-left">
                  Position
                </th>
                <th class="text-left">
                  Position Id
                </th>
                <th class="text-left">
                  Registered
                </th>
                <th class="text-left">
                  Photo
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                v-for="item in users"
                :key="item.id"
                @click="$router.push(`/users/${item.id}`)"
              >
                <td>{{ item.id }}</td>
                <td class="text-left">{{ item.name }}</td>
                <td class="text-left">{{ item.email }}</td>
                <td class="text-left">{{ item.phone }}</td>
                <td class="text-left">{{ item.position }}</td>
                <td class="text-left">{{ item.position_id }}</td>
                <td class="text-left">{{ item.registration_timestamp }}</td>
                <td class="text-left">
                  <v-img
                    max-height="70"
                    max-width="70"
                    :src="item.photo"
                    alt="AVA"
                  ></v-img>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-row>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import InfoMessage from '../../components/InfoMessage'
export default {
  name: 'Users',
  data: () => ({
      perPage: 5,
      page: 1,
      offset: 0,
  }),
  async fetch() {
    await this.$api.$get('api/v1/users'+ this.urlQueryParam)
      .then(res => {
        this.setMessage('');
        this.setUsers(res.users);
      })
      .catch(err => {
        this.setMessage(err.response.data.message);
      });
  },
  computed: {
    users () {
      return this.$store.state.users.users
    },
    urlQueryParam () {
      let queryParams = '?count=' + this.perPage + '&page=' + this.page + '&offset=' + this.offset;
      return queryParams;
    }
  },
  methods: {
    setUsers (positions) {
      this.$store.commit('users/setUsers', positions)
    },
    setMessage (message) {
      this.$store.commit('setMessage', message)
    },
    refresh () {
      this.$fetch();
    },
    showMore () {
      if (
        this.perPage === 6
      ) {
        this.page++;
      }
      this.perPage = 6;

      this.refresh();
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
}
</script>
