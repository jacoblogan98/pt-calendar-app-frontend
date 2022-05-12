import React, { useEffect, useMemo, useReducer, useState } from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'

function savedEventsReducer(state, {type, payload}) {
    switch (type) {
        case 'get':
            console.log(payload)
            return payload
        case 'post':
            fetch('http://localhost:9292', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(resp => resp.json())
            .then(appt => console.log(appt))

            return [...state, payload]
        case 'patch':
            fetch(`http://localhost:9292/${payload.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(resp => resp.json())
            .then(appt => console.log(appt))

            return state.map(evt => evt.id === payload.id ? payload : evt)
        case 'delete':
            fetch(`http://localhost:9292/${payload.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            return state.filter(evt => evt.id !== payload.id)
        default:
            throw new Error();
    }
}

export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([])
    
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [])

    useEffect(() => {
        fetch('http://localhost:9292')
        .then(resp => resp.json())
        .then(events => dispatchCalEvent({type: 'get', payload: events}))
    }, [])

    useEffect(() => {
        setLabels((prevLabels) => {
            return [...new Set( savedEvents.map(evt => evt.label))].map(label => {
                const currentLabel = prevLabels.find(lbl => lbl.label === label)
                return {
                    label,
                    checked: currentLabel ? currentLabel.checked : true,
                }
            })
        })
    }, [savedEvents])

    const filteredEvents = useMemo(() => {
        return savedEvents.filter((evt) => 
            labels
                .filter((lbl) => lbl.checked)
                .map((lbl) => lbl.label)
                .includes(evt.label)
        );
    }, [savedEvents, labels])

    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth)
        }
    }, [smallCalendarMonth])

    useEffect(() => {
        if (!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal])

    function updateLabel(label) {
        setLabels(labels.map((lbl) => lbl.label === label.label 
        ? label
        : lbl ))
    }

    return (
        <GlobalContext.Provider value={{ 
            monthIndex, 
            setMonthIndex, 
            smallCalendarMonth, 
            setSmallCalendarMonth,
            daySelected,
            setDaySelected,
            showEventModal,
            setShowEventModal,
            dispatchCalEvent,
            savedEvents,
            selectedEvent,
            setSelectedEvent,
            setLabels,
            labels,
            updateLabel,
            filteredEvents
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
