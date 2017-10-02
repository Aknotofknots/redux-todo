
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
      let id = action.payload.id;
      return state.filter(todo => todo.id !== id)
    default:
      return state;
  }
}