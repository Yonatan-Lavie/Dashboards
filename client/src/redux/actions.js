export const CREATE_TODO = "CREATE_TODO";
export const createTodo = (todo) => ({
  type: CREATE_TODO,
  payload: { todo },
});

export const REMOVE_TODO = "REMOVE_TODO";
export const removeTodo = (todo) => ({
  type: REMOVE_TODO,
  payload: { todo },
});

export const MARK_TODO_AS_COMPLETED = "MARK_TODO_AS_COMPLETED";
export const markTodoAsCompleted = (todo) => ({
  type: MARK_TODO_AS_COMPLETED,
  payload: { todo },
});

export const LOAD_TODOS_IN_PROGRESS = "LOAD_TODOS_IN_PROGRESS";
export const loadTodosInProgress = () => ({
  type: LOAD_TODOS_IN_PROGRESS,
});

export const LOAD_TODOS_SUCCESS = "LOAD_TODOS_SUCCESS";
export const loadTodosSuccess = (todos) => ({
  type: LOAD_TODOS_SUCCESS,
  payload: { todos },
});

export const LOAD_TODOS_FAILURE = "LOAD_TODOS_FAILURE";
export const loadTodosFailure = () => ({
  type: LOAD_TODOS_FAILURE,
});
// CHARTS ACTIONS
export const CREATE_CHART = "CREATE_CHART";
export const createChart = (chart) => ({
  type: CREATE_CHART,
  payload: { chart },
});

export const REMOVE_CHART = "REMOVE_CHART";
export const removeChart = (chart) => ({
  type: REMOVE_CHART,
  payload: { chart },
});

export const LOAD_CHARTS_IN_PROGRESS = "LOAD_CHARTS_IN_PROGRESS";
export const loadChartsInProgress = () => ({
  type: LOAD_CHARTS_IN_PROGRESS,
});

export const LOAD_CHARTS_SUCCESS = "LOAD_CHARTS_SUCCESS";
export const loadChartsSuccess = (charts) => ({
  type: LOAD_CHARTS_SUCCESS,
  payload: { charts },
});

export const LOAD_CHARTS_FAILURE = "LOAD_CHARTS_FAILURE";
export const loadChartsFailure = () => ({
  type: LOAD_CHARTS_FAILURE,
});
