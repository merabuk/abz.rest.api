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
        <v-col
          cols="12"
          class="d-flex"
        >
          <v-card
            class="d-flex pa-2"
            outlined
            tile
          >Positions</v-card>
          <v-spacer></v-spacer>
          <v-btn @click="refresh">Fetch Data</v-btn>
        </v-col>
        <v-row>
          <v-col cols="12">
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
                </tr>
                </thead>
                <tbody>
                <tr
                  v-for="item in positions"
                  :key="item.id"
                >
                  <td>{{ item.id }}</td>
                  <td class="text-left">{{ item.name }}</td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import InfoMessage from '../components/InfoMessage'
export default {
  name: 'Position',
  comments: { InfoMessage },
  async fetch() {
    await this.$api.$get('api/v1/positions')
      .then(res => {
        this.setMessage('');
        this.setPositions(res.positions);
      })
      .catch(err => {
        this.setMessage(err.response.data.message);
      });
  },
  computed: {
    positions () {
      return this.$store.state.positions.positions
    }
  },
  methods: {
    setPositions (positions) {
      this.$store.commit('positions/setPositions', positions)
    },
    setMessage (message) {
      this.$store.commit('setMessage', message)
    },
    refresh() {
      this.$fetch();
    },
  },
  watch: {
    '$route.query': '$fetch'
  },
}
</script>
