'use strict';
var React = require('react');
var MessageCollectionView = require('./message-collection-view');
var NewMessageFormView = require('./new-message-form-view');
var IntervalPicker = require('./interval-picker');

var ChatView = React.createClass({
  render: function () {
    return (
      <div>
        <IntervalPicker />
        <NewMessageFormView faye={ this.props.faye } userName={ this.props.userName }/>
        <MessageCollectionView messageCollection={ this.props.messageCollection }/>
      </div>
    );
  }
});

module.exports = ChatView;
