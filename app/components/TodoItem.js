var React = require('react');
var TodoActionCreators = require('../actions/TodoActionCreators');

var TodoItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired,
    onRemove: React.PropTypes.func.isRequired
  },
  remove: function () {
    this.props.onRemove(this.props.item);
  },
  render: function () {
    return (
      <li className="list-group-item">
        {this.props.item.title}
        <button className="btn btn-link text-danger" onClick={this.remove}>
          <i className="glyphicon glyphicon-trash"></i>
        </button>
      </li>
    );
  }
});

module.exports = TodoItem;
