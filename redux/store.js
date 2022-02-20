import { createStore, applyMiddleware } from "redux"
import { HYDRATE, createWrapper } from "next-redux-wrapper"
import thunkMiddleware from "redux-thunk"
import reducers from "./reducers/reducers"

const bindMiddlewares = (middlewares) => {
  if (process.env.NODE_ENV === "development") {
    const { composeWithDevTools } = require("redux-devtools-extension")
    return composeWithDevTools(applyMiddleware(...middlewares))
  }

  return applyMiddleware(...middlewares)
}

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return reducers(state, action)
  }
}

// create a makeStore function
export const makeStore = () =>
  createStore(reducer, bindMiddlewares([thunkMiddleware]))

// export an assembled wrapper
export const wrapper = createWrapper(makeStore)
