import dayjs from 'dayjs'
import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import GlobalContext from '../context/GlobalContext'

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex, setDaySelected } = useContext(GlobalContext)

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1)
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1)
  }

  function handleReset() {
    setMonthIndex(monthIndex === dayjs().month() 
    ? monthIndex + Math.random() 
    : dayjs().month())

    setDaySelected(dayjs())
  }

  return (
    <header className='px-4 py-2 flex items-center bg-stone-700'>
        <img src={logo} alt="logo" className='mr-2 w-12 h-12'/>
        <h1 className='mr-10 text-xl text-orange-400 font-bold'>
          PT Calendar
        </h1>
        <button className="border rounded py-2 px-4 mr-5 text-white" onClick={handleReset}>
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <span className='material-icons-outlined cursor-pointer text-white mx-2' >
            chevron_left
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className='material-icons-outlined cursor-pointer text-white mx-2'>
            chevron_right
          </span>
        </button>
        <h2 className='ml-4 text-xl text-white font-bold'>
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
    </header>
  )
}
