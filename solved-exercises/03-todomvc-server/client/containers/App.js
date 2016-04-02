import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

class App extends Component {
  render() {
    const { todos, actions } = this.props
    return (
      <div>
        <Header addTodo={actions.addPersistentTodo} />
        <MainSection todos={todos} actions={{
          deleteTodo: actions.deletePersistentTodo,
          completeTodo: actions.completePersistentTodo,
          editTodo: actions.editPersistentTodo,
          completeAll: actions.completeAll,
          clearCompleted: actions.clearCompleted
        }} />
      </div>
    )
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  console.log('@@@GIL state=', state)
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
