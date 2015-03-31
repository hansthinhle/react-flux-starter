var React = require('react');
var TodoStore = require('../stores/TodoStore');
var TodoConstant = require('../constants/TodoConstant');
var TodoActionCreators = require('../actions/TodoActionCreators');
var _ = require('underscore');
var TodoItem = require('../components/TodoItem');
var classNames = require('classnames');

var toastr = require('toastr');

var Todo = React.createClass({
  getInitialState: function () {
    return {
      newItem: '',
      hasChange: false,
      isValid: false,
      items: []
    };
  },
  componentWillMount: function () {
    var self = this;
    TodoStore.on(TodoConstant.ITEM_ADDED, function (item) {
      self.setState({newItem: '', hasChange: false, isValid: false});
      toastr.success(item + ' had been add.');
    });
    TodoStore.on(TodoConstant.TODO_CHANGE, function () {
      self.setState({items: TodoStore.getItems()});
      self.forceUpdate();
    });
    TodoStore.on(TodoConstant.ITEM_REMOVED,function(item){
      toastr.success(item + ' had been remove');
    })
  },
  componentDidMount: function () {
    TodoActionCreators.fetchData();
  },
  componentWillUnmount: function() {
    TodoStore.removeAllListeners(TodoConstant.ITEM_ADDED);
    TodoStore.removeAllListeners(TodoConstant.TODO_CHANGE);
    TodoStore.removeAllListeners(TodoConstant.ITEM_REMOVED);
  },
  handleInputChange: function (event) {
    var value = event.target.value;
    var isValid = value.length !== 0;
    this.setState({
      newItem: value,
      hasChange: true,
      isValid: isValid
    });
  },
  addItem: function () {
    TodoActionCreators.addNewItem(this.state.newItem);
  },
  renderItems: function () {
    return _.map(this.state.items, function (item, index) {
      return (
        <TodoItem key={index} item={item}/>
      )
    });
  },
  render: function () {
    var formGroupClass = classNames({
      'form-group': true,
      'has-success' : this.state.hasChange && this.state.isValid,
      'has-error': this.state.hasChange && !this.state.isValid
    });
    return (
      <div className="todo">
        <div className={formGroupClass}>
          <div className="input-group">
            <input type="text" className="form-control" value={this.state.newItem} onChange={this.handleInputChange}></input>
            <span className="input-group-btn">
              <button className="btn btn-primary" type="button" onClick={this.addItem} disabled={!this.state.isValid}>Add</button>
            </span>
          </div>
        </div>
        <ul className="todo-items list-group">
        {this.renderItems()}
        </ul>
      </div>
    );
  }
});

module.exports = Todo;