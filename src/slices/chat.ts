import { createSlice } from '@reduxjs/toolkit';
import { chatApi } from '../__fake-api__/chat-api';
import { objFromArray } from '../utils/obj-from-array';
import { I } from '@/utils/generalObj';

const initialState = {
  activeThreadId: null,
  contacts: {
    byId: {} as I,
    allIds: [] as string[]
  },
  threads: {
    byId: {} as I,
    allIds: [] as string[]
  }
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getContacts(state, action) {
      const contacts = action.payload;

      state.contacts.byId = objFromArray(contacts);
      state.contacts.allIds = Object.keys(state.contacts.byId);
    },
    getThreads(state, action) {
      const threads = action.payload;

      state.threads.byId = objFromArray(threads);
      state.threads.allIds = Object.keys(state.threads.byId);
    },
    getThread(state, action) {
      const thread = action.payload;

      if (thread) {
        state.threads.byId[thread.id] = thread;

        if (!state.threads.allIds.includes(thread.id)) {
          state.threads.allIds.unshift(thread.id);
        }
      }
    },
    markThreadAsSeen(state, action) {
      const threadId = action.payload;
      const thread = state.threads.byId[threadId];

      if (thread) {
        thread.unreadCount = 0;
      }
    },
    setActiveThread(state, action) {
      state.activeThreadId = action.payload;
    },
    addMessage(state, action) {
      const { threadId, message } = action.payload;
      const thread = state.threads.byId[threadId];

      if (thread) {
        thread.messages.push(message);
      }
    }
  }
});

export const { reducer } = slice;

export const getContacts = () => async (dispatch: any) => {
  const data = await chatApi.getContacts(null);

  dispatch(slice.actions.getContacts(data));
};

export const getThreads = () => async (dispatch: any) => {
  const data = await chatApi.getThreads();

  dispatch(slice.actions.getThreads(data));
};

export const getThread = (threadKey: any) => async (dispatch: any) => {
  const data: any = await chatApi.getThread(threadKey);

  dispatch(slice.actions.getThread(data));

  return data?.id;
};

export const markThreadAsSeen = (threadId: any) => async (dispatch: any) => {
  await chatApi.markThreadAsSeen(threadId);

  dispatch(slice.actions.markThreadAsSeen(threadId));
};

export const setActiveThread = (threadId: any) => (dispatch: any) => {
  dispatch(slice.actions.setActiveThread(threadId));
};

export const addMessage = ({ threadId, recipientIds, body }: any) => async (dispatch: any) => {
  const data: any = await chatApi.addMessage({
    threadId,
    recipientIds,
    body
  });

  dispatch(slice.actions.addMessage(data));

  return data.threadId;
};
