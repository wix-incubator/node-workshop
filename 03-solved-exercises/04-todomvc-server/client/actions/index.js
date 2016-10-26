import * as types from '../constants/ActionTypes'
import 'whatwg-fetch'

export function addTodo(text, id) {
  return { type: types.ADD_TODO, text, id }
}

export function deleteTodo(id) {
  return { type: types.DELETE_TODO, id }
}

export function editTodo(id, text) {
  return { type: types.EDIT_TODO, id, text }
}

export function completeTodo(id) {
  return { type: types.COMPLETE_TODO, id }
}

export function completeAll() {
  return { type: types.COMPLETE_ALL }
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED }
}

export function refreshList(todos) {
  return {type: types.REFRESH_LIST, todos }
}

export function addPersistentTodo(text) {
  return function (dispatch, getState) {
    const todos = getState().todos;
    const nextId = todos.length == 0 ?
      0 : todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
    return fetch(`/api/todos/${nextId}?text=${encodeURIComponent(text)}`, {method: 'POST'})
    .then(function(response) {
      if (response.ok)
        dispatch(addTodo(text, nextId))
    })
  }
}

export function refreshPersistentList() {
  return function (dispatch) {
    return fetch('/api/todos')
    .then(function(response) {
      if (!response.ok)
        return Promise.reject(new Error())
      else
        return response.json();
    })
    .then(function(todos) {
      dispatch(refreshList(todos.reverse().map(t => ({text: t.text, completed: t.checked, id: t.id}))))
    })
  }
}

export function deletePersistentTodo(id) {
  return function (dispatch) {
    return fetch(`/api/todos/${id}`, {method: 'DELETE'})
    .then(function(response) {
      if (!response.ok)
        return Promise.reject(new Error())
      else
        dispatch(deleteTodo(id))
    })
  }
}

export function completePersistentTodo(id) {
  return function (dispatch) {
    return fetch(`/api/todos/${id}/complete`, {method: 'PUT'})
    .then(function(response) {
      if (!response.ok)
        return Promise.reject(new Error())
      else
        dispatch(completeTodo(id))
    })
  }
}

export function editPersistentTodo(id, text) {
  return function (dispatch) {
    return fetch(`/api/todos/${id}?text=${encodeURIComponent(text)}`, {method: 'PUT'})
    .then(function(response) {
      if (!response.ok)
        return Promise.reject(new Error())
      else
        dispatch(editTodo(id, text))
    })
  }
}
