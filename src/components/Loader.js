import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'spin';

class Loader extends React.Component {

  componentDidMount() {
    const {config, color} = this.props;
    const spinnerConfig = {
      color,
      //config overrides all other properties
      ...config
    };

    this.spinner = new Spinner(spinnerConfig);
    this.spinner.spin(this.refs.container);
  }

  componentWillUnmount() {
    this.spinner.stop();
  }

  render() {
    return <div ref="container" className="loader-center"/>
  }
}

Loader.defaultProps = {
  config: {
    lines: 14,
    length: 45,
    width: 22,
    radius: 50,
    scale: 1,
    corners: 1,
    opacity: 0.25,
    rotate: 0,
    direction: 1,
    speed: 1,
    trail: 60,
    fadeColor: "transparent",
    top: 100,
    left: 100,
    shadow: "none"
  },
  color: "#f1f0f3",
};

Loader.propTypes = {
  config: PropTypes.object,
  color: PropTypes.string,
};

export default Loader

