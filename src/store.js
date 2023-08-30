import { configureStore } from "@reduxjs/toolkit";
import cartreducer from "./slicers/cartslice";

export default configureStore({
  reducer: {
    cartreducer,
  },
});