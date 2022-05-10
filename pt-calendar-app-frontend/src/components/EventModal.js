import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext'

const labelsClasses = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple'];

export default function EventModal() {
    const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } = useContext(GlobalContext)

    const [patient, setPatient] = useState(selectedEvent ? selectedEvent.patient : "");
    const [apptTimeStart, setApptTimeStart] = useState(selectedEvent ? selectedEvent.apptTimeStart : '');
    const [apptTimeEnd, setApptTimeEnd] = useState(selectedEvent ? selectedEvent.apptTimeEnd : '');
    const [checkedIn, setCheckedIn] = useState(selectedEvent ? selectedEvent.checkedIn : false)
    const [pt, setPt] = useState(selectedEvent ? selectedEvent.pt : '')
    const [exercises, setExercises] = useState(selectedEvent ? selectedEvent.exercises : '')
    const [notes, setNotes] = useState(selectedEvent ? selectedEvent.notes : '')
    const [selectedLabel, setSelectedLabel] = useState(selectedEvent 
        ? labelsClasses.find((lbl) => lbl === selectedEvent.label) 
        : labelsClasses[0]
        );

    function handleSubmit(e) {
        e.preventDefault()

        const calendarEvent = {
            id: selectedEvent ? selectedEvent.id : Date.now(),
            patient,
            day: daySelected.valueOf(),
            apptTimeStart,
            apptTimeEnd,
            checkedIn,
            pt,
            exercises,
            notes,
            label: selectedLabel
        }
        if(selectedEvent) {
            dispatchCalEvent({ type: 'update', payload: calendarEvent });
        } else {
            dispatchCalEvent({type: 'push', payload: calendarEvent});
        }
        
        setShowEventModal(false)
    }

    return (
        <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
            <form className='bg-stone-400 rounded-lg shadow-2xl w-1/4'>
                <header className='bg-stone-600 px-4 py-2 flex justify-between items-center'>
                    <span className='material-icons text-white'>
                        drag_handle
                    </span>
                    <div>
                        {selectedEvent && (
                            <span 
                            className='material-icons text-white pt-2 cursor-pointer'
                            onClick={() => 
                                {dispatchCalEvent({type: 'delete', payload: selectedEvent})
                                setShowEventModal(false)
                            }}>
                                delete
                            </span>
                        )}
                        <button 
                        onClick={() => setShowEventModal(false)}
                        >
                            <span className='material-icons text-white pt-2'>
                                close
                            </span>
                        </button>
                    </div>
                </header>
                
                <div className='p-3'>
                    <div className="grid items-end gap-y-7">
                        
                        <div className="flex gap-x-2">
                            <span className='material-icons-outlined text-white pt-3'>
                                personal_injury
                            </span>
                            <input 
                            type="text" 
                            name="patient" 
                            placeholder='Patient Name' 
                            value={patient}
                            required
                            onChange={(e) => setPatient(e.target.value)}
                            className="pt-3 border-0 text-stone-500 text-l font-semibold pb-2 w-full border-b-2 border-stone-400 focus:outline-none focus:ring-0 focus:border-orange-500"
                            />
                        </div>

                        <div className="flex gap-x-2">
                            <span className='material-icons-outlined text-white'>
                                event
                            </span>
                            <p>{daySelected.format('dddd, MMMM DD')}</p>
                        </div>
    
                        <div className='flex gap-x-2'>
                            <span className='material-icons-outlined text-white pt-1.5'>
                                schedule
                            </span>
                            <input 
                            type="text" 
                            name="start-time" 
                            placeholder='Start' 
                            value={apptTimeStart}
                            required
                            onChange={(e) => setApptTimeStart(e.target.value)}
                            className="pt-2 border-0 text-stone-500 text-sm font-semibold pb-2 w-full border-b-2 border-stone-400 focus:outline-none focus:ring-0 focus:border-orange-500"
                            />
                            <input 
                            type="text" 
                            name="end-time" 
                            placeholder='End' 
                            value={apptTimeEnd}
                            required
                            onChange={(e) => setApptTimeEnd(e.target.value)}
                            className="pt-2 border-0 text-stone-500 text-sm font-semibold pb-2 w-full border-b-2 border-stone-400 focus:outline-none focus:ring-0 focus:border-orange-500"
                            />
                        </div>

                        <div className="flex gap-x-2">
                            <span className='material-icons-outlined text-white'>
                                how_to_reg
                            </span>
                            <p>Checked In?</p>
                            <input 
                            type="checkbox" 
                            name="check-in" 
                            value={checkedIn}
                            onChange={(e) => setCheckedIn(e.checked)}
                            className="pt-3 border-0 text-stone-500 text-l font-semibold pb-2 border-b-2 border-stone-400 focus:outline-none focus:ring-0 focus:border-orange-500"
                            />
                        </div>

                        <div className="flex gap-x-2">
                            <span className='material-icons-outlined text-white pt-3'>
                                medical_information
                            </span>
                            <input 
                            type="text" 
                            name="assigned-pt" 
                            placeholder='Physical Therapist' 
                            value={pt}
                            required
                            onChange={(e) => setPt(e.target.value)}
                            className="pt-3 border-0 text-stone-500 text-l font-semibold pb-2 w-full border-b-2 border-stone-400 focus:outline-none focus:ring-0 focus:border-orange-500"
                            />
                        </div>
                        
                        <div className="flex gap-x-2">
                            <span className='material-icons-outlined text-white pt-3'>
                                fitness_center
                            </span>
                            <input 
                            type="text" 
                            name="assigned-pt" 
                            placeholder='Exercises' 
                            value={exercises}
                            required
                            onChange={(e) => setExercises(e.target.value)}
                            className="pt-3 border-0 text-stone-500 text-l font-semibold pb-2 w-full border-b-2 border-stone-400 focus:outline-none focus:ring-0 focus:border-orange-500"
                            />
                        </div>

                        <div className="flex gap-x-2">
                            <span className='material-icons-outlined text-white pt-3'>
                                edit_note
                            </span>
                            <input 
                            type="text" 
                            name="notes" 
                            placeholder='Notes' 
                            value={notes}
                            required
                            onChange={(e) => setNotes(e.target.value)}
                            className="pt-3 border-0 text-stone-500 text-l font-semibold pb-2 w-full border-b-2 border-stone-400 focus:outline-none focus:ring-0 focus:border-orange-500"
                            />
                        </div>
                        
                        <div className="flex gap-x-2">
                            <span className='material-icons-outlined text-white'>
                                palette
                            </span>
                            {labelsClasses.map((lblClass, i) => (
                                <span 
                                key={i}
                                className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                onClick={() => setSelectedLabel(lblClass)}
                                >
                                    {selectedLabel === lblClass && 
                                    <span className='material-icons-outlined text-white text-sm'>
                                        check
                                    </span>}
                                    
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <footer className='flex justify-end border-t p-3 mt-5'>
                    <button 
                    type='submit' 
                    onClick={handleSubmit}
                    className='bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded text-white'
                    >
                        Schedule
                    </button>
                </footer>
            </form>
        </div>
    )
}
