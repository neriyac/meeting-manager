import React from 'react';
import PropTypes from 'prop-types';

const ReactToolTip =  ({ 
  title, 
  children, 
  position, 
  containerClass, 
  theme }) => {
    return (
      <div className={`tooltip ${containerClass}`}>
        {children}
          <div className={`tooltiptext ${theme === "dark" ? `dark` :`light`} tooltip-${position}`}>
            {title}
            <span className="arrow"></span>
          </div>
      </div>
    );
}

export default ReactToolTip;

ReactToolTip.defaultProps = {
  title: 'sample',
  children: React.createElement('div'),
  position: 'bottom',
  containerClass: '',
  theme: 'light'
}

ReactToolTip.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  position: PropTypes.string,
  containerClass: PropTypes.string,
  theme: PropTypes.string
}