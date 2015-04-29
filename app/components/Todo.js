var React = require('react');
var _ = require('lodash');
var classNames = require('classnames');
var TodoStore = require('../stores/TodoStore');
var TodoConstant = require('../constants/TodoConstant');
var TodoActionCreators = require('../actions/TodoActionCreators');
var TodoItem = require('../components/TodoItem');
var RevalidatorMixin = require('../utils/RevalidatorMixin');
var Spinner = require('./Spinner');

var Todo = React.createClass({
  mixins: [RevalidatorMixin],
  revalidatorSchema: {
    item: {
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
      isLoading: true,
      isCreating: false,
      item: null,
      items: []
    };
  },
  componentDidMount: function () {
    TodoStore.on(TodoConstant.CHANGE, function (items) {
      this.setState({items: items});
    }.bind(this));

    TodoStore.on(TodoConstant.FETCHED, function (error, response) {
      if (response) {
        this.setState({isLoading: false});
      }
    }.bind(this));

    TodoStore.on(TodoConstant.CREATED, function (error, response) {
      this.setState({isCreating: false});
      if (response) {
        this.setState({item: null});
        this.resetValidation();
      }
    }.bind(this));

    TodoActionCreators.fetch();
  },
  componentWillUnmount: function () {
    TodoStore.removeAllListeners(TodoConstant.CHANGE);
    TodoStore.removeAllListeners(TodoConstant.FETCHED);
    TodoStore.removeAllListeners(TodoConstant.CREATED);
  },
  handleInputChange: function (event) {
    this.setState({
      item: event.target.value
    }, function () {
      this.validate('item');
    });
  },
  addItem: function () {
    this.setState({isCreating: true});
    TodoActionCreators.create({title: this.state.item});
  },
  removeItem: function (item) {
    TodoActionCreators.remove(item.id);
  },
  renderItems: function () {
    return _.map(this.state.items, function (item) {
      return (
        <TodoItem key={item.id} item={item} onRemove={this.removeItem}/>
      )
    }.bind(this));
  },
  render: function () {
    return (
      <div className="todo">
        <div className={this.getFieldClass('item')}>
          <div className="input-group">
            <input type="text" className="form-control"
              value={this.state.item}
              onChange={this.handleInputChange}></input>
            <span className="input-group-btn">
              <button className="btn btn-primary" type="button"
                onClick={this.addItem}
                disabled={!this.isValid() || !this.isDirty() || this.state.isCreating}>
                {this.state.isCreating ? ' Creating..' : ' Create'}
              </button>
            </span>
          </div>
          {this.renderFieldMessages('item')}
        </div>
        <ul className="todo-items list-group">
          {this.renderItems()}
        </ul>
        <Spinner isLoading={this.state.isLoading} isSquares={true}/>
      </div>
    );
  }
});

module.exports = Todo;
