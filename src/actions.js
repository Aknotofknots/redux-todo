
/**
 * `type` is always required and needs to be a string, preferbly in uppercase
 * `todo` is the value that is being passed to the function when we dispatch.
 * This is why we want "action creators", functions that return actions, so we
 * can send along extra data. `payload` is not a unique keyword, it doesn't 
 * need to be called that, as long as we call the value in the reducer by its
 * right name.
 * @param {Object} todo
 * @return {Object}
 */
export function addTodo(todo){
  return {
    type: "ADD_TODO",
    payload : todo
  }
}

/**
 * Same as above, the action creators are usually the same, small changes,
 * and no changes in this case except the action "REMOVE_TODO"
 * @param {Object} todo 
 * @return {Object}
 */
export function removeTodo(todo){
  return {
    type: "REMOVE_TODO",
    payload: todo
  }
}


export function toggleCompleted(todo){
  return {
    type: "TOGGLE_COMPLETED",
    payload: todo
  }
}

export function editTodo(todo){
  return {
    type: "EDIT_TODO",
    payload: todo
  }
}
