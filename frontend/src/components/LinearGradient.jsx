import React from 'react';
import PropTypes from 'prop-types';
import './LinearGradient.css'; // Ensure you create this CSS file

const LinearGradient = ({ data }) => {
  return (
    <div className="gradient-container">
      {/* Label row: min — spacer — max */}
      <div className="linear-box">
        <span className="gradient-label">{data.min}</span>
        <span className="fill"></span>
        <span className="gradient-label">{data.max}</span>
      </div>

      {/* Actual gradient bar */}
      <div
        className="gradient-bar"
        style={{
          backgroundImage: `linear-gradient(to right, ${data.fromColor}, ${data.toColor})`
        }}
        aria-label="Gradient scale bar"
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
