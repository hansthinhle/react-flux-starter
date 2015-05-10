'use strict';

var React = require('react');
var ObjectPath = require('object-path');
var Revalidator = require('revalidator');
var ClassNames = require('classnames');
var has = require('lodash/object/has');
var Result = require('lodash/object/result');
var isObject = require('lodash/lang/isObject');
var isEmpty = require('lodash/lang/isEmpty');
var find = require('lodash/collection/find');
var isUndefined = require('lodash/lang/isUndefined');

function parseProperty(propertyValue) {
  var object = {
    isValid: false,
    isDirty: false,
    errors: []
  };
  var objectModel = ObjectPath(object);
  if (has(propertyValue, 'properties')) {
    for (var property in propertyValue.properties) {
      objectModel.set(property, parseProperty(propertyValue.properties[property]));
    }
  }
  if (propertyValue.type === 'array' && has(propertyValue, 'items')) {
    var max = ObjectPath.get(propertyValue, 'maxItems', 100);
    for (var i = 0; i < max; i++) {
      objectModel.set(i, parseProperty(propertyValue.items));
    }
  }
  return object;
}

var RevalidatorMixin = {
  getInitialState: function () {
    return {
      Revalidator: {
        isValid: false,
        isDirty: false,
        errors: []
      }
    };
  },
  resetValidation: function () {
    var schema = Result(this, 'revalidatorSchema') || {};
    var revalidator = this.state.Revalidator;
    var revalidatorModel = ObjectPath(revalidator);
    revalidatorModel.set('isValid', false);
    revalidatorModel.set('isDirty', false);
    for (var property in schema) {
      //noinspection JSUnfilteredForInLoop,JSUnresolvedFunction
      revalidatorModel.set(property, parseProperty(schema[property]));
    }
    this.setState({Revalidator: revalidator});
  },
  componentWillMount: function () {
    if (!isObject(this.revalidatorSchema)) {
      throw Error('invalid `revalidatorSchema` type');
    }
    this.resetValidation();
  },
  processDirty: function (property) {
    var revalidator = this.state.Revalidator;
    var revalidatorModel = ObjectPath(revalidator);
    revalidatorModel.set('isDirty', true);
    if (property) {
      revalidatorModel.set(property + '.isDirty', true);
      this.setState({Revalidator: revalidator});

      var propertyArray = property.split('.');
      if (propertyArray.length > 1) {
        propertyArray.splice(-1, 1);
        this.processDirty(propertyArray.join('.'));
      }
    }
  },
  validateNested: function (object, schema, path) {
    path = path || '';
    var revalidator = this.state.Revalidator;
    var revalidatorModel = ObjectPath(revalidator);
    var objectModel = ObjectPath(object);
    var subObject;
    var subSchema;
    var subPath;

    if (has(schema, 'properties')) {
      var result = Revalidator.validate(object, schema);

      if (isEmpty(path)) {
        revalidatorModel.set('isValid', result.valid);
        revalidatorModel.set('errors', result.errors);
      } else {
        revalidatorModel.set(path + '.isValid', result.valid);
        revalidatorModel.set(path + '.errors', result.errors);
      }

      for (var schemaProperty in schema.properties) {
        var p1 = isEmpty(path) ? schemaProperty : (path + '.' + schemaProperty);
        revalidatorModel.set(p1 + '.isValid', true);
        revalidatorModel.set(p1 + '.errors', []);
      }

      result.errors.forEach(function (error) {
        var errorPropertyArray = error.property.split('.');
        if (errorPropertyArray.length === 1) {
          var p2 = isEmpty(path) ? error.property : (path + '.' + error.property);
          var isDirty = revalidatorModel.get(p2 + '.isDirty', false);
          if (isDirty) {
            revalidatorModel.set(p2 + '.isValid', false);
            var errors = revalidatorModel.get(p2 + '.errors', []);
            var r = find(errors, function (er) {
              return er.property === error.property;
            });
            if (isUndefined(r)) {
              revalidatorModel.push(p2 + '.errors', error);
            }
          }
        }
      });

      this.setState({Revalidator: revalidator});

      for (var property in schema.properties) {
        subObject = objectModel.get(property, {});
        subSchema = schema.properties[property];
        subPath = isEmpty(path) ? property : (path + '.' + property);
        this.validateNested(subObject, subSchema, subPath);
      }
    }

    if (has(schema, 'items')) {
      var max = ObjectPath.get(schema, 'maxItems', 100);
      for (var i = 0; i < max; i++) {
        subObject = objectModel.get(i, {});
        subSchema = schema.items;
        subPath = isEmpty(path) ? i : (path + '.' + i);
        this.validateNested(subObject, subSchema, subPath);
      }
    }
  },
  validate: function (property) {
    this.processDirty(property);
    var schema = Result(this, 'revalidatorSchema') || {};
    this.validateNested(this.state, {properties: schema});
  },
  handleValidation: function (property) {
    return function (event) {
      event.preventDefault();
      this.validate(property);
    }.bind(this);
  },
  getErrors: function (property) {
    var revalidator = this.state.Revalidator;
    var revalidatorModel = ObjectPath(revalidator);
    if (property) {
      return revalidatorModel.get(property + '.errors', []);
    }
    return revalidator.errors;
  },
  isValid: function (property) {
    var revalidator = this.state.Revalidator;
    var revalidatorModel = ObjectPath(revalidator);
    if (property) {
      return revalidatorModel.get(property + '.isValid', false);
    }
    return revalidator.isValid;
  },
  isDirty: function (property) {
    var revalidator = this.state.Revalidator;
    var revalidatorModel = ObjectPath(revalidator);
    if (property) {
      return revalidatorModel.get(property + '.isDirty', false);
    }
    return revalidator.isDirty;
  },
  getFieldClass: function (field) {
    return ClassNames({
      'form-group': true,
      'has-success': this.isValid(field) && this.isDirty(field),
      'has-error': !this.isValid(field) && this.isDirty(field)
    });
  },
  renderFieldMessages: function (property) {
    var errors = this.getErrors(property);
    if (errors.length !== 0) {
      var html = errors.map(function (error) {
        return (<span key={error.property}>{error.message}</span>);
      });
      return (<div className='help-block'>{html}</div>);
    }
    return null;
  }
};

module.exports = RevalidatorMixin;
