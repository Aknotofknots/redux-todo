
/**
 * Our only state is an array of todos, so the default value should be 
 * empty array, or else it will be undefined, and we do not want that.
 * Because we named our value `payload` in our action creator it will have
 * the same name here. If we want to add it, push into the cloned state,
 * or use spread syntax.
 * @param {Array} state 
 * @param {Object} action 
 * @return {Object}
 */
export default function todos(state = [], action){
  switch(action.type){
    case "ADD_TODO":
      //action.payload === todo
      return [...state, action.payload];
    case "REMOVE_TODO":
      //Return every object in the state except the one with the
      //id we want to remove. check if the passed todo in payload
      //matches the one in state. Filter always returns a new array.
      return state.filter(todo => todo.id !== action.payload.id)
    case "TOGGLE_COMPLETED":
       /* Return a new copy of the state with map */
      return state.map(todo => {
        /* If it's the selected todo, merge the current todo with the new value
        * To toggle the true/false of 'completed' we can negate (!) the current value
        * If the if statement doesn't return true, if the item is not the selected item
        * just return the unmodified item
        */
        return todo.id === action.payload.id 
          ? Object.assign({}, action.payload, {completed: !action.payload.completed})
          : todo
      })
    case "EDIT_TODO":
      /* Same as with TOGGLE, find the id, if the id is right: merge or 
       * return a modified version of the previous object. Else, return old object */ 
      return state.map(todo => {
        return todo.id === action.payload.id
            ? Object.assign({}, action.payload)
            : todo
      })
    default:
      return state;
  }
}