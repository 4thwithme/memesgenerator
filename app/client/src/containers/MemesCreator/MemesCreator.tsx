import React, { useReducer, useState, useContext } from "react";
import { Button, Icon } from "semantic-ui-react";
import Cropper from "react-easy-crop";
import Select from "react-select";
import Toggle from "react-toggle";
import "react-toggle/style.css";

import "../../styles/MemesCreator.scss";
import { MODAL_NAME, WINDOW_ASPECTS, WINDOW_SHAPE } from "../../client.utils/constants";
import { ModalContext } from "../../context/ModalProvider/ModalProvider";
import settingsReducer, {
  initialState,
  CROP,
  ZOOM,
  ASPECT,
  CROP_SHAPE,
  SHOW_GRID
} from "./MemesCreator.reducer";

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

        <div className='memes-creator__control-line'>
          <div className='memes-creator__control-block'>
            <Select
              options={WINDOW_ASPECTS}
              isSearchable
              defaultValue={WINDOW_ASPECTS.length ? WINDOW_ASPECTS[0] : []}
              onChange={(selectedItem: any) =>
                dispatch({ type: ASPECT, payload: selectedItem.value })
              }
              className='select-aspect__wrap'
              classNamePrefix='select-aspect'
            />
            <span>Ratio</span>
          </div>

          <div className='memes-creator__control-block'>
            <Select
              options={WINDOW_SHAPE}
              isSearchable
              defaultValue={WINDOW_SHAPE.length ? WINDOW_SHAPE[0] : []}
              onChange={(selectedItem: any) =>
                dispatch({ type: CROP_SHAPE, payload: selectedItem.value })
              }
              className='select-shape__wrap'
              classNamePrefix='select-shape'
            />
            <span>Shape</span>
          </div>

          <label htmlFor='cheese-status'>
            <Toggle
              id='cheese-status'
              defaultChecked={settings.showGrid}
              onChange={() => dispatch({ type: SHOW_GRID, payload: !settings.showGrid })}
            />
            <span>Show grid</span>
          </label>
        </div>

        <div className='memes-creator__control-btns'>
          <Button color='red'>Discard</Button>
          <Button color='teal'>Crop</Button>
        </div>
      </div>
    </div>
  );
};

export default MemesCreator;
