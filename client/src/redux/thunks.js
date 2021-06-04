import {
  createTodo,
  removeTodo,
  loadTodosInProgress,
  loadTodosSuccess,
  loadTodosFailure,
  markTodoAsCompleted,
} from "./actions";

import {
  createChart,
  removeChart,
  loadChartsInProgress,
  loadChartsSuccess,
  loadChartsFailure,
} from "./actions";

export const loadTodos = () => async (dispatch) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch("http://localhost:8080/todos");
    const todos = await response.json();

    dispatch(loadTodosSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(e));
  }
};

export const addTodoRequest = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch("http://localhost:8080/todos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body,
    });
    const todo = await response.json();
    dispatch(createTodo(todo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const removeTodoRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "delete",
    });
    const removedTodo = await response.json();
    dispatch(removeTodo(removedTodo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const markTodoAsCompletedRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8080/todos/${id}/completed`,
      {
        method: "post",
      }
    );
    const updatedTodo = await response.json();
    dispatch(markTodoAsCompleted(updatedTodo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const displayAlert = (text) => () => {
  alert(text);
};

// loadCharts
export const loadCharts = () => async (dispatch) => {
  try {
    dispatch(loadChartsInProgress());
    const response = await fetch("http://localhost:8080/charts");
    const charts = await response.json();
    dispatch(loadChartsSuccess(charts));
  } catch (e) {
    dispatch(loadChartsFailure());
    dispatch(displayAlert(e));
  }
};

export const addChartRequest = (name) => async (dispatch) => {
  try {
    const body = JSON.stringify({ name });
    const response = await fetch("http://localhost:8080/charts", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body,
    });
    const chart = await response.json();
    dispatch(createChart(chart));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const removeChartRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/charts/${id}`, {
      method: "delete",
    });
    const removedChart = await response.json();
    dispatch(removeChart(removedChart));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};
