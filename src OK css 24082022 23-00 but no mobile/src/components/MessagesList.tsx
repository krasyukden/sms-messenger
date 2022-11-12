import React, { FC, useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import s from './home.module.css';
import MessageItem from './MessageItem';
import userImg from '../assets/images/user.jpg'


const MessagesList = () => {

  const userCurrent = useSelector((state: RootState) => state.messages.userCurrent);
  const users = useSelector((state: RootState) => state.messages.users);
  const error: any = useSelector((state: RootState) => state.messages.error);

  return (
    <div>
      <div>
        <div>
          {
            users.filter(u => u.user_id === userCurrent[0].user_id)
              .map((u: any) => {
                return <div key={u.user_id}>
                  <div className={s.listHeader}>
                    <img className={s.avatarStyle} src={userImg} alt='userImg' />
                    <div className={s.nameListHeader}>{u.name} </div>
                  </div>
                  {u.messages.map((message: any) => (
                    <MessageItem
                      key={message.id}
                      {...message}
                    />
                  ))}
                </div>
              }
              )
          }
        </div>
        {users.length > 0 ?
          <div>
          </div> :
          <div>Messages not found</div>}
      </div>
    </div>
  )
}

export default MessagesList;