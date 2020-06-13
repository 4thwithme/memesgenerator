import { WINDOW_ASPECTS } from "../../client.utils/constants";

import { IAction, ICroppedAreaPixels } from "../../client.types";

export const CROP = "crop";
export const ZOOM = "zoom";
export const ASPECT = "aspect";
export const CROP_SHAPE = "cropShape";
export const SHOW_GRID = "showGrid";
export const CROPPED_AREA_PIXELS = "croppedAreaPixels";
export const DISCARD = "DISCARD";

interface IInitialState {
  aspect: number;
  zoom: number;
  crop: { x: number; y: number };
  showGrid: boolean;
  croppedAreaPixels: ICroppedAreaPixels | null;
}

export const initialState: IInitialState = {
  aspect: WINDOW_ASPECTS[0].value,
  zoom: 1,
  croppedAreaPixels: null,
  showGrid: true,
  crop: {
    x: 0,
    y: 0
  }
};

export default (state: IInitialState = initialState, { type, payload }: IAction) => {
  switch (type) {
    case CROP:
    case SHOW_GRID:
    case ASPECT:
    case CROPPED_AREA_PIXELS:
    case ZOOM: {
      return {
        ...state,
        [type]: payload
      };
    }

    case DISCARD: {
      return initialState;
    }

    default:
      return state;
  }
};
