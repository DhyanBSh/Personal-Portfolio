import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="site-loader">
      <div className="loader-inner">
        <img src="/Logo.png" alt="Logo" className="loader-logo" />
      </div>
    </div>
  );
};

export default Loader;
