import React, { useReducer, useState, useContext } from "react";
import { Button, Icon } from "semantic-ui-react";
import Cropper from "react-easy-crop";
import Select from "react-select";
import Toggle from "react-toggle";
import "react-toggle/style.css";

import "../../styles/MemesCreator.scss";
import { MODAL_NAME, WINDOW_ASPECTS } from "../../client.utils/constants";
import { ModalContext } from "../../context/ModalProvider/ModalProvider";
import settingsReducer, {
  initialState,
  CROP,
  ZOOM,
  ASPECT,
  DISCARD,
  SHOW_GRID,
  CROPPED_AREA_PIXELS
} from "./MemesCreator.reducer";
import { useToggle } from "../../hooks";

import Range from "../../components/Range/Range";

import { IMemesCreatorProps } from "../../client.types";
import { getCroppedImg } from "../../client.utils";

const MemesCreator = ({ src, setMem }: IMemesCreatorProps) => {
  const [settings, dispatch] = useReducer(settingsReducer, initialState);
  const [thumbWasMoved, setThumbWasMoved] = useState<boolean>(false);
  const [isCropping, toggleCropping] = useToggle(false);
  const { removeModal } = useContext<any>(ModalContext);

  const onUpdateHandler = (z: number) => {
    dispatch({ type: ZOOM, payload: z });
    setThumbWasMoved(!thumbWasMoved);
  };

  const confirmCroppImg = async () => {
    toggleCropping();

    if (src && settings.croppedAreaPixels) {
      const croppedImage = await getCroppedImg(src, settings.croppedAreaPixels);

      console.log(croppedImage);

      setMem((prev: any) => ({
        ...prev,
        file: croppedImage,
        url: URL.createObjectURL(croppedImage)
      }));
    }

    toggleCropping();
  };

  const handleDiscard = () => dispatch({ type: DISCARD });

  return (
    <div className='memes-creator'>
      <div className='memes-creator__header'>
        <span>Crop and add your text</span>

        <div className='memes-creator__control'>
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

            <label htmlFor='cheese-status'>
              <Toggle
                id='cheese-status'
                defaultChecked={settings.showGrid}
                onChange={() => dispatch({ type: SHOW_GRID, payload: !settings.showGrid })}
              />
              <span>Show grid</span>
            </label>
          </div>

          <div className='memes-creator__control-line'>
            <Range
              classNamePrefix='range'
              min={1}
              max={3}
              currentValue={settings.zoom}
              onUpdate={(z) => onUpdateHandler(z)}
            />
          </div>
        </div>

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
            showGrid={settings.showGrid}
            onCropChange={(crop) => dispatch({ type: CROP, payload: crop })}
            onCropComplete={(croppedArea, croppedAreaPixels) =>
              dispatch({ type: CROPPED_AREA_PIXELS, payload: croppedAreaPixels })
            }
            onZoomChange={(newZoomValue) => onUpdateHandler(newZoomValue)}
          />
        )}
      </div>

      <div className='memes-creator__control-btns'>
        <Button color='red' disabled={isCropping} onClick={handleDiscard}>
          Discard
        </Button>
        <Button color='teal' disabled={isCropping} onClick={confirmCroppImg}>
          Set
        </Button>
      </div>
    </div>
  );
};

export default MemesCreator;
