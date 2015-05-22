'use strict';
var React = require('react');

var IntervalPicker = React.createClass({
  handleChange: function (event) {
    window.interval = event.target.value;
  },
  render: function () {
    return (
      <div className ='interval-picker'>
        <p>Enter Interval</p>
        <input type="text" value={window.interval} onChange={this.handleChange}/>
      </div>
    );
  }
});

module.exports = IntervalPicker;
