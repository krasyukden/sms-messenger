import { FC } from 'react';
import React from 'react'
import s from '../components/home.module.css';
import sendButton from '../assets/images/send-button.png'


interface InputProps {
  text: string,
  rows: number,
  handleInput: (inputValue: string) => void;
  handleSubmit: () => void;
}

const AddMessageField: FC<InputProps> = ({ text, rows, handleInput, handleSubmit }) => {

  return (
    <div className={s.inputForm}>
      <div>
        <textarea value={text} rows={rows} onChange={(e: any) => {
          let inputValue = e.target.value
          handleInput(inputValue)
        }} placeholder={'Type your message'}>
        </textarea>
        <button type="submit" className={s.sendButton}
          onClick={handleSubmit} ><img className={s.sendButtonIcon} src={sendButton} alt='sendButtonIcon' /></button>
      </div>
    </div >
  )
}

export default AddMessageField;