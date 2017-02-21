var vue = new Vue({
  http: {
    root: '/'
  },
  el: '#clients',
  data: {
    client: { __v: '', firstname: '', lastname: '',  latitude: '', longitude: '', _id:'' },
    clients: [],
    n: clients.length
  },
  created: function () {
    this.fetchClients();
  },
  methods: {
    fetchClients: function () {
      this.$http.get('/client').then(function (response) {
        this.clients = response.body;
        this.n = this.clients.length;
        window.DisplayNClients();
      });
    },
    createClient: function () {
      this.$http.post('/client', this.client).then(function (response) {
        this.clients.push(response.body);
        this.n = this.clients.length + 1;
        window.DisplayNClients();
      });
    },
    updateClient: function () {
      this.$http.put('/client', this.client).then(function (response) { 
        this.fetchClients();
        window.DisplayNClients();
      });
    },
    deleteClient: function (index) {
      this.$http.delete('/client/' + this.clients[index]._id).then(function (response) {
        this.clients.splice(index, 1);
        this.n = this.clients.length - 1;
        window.DisplayNClients();
      });
    }
  }
});

function DisplayNClients(){
  $('#nClients').text('Clients : '+vue.n);
}

$(document).ready(function(){
  $(document).on('click', 'button.update', function(){
    $('._id').val(window.vue.clients[$(this).parent().parent().find('td.index-to-update').text()]._id);
    $('.firstname').val(window.vue.clients[$(this).parent().parent().find('td.index-to-update').text()].firstname);
    $('.lastname').val(window.vue.clients[$(this).parent().parent().find('td.index-to-update').text()].lastname);
    $('.latitude').val(window.vue.clients[$(this).parent().parent().find('td.index-to-update').text()].latitude);
    $('.longitude').val(window.vue.clients[$(this).parent().parent().find('td.index-to-update').text()].longitude);
  });

  $(document).on('click', 'button.btn-update', function(){
    window.vue.client._id = $('._id').val();
    window.vue.client.firstname = $('.firstname').val();
    window.vue.client.lastname = $('.lastname').val();
    window.vue.client.latitude = $('.latitude').val();
    window.vue.client.longitude = $('.longitude').val();
    window.vue.updateClient();
    $('.modal-update').modal('toggle');
  });

  $(document).on('click', 'button.map', function(){
    var map = new GMaps({
      el: '#map',
      lat: parseInt($(this).parent().parent().find('td.latitude').text()),
      lng: parseInt($(this).parent().parent().find('td.longitude').text())
    });
  });

});