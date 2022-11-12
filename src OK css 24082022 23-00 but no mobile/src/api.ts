import React from 'react'
import axios, { AxiosResponse } from "axios";
import { IMessage } from './redux/messageSlice';


const baseURL = `https://api.chucknorris.io/jokes/random`



export const getServerMessages = (payload: any): Promise<IMessage[]> => {

  const { userCurrentMessageId, dateTime, today } = payload

  return axios.get(
    baseURL
  )
    .then((response: AxiosResponse) => {
      return { ...response.data, ...{ user_id: userCurrentMessageId, time: dateTime, today } }
    })

    .catch((error: Error | null) => {
      console.log(error);
      return error
    })
}




