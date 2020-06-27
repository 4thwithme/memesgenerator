import { lazy } from "react";
import { MODAL_NAME } from "./constants";

const LazyNewMemPesponceModal = lazy(() =>
  import(/* webpackChunkName: "LazyMemesCropModal"*/ "../components/Modals/NewMemPesponceModal")
);

export default {
  [MODAL_NAME.NEW_MEM_RESPONCE_MODAL]: LazyNewMemPesponceModal
};
