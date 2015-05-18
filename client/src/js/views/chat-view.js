'use strict';
var React = require('react');
var MessageCollectionView = require('./message-collection-view');
var NewMessageFormView = require('./new-message-form-view');

var ChatView = React.createClass({
  render: function () {
    return (
      <div>
        <NewMessageFormView faye={ this.props.faye } userName={ this.props.userName }/>
        <MessageCollectionView messageCollection={ this.props.messageCollection }/>
      </div>
    );
  }
});

module.exports = ChatView;
