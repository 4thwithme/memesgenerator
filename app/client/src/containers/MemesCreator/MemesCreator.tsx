import React from "react";

import { IMemesCreatorProps } from "../../client.types";

const MemesCreator = ({ src }: IMemesCreatorProps) => {
  return <div className='memes-creator'>{src && <img src={src} />}</div>;
};

export default MemesCreator;
