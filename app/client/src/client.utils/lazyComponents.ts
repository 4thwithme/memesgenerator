import { lazy } from "react";

const LazyMemesCreator = lazy(() =>
  import(/* webpackChunkName: "LazyMemesCreator"*/ "../containers/MemesCreator/MemesCreator")
);

export default { LazyMemesCreator };
