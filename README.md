# redux todo

This repository has a basic setup of `react` + `redux` to get you started. It is based on a todo-application. You should be able to `yarn/npm i` and just get started.

To use `redux` in our `create-react-app`-application we need to add both the library in charge of creating the actual store and the bindings to `react`. We could use `redux` without the bindings but `react-redux` simplifies the way we pass the store to our components

```bash
yarn add redux react-redux #npm i --save redux react-redux
```

### `react-redux`

* [**React Redux Connect explained**](http://www.sohamkamani.com/blog/2017/03/31/react-redux-connect-explained/)

`redux` + `react-redux` demands a bit of boilerplate to setup, but the good thing is that the boilerplate is usually always the same and can be copied in most cases. So it will not vary much.

#### Provider
We get a `Provider` component that is in charge of passing the store down to every component in our application

```jsx
/**
 * Provider is in charge of turning our `store` into 
 * `this.props.store` for every component in our application
 * This makes it so we can access the store at any time in any component
 * via the `connect` component
 */
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider> 
    , document.getElementById('root')
);
```

#### `mapStateToProps` & `mapDispatchToProps`

We have two helper function. One to map our actions or action creators to the components `props`.
This simplifies our the way we call our function in every component.

```jsx
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

```

And one function to map our current redux state: `store.getState()` to the components props `this.props`.

```jsx
/**
 * `mapStateToProps` is a helper function to map our state to `props` and
 * to only expose the state we need. Right now we only have one object in our state: `todos`
 * We are saying: take the current state which is: `this.props.store.getState().todos`
 * and put it in this component props: `this.props.todos`. If we have multiple pieces of our state
 * we can choose here which parts of the state should be exposed to this component
 * @param {Object} state 
 */
function mapStateToProps(state){
  return {
    todos: state
  }
}

```

#### `connect`

To connect to our redux state we use the `connect` function supplied to us by `react-redux` So we directly export a connected component when we `import` our `App` component.

```jsx
/**
 * We then use `connect` and pass along our two helper functions: 
 * `mapStateToProps` and `mapDispatchToProps` to init the connection.
 * Our "third" argument is the component to connect. So notice the double ()()
 * This is a Higher Order Component at work. It takes default values and a Component
 * as parameter and then it returns a new enhanced Component when we import the Component
 */
export default connect(mapStateToProps, mapDispatchToProps)(App);
```