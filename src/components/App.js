import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators }from 'redux';
import * as actions from '../actions/actions';
import '../styles/App.css';

class App extends Component {

  /* We still need a local state for the input field, we don't
   * need to have this state in the redux state, this can still be local */
  state ={
    value: "",
    movies: ""
  }

  componentDidMount(){
    this.props.actions.addMovies();
  }


  add = () => {
    this.props.actions.postTodo({
      text: this.state.value,
      id: Math.floor(Math.random() * 1000) + 1,
      completed: false   
    })
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
        <p>{ todo.text }</p>
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



function mapDispatchToProps(dispatch){
  return{
   actions: bindActionCreators(actions, dispatch)
  }
}


function mapStateToProps(state){
  return {
    todos: state.todos,
    movies: state.movies,
    error: state.error
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
