import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { setMoment } from './life/utils'

checkSocial()

function startSocial() {
  var api = 'http://api.instants.xyz/users/around/?lat=' + position.lat + '&lng=' + position.lng;
  $.getJSON(api, function(data) {
     if (data && data.users) {
       var users = Math.abs(Math.round(parseInt(data.users) + Math.random() * 10 - Math.random() * 10));
       $('.user-numbers').text(' 附近約有' + users + '使用者');
     }
  })
  .fail(function() {
  })


  const store = configureStore()
  setMoment()

  render(
    <Root store={store} />,
    document.getElementById('root')
  )

  showMap();
}

function checkSocial() {
  $.ajaxSetup({
    timeout: 3500 // in milliseconds
  });
  $.getJSON('https://www.instants.io/me', function(data) {
    $('.social-in').show()
    startSocial()
  })
  .fail(function(response) {
    if (response.status === 0) {
      $('.social-out').html('<h3 class="center">抱歉，目前此頁面暫時無法使用...</h3>')
    }
    $('.social-out').show()
  });
}

function showMap() {
  var mymap = L.map('map')
    .setView([position.lat, position.lng], 8);

  var circleArg = {
    color: '#2E97CD',
    fillOpacity: 0.5
  };

  /*L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    zoomControl: false
  }).addTo(mymap);*/

  /*L.circle([position.lat, position.lng], 10, {
    color: 'red',
    fillOpacity: 1
  }).addTo(mymap);*/

  var googleStreet =  new L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  }).addTo(mymap);


  var circle = L.circle([position.lat, position.lng], 5000, circleArg).addTo(mymap);
  //mymap.fitBounds(circle.getBounds());

  $('#map').mouseenter(function() {
    mymap.invalidateSize();
  });

  $('#map').mouseout(function() {
    setTimeout(function() {
      mymap.invalidateSize();
    }, 200);
  });

}
