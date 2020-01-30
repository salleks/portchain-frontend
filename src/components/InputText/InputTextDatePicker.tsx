import React, {
  useEffect,
  useRef,
  useState
} from 'react'
import {
  faCalendarAlt,
}                           from '@fortawesome/free-regular-svg-icons'
import {
  IInputTextDatePickerProps
} from './InputText'
import InputText            from './InputText'
import Calendar             from '../Calendar/Calendar'
import {ICalendarEventData} from '../Calendar/interfaces'

const InputTextDatePicker = (props : IInputTextDatePickerProps) => {

  const [stateCalendar, setStateCalendar] : [string,(r : string) => void] = useState('hide')
  const uniqueId =  useRef(null)

  const checkFormat = React.useCallback((format : string) => {
    const objectOptions : Intl.DateTimeFormatOptions = {}
    if (/(M){4,}/.exec(format)) {
      objectOptions.month = 'long'
    }
    if (!objectOptions.month && /(M){3,}/.exec(format)) {
      objectOptions.month = 'short'
    }
    if (!objectOptions.month && /(M){2,}/.exec(format)) {
      objectOptions.month = '2-digit'
    }
    if (/(d){2,}/.exec(format)) {
      objectOptions.day = '2-digit'
    }
    if (!objectOptions.day && /(d){1,}/.exec(format)) {
      objectOptions.day = 'numeric'
    }
    if (/(y){4,}/.exec(format)) {
      objectOptions.year = 'numeric'
    }
    if (!objectOptions.year && /(y){2,}/.exec(format)) {
      objectOptions.year = '2-digit'
    }
    if (/(E){2,}/.exec(format)) {
      objectOptions.weekday = 'long'
    }
    if (!objectOptions.weekday && /(E){1,}/.exec(format)) {
      objectOptions.weekday = 'short'
    }
    return objectOptions
  },[])

  const handlerOnClickCalendar = React.useCallback(() => {
    setStateCalendar(stateCalendar === 'show' ? 'hide' : 'show')
  }, [stateCalendar,setStateCalendar])

  const iconAction = React.useMemo(() => {
    return {
      handler: handlerOnClickCalendar,
      icon: faCalendarAlt
    }
  }, [handlerOnClickCalendar])

  const _popOverRoot = React.useCallback((parent : HTMLElement) => {
    return parent.getElementsByTagName('input')[0] as HTMLElement
  },[])

  const handlerOnClick = (e : React.MouseEvent) => {
    e.persist();
    (e.nativeEvent as any).ownerTarget = uniqueId.current
  }

  const handlerCalendarEvent = React.useCallback((data : ICalendarEventData, close ?: boolean) => {
    const  date = new Date(data.year,data.month,data.day)
    const objectLocalOption = checkFormat(props.format as string)
    const str = date.toLocaleString(props.locales,objectLocalOption)
    if (props.onChange) {
      props.onChange({
        target: {
          value: str
        },
        persist () : void {
          /** just simulate the function */
        }
      } as React.ChangeEvent<HTMLInputElement>)
    }

    if (close) {
      setStateCalendar('hide')
    }
  },[setStateCalendar])

  useEffect(() => {
    const fn = (e : MouseEvent) => {
      const ownerClick = (e as any).ownerTarget
      if (ownerClick !== uniqueId.current) {
        setStateCalendar('hide')
      }
    }
    window.addEventListener('click', fn, false)
    return () => {
      window.removeEventListener('click',fn,false)
    }
  },[setStateCalendar])

  return (
    <div className={'hw-input-text-date-picker'}  hw-calendar-data='parent' onClick={handlerOnClick}   ref={(ele) => uniqueId.current = ele as any}  >
      <InputText
            {
                ...props
            }
            align={props.align}
            readOnly
            type={'text'}
            iconAction={iconAction}
      />
      <Calendar
         show-type={'popover'}
         start-day={props['start-day']}
         locales={props.locales}
         popover-root={_popOverRoot}
         visible-state={stateCalendar as ('show'|'hide')}
         onCalendarEvent = {handlerCalendarEvent}
         sub-header={props['sub-header']}
      />
    </div>

  )
}

export default InputTextDatePicker
