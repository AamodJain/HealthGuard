import React from 'react';
import PropTypes from 'prop-types';
import './LinearGradient.css';

const LinearGradient = ({ data }) => {
  return (
    <div>
      <div className="linear-box display-flex">
        <span>{data.min}</span>
        <span className="fill"></span>
        <span>{data.max}</span>
      </div>
      <div
        className="linear-box gradient-bar mt8"
        style={{
          backgroundImage: `linear-gradient(to right, ${data.fromColor}, ${data.toColor})`
        }}
      ></div>
    </div>
  );
};

LinearGradient.propTypes = {
  data: PropTypes.shape({
    fromColor: PropTypes.string.isRequired,
    toColor: PropTypes.string.isRequired,
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }).isRequired
};

export default LinearGradient;
