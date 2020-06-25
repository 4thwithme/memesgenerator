import { ICroppedAreaPixels, IAction } from "../../client.types";

export const CROP = "crop";
export const SET_IMAGE_PARAMS = "imageParams";
export const DISCARD = "DISCARD";

export interface IInitialState {
  crop: ICroppedAreaPixels;
  imageParams: {
    width: number;
    height: number;
  };
  showGrid: boolean;
}

export const initialState: IInitialState = {
  showGrid: false,
  crop: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  imageParams: { width: 0, height: 0 }
};

export default (state: IInitialState = initialState, { type, payload }: IAction) => {
  switch (type) {
    case CROP:
    case SET_IMAGE_PARAMS: {
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
