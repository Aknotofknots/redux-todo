import React, { Component } from 'react';
import { connect } from 'react-redux'; //To connect to our store
import { addTodo, removeTodo } from '../actions'; //Our actions to dispatch
import '../styles/App.css';

class App extends Component {

  state =  {
    todoValue: ""
  }
  
  componentDidMount() {

  }

  handleInput = (e) => {
    
    this.setState({
        [e.target.name]: e.target.value
      })
  }

  add = () => {

    const {todoValue} = this.state;

    /* addTodo calls the dispatch function from props with our values
     * generate a not so unique ID so we can keep track of the todo and remove it */ 

    this.props.addTodo({
      content: todoValue,
      id: Math.floor(Math.random() * 5) + 1   
    })
  }

  remove = () => {
    /* Lets just do math random until we are lucky enough to get the right ID,
    * this is quality work, they are good devs brent. */
    this.props.removeTodo({
      content: "Hey",
      id: Math.floor(Math.random() * 5) + 1   
    })
  }

  render() {
    //Both state and our functions are stored in props, redux state is synced to props
    console.log(this.props.todos)
    console.log(this.state)

    return (
      <div className="App">

        <input onChange={this.handleInput} type="text" name="todoValue"/>
       
        <button 
            className="button"
            onClick={this.add}> 
            Add 
        </button>
        <button 
            className="button"
            onClick={this.remove}> 
            Remove
        </button>
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
    removeTodo: todo => dispatch(removeTodo(todo))
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
