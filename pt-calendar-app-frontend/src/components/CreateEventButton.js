import React from 'react'
import newappointment from '../assets/newappointment.png'

export default function CreateEventButton() {
  return (
    <button className='border py-2 px-5 rounded-full flex items-center bg-stone-600 shadow-md hover:shadow-2xl'>
        <img src={newappointment} alt="create-appt" className='w-7 h-7' />
        <span className='pl-3 pr-3 text-white'>Schedule Appointment</span>
    </button>
  )
}
