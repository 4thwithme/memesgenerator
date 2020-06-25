import { lazy } from "react";
import { MODAL_NAME } from "./constants";

const LazyMemesCropModal = lazy(() =>
  import(/* webpackChunkName: "LazyMemesCropModal"*/ "../containers/MemesCreator/MemesCropModal")
);

export default {
  [MODAL_NAME.MEMES_CROP_MODAL]: LazyMemesCropModal
};
