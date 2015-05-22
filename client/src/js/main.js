/*global io:true, $:true, console:true */
'use strict';
var React = require('react');
var MessageCollection = require('./message-collection');

var faye = new Faye.Client('http://localhost:8000/faye');
var messageCollection = new MessageCollection();
window.messages = messageCollection;
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

  var getMessages = function () {
    return $.get('/message', function (data) {
      data = JSON.parse(data);
      data.forEach(messageCollection.append.bind(messageCollection));
      render();
    });
  };

  window.interval = 100;
  var getMessagesInterval = function () {
    getMessages()
    .done(function () {
      setTimeout(getMessagesInterval, window.interval);
    });
  };
  getMessagesInterval();
});

