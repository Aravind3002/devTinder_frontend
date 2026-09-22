import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import feedReducer from "./feedslice";
import connectionreducer from "./connectionslice";
import requestreducer from "./requestslice";


const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionreducer,
    requests: requestreducer,
  },
});

export default appStore;