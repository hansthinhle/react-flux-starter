var React = require('react');
var TodoActionCreators = require('../actions/TodoActionCreators');

var TodoItem = React.createClass({
  remove: function () {
    TodoActionCreators.removeItem(this.props.item);
  },
  render: function () {
    return (
      <li className="list-group-item">
      {this.props.item}
        <button className="btn btn-link text-danger" onClick={this.remove}>
          <i className="glyphicon glyphicon-trash"></i>
        </button>
      </li>
    );
  }
});

module.exports = TodoItem;