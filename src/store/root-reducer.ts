import { combineReducers } from "@reduxjs/toolkit";
// import { reducer as calendarReducer } from '../slices/calendar';
import { reducer as chatReducer } from "../slices/chat";
import { reducer as storeReducer } from "../slices/store";
import { reducer as branchesReducer } from "../slices/branches";
import { reducer as MenuReducer } from "../slices/menu";
// import { reducer as kanbanReducer } from '../slices/kanban';
// import { reducer as mailReducer } from '../slices/mail';

export const rootReducer = combineReducers({
  //   calendar: calendarReducer,
  chat: chatReducer,
  stores: storeReducer,
  branches: branchesReducer,
  menu: MenuReducer,
  //   kanban: kanbanReducer,
  //   mail: mailReducer
});
