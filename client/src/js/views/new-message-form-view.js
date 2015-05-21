'use strict';
var React = require('react');

var NewMessageFormView = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },
  handleChange: function () {
    this.setState({value: event.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var text = this.state.value;
    this.props.faye.publish('/message/add', {
      message: text,
      userName: this.props.userName,
      created: (new Date()).getTime()
    });
    this.state.value = '';
  },
  render: function () {
    var value = this.state.value;
    return (
      <form id='message-form' onSubmit={ this.handleSubmit }>
        <div class="form-group">
          <input type='submit' className="btn btn-default" />
          <input type='text' className="form-control" value={value} onChange={this.handleChange} placeholder='Your Message Here' />
        </div>
      </form>
    );
  }
});

module.exports = NewMessageFormView;
