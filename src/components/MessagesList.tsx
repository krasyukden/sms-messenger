import React, { FC, useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import s from './home.module.css';
import MessageItem from './MessageItem';
import userImg from '../assets/images/user.jpg'
import back from '../assets/images/back.png'
import { useAppDispatch } from '../redux/redux-hook';
import { setToggle } from '../redux/messageSlice';
import AddMessageField from './AddMessageField';
import { addMessage, getMessageRequest, sortByTime } from '../redux/messageSlice';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';

const MessagesList = () => {

  const userCurrent = useSelector((state: RootState) => state.messages.userCurrent);
  const users = useSelector((state: RootState) => state.messages.users);
  const error: any = useSelector((state: RootState) => state.messages.error);
  const dispatch = useAppDispatch();

  const [text, setText] = useState('');
  let [scrollUp, setScrollUp] = useState(true);

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 992;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {

      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

  const up = () => {

    setScrollUp(Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight)

  }
  useEffect(() => {

    const watchScroll = () => {
      window.addEventListener("scroll", up);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", up);
    };


  }, [scrollY]);


  const userCurrentMessageId = userCurrent[0].user_id

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    const messagesEnd = messagesEndRef.current
    if (messagesEnd) messagesEnd.scrollIntoView({ behavior: "smooth" })
  }

  const textArea = document.querySelector('textarea')
  let textRowCount = textArea ? textArea.value.split("\n").length : 0
  let rows = textRowCount + 1

  useEffect(() => {

    if (rows > 2 && textArea) { textArea.style.height = 'auto' }
    if (text === '' && textArea) { textArea.style.height = '45px' }

  }, [text]);
  //////////////////////////////////////////////////////

  const today = new Date()

  const date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear().toString().slice(-2);
  const time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const dateTime = date + ' ' + time;

  const addMessageIn = () => {
    if (text.trim().length) {
      dispatch(sortByTime())
      dispatch(addMessage({
        text,
        dateTime,
        today,
      }))
      setText('')
      //rows = 1

      setTimeout(() => {
        dispatch(getMessageRequest({ userCurrentMessageId, dateTime, today }))
        dispatch(sortByTime())
      }, 5000)
    }
  }

  if (width > breakpoint) {
    return (
      <div className={s.listContainer}>
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

                    <div>
                      <SouthOutlinedIcon className={!scrollUp ? s.arrowDown : s.arrowDownHidden}
                        onClick={scrollToBottom} />
                      {u.messages.map((message: any) => (
                        <MessageItem
                          scrollToBottom={scrollToBottom}
                          bottom={bottom}
                          key={message.id}
                          {...message}
                        />
                      ))}
                      <div ref={messagesEndRef}></div>

                    </div>
                  </div>

                }
                )
            }
          </div>

          <AddMessageField text={text} rows={rows} handleInput={setText} handleSubmit={addMessageIn} />

        </div>
      </div>
    )
  }

  return (
    <div className={s.listContainer}>
      <div>
        <div>
          {
            users.filter(u => u.user_id === userCurrent[0].user_id)
              .map((u: any) => {
                return <div key={u.user_id}>
                  <div className={s.listHeader}>
                    <img onClick={() => dispatch(setToggle())} className={s.back} src={back} alt='back' />
                    <img onClick={() => dispatch(setToggle())} className={s.avatarStyleListHeader} src={userImg} alt='userImg' />
                    <div onClick={() => dispatch(setToggle())} className={s.nameListHeader}>{u.name} </div>
                  </div>
                  <div className={s.messageItemWrap}>
                    <SouthOutlinedIcon className={!scrollUp ? s.arrowDown : s.arrowDownHidden} onClick={scrollToBottom} />
                    <div>
                      {u.messages.map((message: any) => (
                        <MessageItem
                          bottom={bottom}
                          scrollToBottom={scrollToBottom}
                          key={message.id}
                          {...message}
                        />
                      ))}
                      <div ref={messagesEndRef}></div>
                    </div>

                  </div>
                </div>
              }
              )
          }
        </div>
        <AddMessageField text={text} rows={rows} handleInput={setText} handleSubmit={addMessageIn} />
      </div>
    </div>
  )
}

export default MessagesList;