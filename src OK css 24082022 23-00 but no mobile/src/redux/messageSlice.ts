import { createSlice } from "@reduxjs/toolkit";

export interface IState {

  users: Array<IUser>,
  userCurrent: Array<IUser>,
  notification: boolean,
  loading: boolean,
  error: Error | null | boolean
}

export interface IUser {
  name: string,
  user_id: string,
  lastTimeMessage: Date,
  messages: Array<IMessage>
}

export interface IMessage {
  message: string,
  id: string,
  user_id: string,
  sendUser_id: string,
  time: string
}

const initialState: IState = {

  users: [
    {
      user_id: '1', name: 'Tom', lastTimeMessage: new Date(2021, 6, 21),
      messages: [{ id: '1', message: 'Hi', user_id: '1', sendUser_id: '0', time: '1/21/21' },
      { id: '4', message: 'How are you?', user_id: '1', sendUser_id: '0', time: '6/21/21' }
      ]
    },
    {
      user_id: '2', name: 'Alice', lastTimeMessage: new Date(2021, 5, 21),
      messages: [{ id: '2', message: 'Hellow', user_id: '2', sendUser_id: '0', time: '2/21/21' }]
    },
    {
      user_id: '3', name: 'Sam', lastTimeMessage: new Date(2021, 4, 21),
      messages: [{ id: '3', message: 'Yo', user_id: '3', sendUser_id: '0', time: '4/21/21' }]
    },
    {
      user_id: '4', name: 'Tanya', lastTimeMessage: new Date(2021, 3, 21),
      messages: [{ id: '4', message: 'How are you, yo?', user_id: '3', sendUser_id: '0', time: '6/25/21' }]
    }
  ],

  userCurrent: [{
    user_id: '2', name: 'Alice', lastTimeMessage: new Date(2021, 2, 21),
    messages: [{ id: '2', message: 'Hellow', user_id: '2', sendUser_id: '0', time: '2/21/21' }]
  }],

  notification: false,
  loading: false,
  error: null

}


const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {

    setUser(state: IState, action: any) {
      const userCurrent = state.users.filter(user => user.user_id === action.payload.user_id)
      if (userCurrent) state.userCurrent = userCurrent
    },
    getMessageRequest(state: IState, action: any) {

      state.loading = true
      state.error = false
    },
    getMessageSuccess(state: IState, action: any) {

      const user = state.users.filter(user => user.user_id === action.payload.user_id)

      user[0].lastTimeMessage = action.payload.today

      user[0].messages.push(
        {
          message: action.payload.value,
          id: action.payload.id,
          user_id: action.payload.user_id,
          sendUser_id: '0',
          time: action.payload.time
        }
      )
      state.notification = true
      state.loading = false
      state.error = false
    },

    addMessage(state: IState, action: any) {

      const user = state.users.filter(user => user.user_id === state.userCurrent[0].user_id)
      user[0].lastTimeMessage = action.payload.today

      user[0].messages.push(
        {
          message: action.payload.text,
          id: new Date().toISOString(),
          user_id: '0',
          sendUser_id: state.userCurrent[0].user_id,
          time: action.payload.dateTime
        }
      )
      state.loading = false
      state.error = false
    },
    sortByTime(state: IState) {
      state.users = state.users.sort((a, b) => new Date(b.lastTimeMessage).getTime() - new Date(a.lastTimeMessage).getTime())
    },

    closeNotification(state: IState, action: any) {
      state.notification = false
      state.loading = false
      state.error = false
    },

    errorGetTodos(state: IState, action: any) {
      state.loading = false
      state.error = true
    }
  }
})

export const { getMessageRequest, getMessageSuccess, addMessage, setUser, sortByTime,
  closeNotification, errorGetTodos } = messageSlice.actions;

export default messageSlice.reducer;

