import React from "react";

import "../../styles/HomePage.scss";

import MemesUploader from "../../containers/MemesUploader/MemesUploader";

const HomePage = () => {
  return (
    <div className='home-wrap'>
      <MemesUploader />
    </div>
  );
};

export default HomePage;
