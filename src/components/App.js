import React, { Component } from 'react';
import { connect } from 'react-redux'; //To connect to our store
import { addTodo, removeTodo, toggleCompleted, editTodo } from '../actions'; //Our actions to dispatch
import '../styles/App.css';

class App extends Component {

  /* We still need a local state for the input field, we don't
   * need to have this state in the redux state, this can still be local */
  state ={
    value: ""
  }

  add = () => {
    //same as earlier, but grab the state from the input instead. Higher ID number
    this.props.addTodo({
      content: this.state.value,
      id: Math.floor(Math.random() * 1000) + 1,
      completed: false   
    })
    //To clear the input
    this.setState({value: ''});
  }

  remove = (todo) => {
    this.props.removeTodo(todo);
  }

  edit = (todo) => {
    //Lets just reuse the input field, alright? This ain't a UX case, we 
    //still good devs brent. Grab the whole todo, replace the content with
    //the current value in the input field. Then dispatch
    const editedTodo = Object.assign(todo, { content: this.state.value});
    this.props.editTodo(editedTodo);
  }

  toggleCompleted = (todo) => {
    this.props.toggleCompleted(todo);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value})

  render() {
    //Both state and our functions are stored in props, redux state is synced to props
    const todoList = this.props.todos.map(todo => 
      <div key={todo.id}>
        <p>{ todo.content }</p>
        <p>{ todo.completed ? "Completed" : "Not Completed" } </p>
        <button className="button" onClick={() => this.remove(todo)} > Remove Todo </button> 
        <button className="button" onClick={() => this.toggleCompleted(todo)}> Toggle completed </button>
        <button className="button" onClick={() => this.edit(todo)}> Edit Todo </button>
      </div>
      )
    return (
      <div className="App">
        <input type="text" onChange={this.onChange} name="value" value={this.state.value} />
        <button className="button" onClick={this.add}> Add Todo </button>
        { todoList }
      </div>
    );
  }
}

/**
 * `mapDispatchToProps` is in charge of converting `store.dispatch` into
 * more easily handled functions. Our 'Provider' component supplies us with
 * the store via `this.props.store`. This is so we can write 'this.props.addTodo'
 * instead of `this.props.store.dispatch({ type: 'ADD_TODO', payload: todo })` which
 * is what we are actually saying 
 * @param {Function} dispatch 
 */
function mapDispatchToProps(dispatch){
  return{
    addTodo: todo => dispatch(addTodo(todo)),
    removeTodo: todo => dispatch(removeTodo(todo)),
    toggleCompleted: todo => dispatch(toggleCompleted(todo)),
    editTodo: todo => dispatch(editTodo(todo))
  }
}

/**
 * `mapStateToProps` is a helper function to map our redux state to `props` and
 * to only expose the state we need. Right now we only have one object in our state: `todos`
 * We are saying: take the current state which is: `this.props.store.getState()`
 * and put it in this component props: `this.props.todos`. If we have multiple pieces of our state
 * we can choose here which parts of the state should be exposed to this component
 * @param {Object} state 
 */
function mapStateToProps(state){
  return {
    todos: state
  }
}
/**
 * We then use `connect` and pass along our two helper functions: 
 * `mapStateToProps` and `mapDispatchToProps` to init the connection to the store.
 * Our "third" argument is the component to connect. So notice the double ()()
 * This is a Higher Order Component at work. It takes default values and a Component
 * as parameter and then it returns a new enhanced Component when we import the Component
 */
export default connect(mapStateToProps, mapDispatchToProps)(App);
