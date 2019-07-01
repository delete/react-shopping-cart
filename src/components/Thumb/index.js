import React from 'react';
import PropTypes from 'prop-types';

const Thumb = props => {
  return (
    <div className={props.classes}>
      <img
        src={props.src}
        alt={props.alt}
        title={props.title}
        onClick={props.onClick}
      />
    </div>
  );
};

Thumb.propTypes = {
  alt: PropTypes.string,
  title: PropTypes.string,
  classes: PropTypes.string,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Thumb;
