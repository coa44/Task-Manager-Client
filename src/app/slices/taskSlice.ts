import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APPLICATION_SLICE } from "../constants";
import { State } from "../store";
import { TaskParams, Task } from "../types/Task";
import { Pagination } from "../types/Pagination";

export type TaskState = {
  pagination: Pagination;
  tasks: Array<Task>;
  editTask: Task | null;
};

const initialState: TaskState = {
  pagination: {
    page: 1,
    pageSize: 5,
    total: 0,
  },
  tasks: [],
  editTask: null,
};

interface AdditionalSliceFeatures {
  selectors: {
    pagination(state: State): Pagination;
    tasks(state: State): Array<Task>;
    editTask(state: State): Task | null;
  };
}

export interface SaveTaskAction {
  params: TaskParams;
  cb: () => void;
}

const _slice = createSlice({
  name: APPLICATION_SLICE.TASK,
  initialState,
  reducers: {
    setPagination(state: TaskState, action: PayloadAction<Pagination>) {
      state.pagination = action.payload;
    },
    setPage(state: TaskState, action: PayloadAction<number>) {
      state.pagination.page = action.payload;
    },
    setTasks(state: TaskState, action: PayloadAction<Array<Task>>) {
      state.tasks = action.payload;
    },
    setEditTask(state: TaskState, action: PayloadAction<Task | null>) {
      state.editTask = action.payload;
    },
    loadTasks() {},
    loadTask(_, payload: PayloadAction<number>) {},
    deleteTask(_, payload: PayloadAction<number>) {},
    createTask(_, payload: PayloadAction<SaveTaskAction>) {},
    updateTask(_, payload: PayloadAction<SaveTaskAction>) {},
  },
});

export const taskSlice: typeof _slice & AdditionalSliceFeatures = _slice as any;

taskSlice.selectors = {
  pagination: (state: State): Pagination => {
    return state.task.pagination;
  },
  tasks: (state: State): Array<Task> => {
    return state.task.tasks;
  },
  editTask: (state: State): Task | null => {
    return state.task.editTask;
  },
};
