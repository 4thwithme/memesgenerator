import React, { useReducer, useState, useContext } from "react";
import { Button, Icon } from "semantic-ui-react";
import Cropper from "react-easy-crop";

import "../../styles/MemesCreator.scss";
import { MODAL_NAME } from "../../client.utils/constants";
import { ModalContext } from "../../context/ModalProvider/ModalProvider";
import settingsReducer, { initialState, CROP, ZOOM } from "./MemesCreator.reducer";

import { IMemesCreatorProps } from "../../client.types";
import Range from "../../components/Range/Range";

const MemesCreator = ({ src }: IMemesCreatorProps) => {
  const [settings, dispatch] = useReducer(settingsReducer, initialState);
  const [thumbWasMoved, setThumbWasMoved] = useState<boolean>(false);
  const { removeModal } = useContext(ModalContext);

  const onUpdateHandler = (z: number) => {
    dispatch({ type: ZOOM, payload: z });
    setThumbWasMoved(!thumbWasMoved);
  };

  return (
    <div className='memes-creator'>
      <div className='memes-creator__header'>
        <span>Crop and add your text</span>
        <Icon
          name='remove'
          className='memes-creator__close'
          onClick={() => removeModal(MODAL_NAME.MEMES_CREATOR)}
        />
      </div>
      <div className='memes-creator__img'>
        {src && (
          <Cropper
            image={src}
            crop={settings.crop}
            zoom={settings.zoom}
            aspect={settings.aspect}
            cropShape={settings.cropShape}
            showGrid={settings.showGrid}
            onCropChange={(crop) => dispatch({ type: CROP, payload: crop })}
            onCropComplete={(e) => console.log(e)}
            onZoomChange={(newZoomValue) => onUpdateHandler(newZoomValue)}
          />
        )}
        {/* {src && <img src={src} />} */}
      </div>
      <div className='memes-creator__control'>
        <Range
          classNamePrefix='range'
          min={1}
          max={3}
          currentValue={settings.zoom}
          onUpdate={(z) => onUpdateHandler(z)}
        />
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
      </div>
    </div>
  );
};

export default MemesCreator;
