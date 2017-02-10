new Vue({
  http: {
    root: '/'
  },
  el: '#clients',
  data: {
    client: { __v: '', firstname: '', lastname: '',  latitude: '', longitude: '', _id:'' },
    clients: []
  },
  created: function () {
    this.fetchClients();
  },
  methods: {
    fetchClients: function () {
      console.log('fetchClients');
      this.$http.get('/client').then(function (response) {
        this.clients = response.body;
      });
    },
    createClient: function () {
      this.$http.post('/client', this.client).then(function (response) {
        this.clients.push(response.body);
      });
    },
    updateClient: function (index) {
      this.$http.put('/client', this.client).then(function (response) {
        this.client.splice(index, 1);
      })
    },
    deleteTodo: function (index) {
      this.$http.delete('/client/' + this.clients[index]._id).then(function (response) {
        this.clients.splice(index, 1);
      });
    }
  }
});