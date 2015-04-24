var React = require('react');
var TodoStore = require('../stores/TodoStore');
var TodoConstant = require('../constants/TodoConstant');
var TodoActionCreators = require('../actions/TodoActionCreators');
var _ = require('lodash');
var TodoItem = require('../components/TodoItem');
var classNames = require('classnames');
var NotifyActionCreator = require('../actions/NotifyActionCreator');
var RevalidatorMixin = require('../utils/RevalidatorMixin');

var Todo = React.createClass({
  mixins: [RevalidatorMixin],
  revalidatorSchema: {
    newItem: {
      type: 'string',
      required: true,
      allowEmpty: false,
      messages: {
        allowEmpty: 'New item must not be empty'
      }
    }
  },
  getInitialState: function () {
    return {
      newItem: '',
      items: []
    };
  },
  componentWillMount: function () {
    var self = this;
    TodoStore.on(TodoConstant.ITEM_ADDED, function (item) {
      NotifyActionCreator.success(item + ' had been add.');
      self.resetValidation();
      self.setState({newItem: ''});
    });
    TodoStore.on(TodoConstant.TODO_CHANGE, function () {
      self.setState({items: TodoStore.getItems()});
    });
    TodoStore.on(TodoConstant.ITEM_REMOVED, function (item) {
      NotifyActionCreator.success(item + ' had been remove');
    })
  },
  componentDidMount: function () {
    TodoActionCreators.fetchData();
  },
  componentWillUnmount: function () {
    TodoStore.removeAllListeners(TodoConstant.ITEM_ADDED);
    TodoStore.removeAllListeners(TodoConstant.TODO_CHANGE);
    TodoStore.removeAllListeners(TodoConstant.ITEM_REMOVED);
  },
  handleInputChange: function (event) {
    this.setState({
      newItem: event.target.value
    }, function(){
      this.validate('newItem');
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
  renderFieldMessages: function (property) {
    var errors = this.getErrors(property);
    if (errors.length != 0) {
      var html = errors.map(function (error) {
        return (<span key={error.property}>{error.message}</span>);
      });
      return (<div className="help-block">{html}</div>);
    }
    return null;
  },
  render: function () {
    var formGroupClass = classNames({
      'form-group': true,
      'has-success': this.isValid('newItem') && this.isDirty('newItem'),
      'has-error': !this.isValid('newItem') && this.isDirty('newItem')
    });
    return (
      <div className="todo">
        <div className={formGroupClass}>
          <div className="input-group">
            <input type="text" className="form-control"
              value={this.state.newItem}
              onChange={this.handleInputChange}></input>
            <span className="input-group-btn">
              <button className="btn btn-primary" type="button"
                onClick={this.addItem}
                disabled={!this.isValid() || !this.isDirty()}>Add
              </button>
            </span>
          </div>
          {this.renderFieldMessages('newItem')}
        </div>
        <ul className="todo-items list-group">
          {this.renderItems()}
        </ul>
      </div>
    );
  }
});

module.exports = Todo;
