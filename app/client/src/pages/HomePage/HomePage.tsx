import React, { useContext } from "react";

import "../../styles/HomePage.scss";
import MemesUploader from "../../containers/MemesUploader/MemesUploader";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import MemesCreator from "../../containers/MemesCreator/MemesCreator";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return <div className='home-wrap'>{user ? <MemesUploader /> : <MemesCreator />}</div>;
};

export default HomePage;
