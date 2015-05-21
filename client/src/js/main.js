/*global io:true, $:true, console:true */
'use strict';
var React = require('react');

var faye = new Faye.Client('http://localhost:8000/faye');
var messageCollection = [];
var ChatView = require('./views/chat-view');

var userName = prompt('Pick a username');

$(document).ready(function () {

  var render = function () {
    React.render(
      <ChatView
        messageCollection={ messageCollection }
        faye={ faye } userName={ userName }
      />,
      document.getElementById('container')
    );
  };

  faye.subscribe('/message/new', function (message) {
    messageCollection.push(message);
    render();
  });

  $.get('/message', function (data) {
    data = JSON.parse(data);
    messageCollection = messageCollection.concat(data);
   render();
  });

})

