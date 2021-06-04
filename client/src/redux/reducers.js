import {
  CREATE_TODO,
  REMOVE_TODO,
  MARK_TODO_AS_COMPLETED,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
} from "./actions";
import {
  CREATE_CHART,
  REMOVE_CHART,
  LOAD_CHARTS_FAILURE,
  LOAD_CHARTS_SUCCESS,
  LOAD_CHARTS_IN_PROGRESS,
} from "./actions";

const initialState = { isLoading: false, data: [] };

export const todos = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      return {
        ...state,
        data: state.data.concat(todo),
      };
    }
    case REMOVE_TODO: {
      const { todo: todoToRemove } = payload;
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== todoToRemove.id),
      };
    }
    case MARK_TODO_AS_COMPLETED: {
      const { todo: updatedTodo } = payload;
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === updatedTodo.id) {
            return updatedTodo;
          }
          return todo;
        }),
      };
    }
    case LOAD_TODOS_SUCCESS: {
      const { todos } = payload;
      return {
        ...state,
        isLoading: false,
        data: todos,
      };
    }
    case LOAD_TODOS_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_TODOS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

const chartsInitialState = { isLoading: false, data: [] };

export const charts = (state = chartsInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_CHART: {
      const { chart } = payload;
      return {
        ...state,
        data: state.data.concat(chart),
      };
    }
    case REMOVE_CHART: {
      const { chart: chartToRemove } = payload;
      return {
        ...state,
        data: state.data.filter((chart) => chart.id !== chartToRemove.id),
      };
    }
    case LOAD_CHARTS_SUCCESS: {
      const { charts } = payload;
      return {
        isLoading: false,
        data: charts,
      };
    }
    case LOAD_CHARTS_IN_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_CHARTS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
