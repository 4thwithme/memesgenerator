import { IAction } from "../../client.types";

export const CROP = "crop";
export const ZOOM = "zoom";
export const ASPECT = "aspect";
export const CROP_SHAPE = "cropShape";
export const SHOW_GRID = "showGrid";

interface IInitialState {
  aspect: number;
  zoom: number;
  crop: { x: number; y: number };
  cropShape: "rect" | "round";
  showGrid: boolean;
}

export const initialState: IInitialState = {
  aspect: 1,
  zoom: 1,
  cropShape: "rect",
  showGrid: true,
  crop: {
    x: 0,
    y: 0
  }
};

export default (state: IInitialState = initialState, { type, payload }: IAction) => {
  switch (type) {
    case CROP:
    case CROP_SHAPE:
    case SHOW_GRID:
    case ASPECT:
    case ZOOM: {
      return {
        ...state,
        [type]: payload
      };
    }
    default:
      return state;
  }
};
