import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer"
import React from 'react';
import s from './home.module.css';
import MessagesList from "./MessagesList";
import { useAppDispatch } from "../redux/redux-hook";
import { IMessage, IUser, setUser } from "../redux/messageSlice";
import Filter from '../components/Filter';
import { useLocation } from 'react-router-dom';
import userImg from '../assets/images/user.jpg';
import { useAuth } from '../redux/use-auth';
import { removeUser } from '../redux/userSlice';


const Users = () => {

  let users: IUser[] = useSelector((state: RootState) => state.messages.users)
  const dispatch = useAppDispatch();
  const location = useLocation()

  const search = location.search;
  const params = new URLSearchParams(search);
  const filterQuery: string | null = params.get('query');

  if (filterQuery) users = users.filter((user: any) => user.name.toLowerCase().includes(filterQuery.toLowerCase()))

  const setUserIdFunc = (user_id: string) => {

    dispatch(setUser({ user_id }))
  }

  return (
    <div className={s.homeWrapper}>
      <div className={s.contacts}>
        <div className={s.headerCotact}><img className={s.myAvatar} src={userImg} alt='userImg' />
        <button className={s.buttonLogOut} onClick={() => dispatch(removeUser())}>Log out </button>
          <Filter />
        </div>
        <div className={s.contactsTitle}>Chats</div>
        {users.length > 0 ?
          <div>
            <div >{users.map((user: IUser) => {
              const messageLast = user.messages[user.messages.length - 1]
              const lastMessage = user.lastTimeMessage

              return <div className={s.userContactsItem} key={user.user_id}>

                <img onClick={() => setUserIdFunc(user.user_id)} className={s.avatarStyle} src={userImg} alt='userImg' />
                <span className={s.userNameContacts} onClick={() => setUserIdFunc(user.user_id)}>
                  {user.name}</span>
                <span className={s.lastMessageTime}>
                  {messageLast && new Date(lastMessage).toDateString().slice(4)}
                </span>
                {<div className={s.lastMessage}>{messageLast && messageLast.message}</div>}

              </div>
            })
            }</div>
          </div>
          :
          <div>User not selected</div>}
      </div>
      <div className={s.listWrapper}><MessagesList /></div>
    </div>
  )
}

export default Users


