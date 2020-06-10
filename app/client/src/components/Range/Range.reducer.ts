import { IAction } from "../../client.types";

export const SET_THUMB_POSITION = "SET_THUMB_POSITION";

interface IInitialState {
  beforeValue: number;
  afterValue: number;
}

export default (state: IInitialState, { type, payload }: IAction) => {
  switch (type) {
    case SET_THUMB_POSITION: {
      return {
        ...state,
        beforeValue: payload,
        afterValue: 100 - payload
      };
    }
    default:
      return state;
  }
};
