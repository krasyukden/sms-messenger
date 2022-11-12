import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import s from './home.module.css';
import searchIcon from '../assets/images/loupe.png'

export const Filter = () => {

  const [filterValue, setFilterValue] = useState('');

  const navigate = useNavigate();

  const handleKeyDown = (event: any) => {

    if (event.key === 'Enter') {
      submitFilter()
    }
  }

  const submitFilter = () => {

    if (filterValue) {
      navigate(`?query=${filterValue}`)
    }
    else {
      navigate(`/`)
    }
    setFilterValue('')
  }

  return (
    <div>
      <div className={s.filter}>
        <input value={filterValue} onChange={(e: any) => {
          let filterValue = e.target.value;
          setFilterValue(filterValue)
        }}
          onKeyDown={handleKeyDown}
          placeholder={'Search or start new chat'}
        />
        <img className={s.searchIcon} src={searchIcon} alt='searchIcon' />
      </div>
    </div>
  )
}
export default Filter;
