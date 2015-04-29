var React = require('react');
var ClassNames = require('classnames');
var spinnerImage = require('../assets/images/ajax-loader.gif');
var spinnerSquaresImage = require('../assets/images/ajax-loader-squares.gif');
require('../assets/styles/spinner.scss');

var Spinner = React.createClass({
  propTypes: {
    isLoading: React.PropTypes.bool,
    fullScreen: React.PropTypes.bool,
    isSquares: React.PropTypes.bool
  },
  getDefaultProps: function () {
    return {
      isLoading: false,
      fullScreen: false
    };
  },
  render: function () {
    var className = ClassNames('spinner', {
      'hidden': !this.props.isLoading,
      'full-screen': this.props.fullScreen
    });
    var image = this.props.isSquares ? spinnerSquaresImage : spinnerImage;
    return (
      <div className={className}>
        <img src={image}/>
      </div>
    );
  }

});

module.exports = Spinner;
