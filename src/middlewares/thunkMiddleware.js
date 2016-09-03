const thunkMiddleware = store => next => action => {
  if (typeof action !== 'function') {
    // Normal action, pass it on
    return next(action);
  }
  const result = action(store.dispatch, store.getState);

  return result;
};

export default thunkMiddleware;
