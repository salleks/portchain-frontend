import React, {
  useEffect,
  useRef,
  useState
}                          from 'react'
import {FontAwesomeIcon}   from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleLeft,
  faAngleDoubleRight
}                          from '@fortawesome/free-solid-svg-icons'
import CalendarPanelDays   from './CalendarPanelDays'
import CalendarPanelMonths from './CalendarPanelMonths'
import CalendarPanelYears  from './CalendarPanelYears'
import {ICalendarProps}    from './interfaces'

interface IPosition {
  left ?: number,
  right ?: number,
  top ?: number
  bottom ?: number
}

interface ICalendarState {
  visible : boolean
  day : number
  month : number // 1-12
  year : number
  panel ? : 'D'|'M'|'Y' /** describe current visible panel that  */
  position : IPosition
  additionalClass : string
  closeAction : boolean
}

interface ICalendarHeaderProps {
  state : ICalendarState,
  locales ?: string,
  moveMonth : (pos : number) => void,
  setPanel : (panel : 'D'|'M'|'Y') => void
}

const CalendarHeader = ({setPanel, moveMonth,state,locales} : ICalendarHeaderProps) => {

  const date = new Date(state.year as number,state.month as number, state.day as number)
  return (
    <div className={'hw-calendar-top-header'}>
      <div className={'hw-calendar-top-day'} onClick={() => setPanel('D')}>
        <div>
          {date.toLocaleString(locales,{ weekday:'long'})}
        </div>
        <div>
          {state.day}
        </div>
      </div>
      <div className={'hw-calendar-top-month'}>
        <div></div>
        <div>
          <div className={'hw-calendar-button-move'} onClick={() => moveMonth(-1)}><FontAwesomeIcon icon={faAngleDoubleLeft} /></div>
          <div className={'hw-calendar-top-data-part'}>
            <div onClick={() => setPanel('M')}>
              {date.toLocaleString(locales,{ month:'long'})}
            </div>
            <div onClick={() => setPanel('Y')}>
              {state.year}
            </div>
          </div>
          <div className={'hw-calendar-button-move'} onClick={() => moveMonth(1)}><FontAwesomeIcon icon={faAngleDoubleRight} /></div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

const Calendar = ({onCalendarEvent,'popover-root': popoverRoot,'sub-header': subHeader,className, 'visible-state': visibleState,'show-type' : showType,locales,panel,monthsNextPanel,minDate,maxDate,'start-day':startDay,day,month, year} : ICalendarProps) => {

  const myId = useRef()
  const startState = React.useMemo(() => {
    const date =  new Date(year as number,month as number, day as number)
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      panel:panel as string,
      visible: (showType === 'modal' || showType === 'popover') ? visibleState === 'show' : true,
      additionalClass: ''
    } as ICalendarState
  },[year,month,day,showType,panel,visibleState])

  const [state,setState] : [ICalendarState,(r : ICalendarState) => void] = useState(startState)

  useEffect(() => {
    if (onCalendarEvent) {
      const data = {
        year: state.year,
        month: state.month,
        day: state.day
      }
      onCalendarEvent(data,!!state.closeAction)
    }

  },[onCalendarEvent,state.day,state.month,state.year, state.closeAction])

  useEffect(() => {
    if (showType !== 'popover' && showType !== 'modal') {
      return
    }

    const _visibleState =  !!(visibleState === 'show')

    if (!_visibleState) {
      if (_visibleState !== state.visible) {
        setState({
          ...state,
          ...{
            visible: false
          }
        })
      }
      return
    }
    if (_visibleState !== state.visible) {
      let target = myId.current as any
      let parent = target.parentElement
      let root = parent
      while (target) {
        if (target.hasAttribute('hw-calendar-data') && target.getAttribute('hw-calendar-data') === 'parent') {
          parent = target
          break
        }
        target = target.parentElement
      }
      if (popoverRoot) {
        const _c = popoverRoot(parent)
        if (_c) {
          root = _c
        }
      }
      const dataParent = parent.getBoundingClientRect()
      const dataRoot = root.getBoundingClientRect()

      const _state = () => {
        const left = dataRoot.left - dataParent.left
        const expectedHeight = 350 - (subHeader === 'hide' ? 30 : 0)
        const windowLast = window.innerHeight - 10
        if (+dataParent.bottom +  expectedHeight < windowLast) {
          return {
            additionalClass: '',
            position: {
              left: left,
              top: dataRoot.bottom - dataParent.top
            }
          }
        }

        if (+dataRoot.top +  expectedHeight < windowLast) {
          return {
            additionalClass: '',
            position: {
              left: left,
              top: dataRoot.top - dataParent.top
            }
          }
        }

        /** try to go above */
        let topPoint = dataRoot.top - expectedHeight
        if (topPoint > 10) {
          return {
            additionalClass: ' hw-calendar-popover-above',
            position: {
              left: left,
              bottom: dataParent.bottom - dataRoot.top
            }
          }
        }

        topPoint = dataRoot.bottom - expectedHeight
        if (topPoint > 5) {
          return {
            additionalClass: ' hw-calendar-popover-above',
            position: {
              left: left,
              bottom: dataParent.bottom - dataRoot.bottom
            }
          }
        }

        return {
          additionalClass: ' hw-calendar-popover-above',
          position: {
            left: left,
            bottom: dataParent.bottom - (expectedHeight + 5)
          }
        }

      }

      setState({
        ...state,
        ...{
          panel: 'D',
          visible: true,
          closeAction: false,
          ..._state()
        }
      })
    }

  },[visibleState, showType, state, setState,subHeader,popoverRoot])

  const moveMonth = React.useCallback((pos : number) => {
    const date = new Date(state.year,state.month,state.day)
    date.setMonth(state.month + pos)
    setState( {
      ...state,
      ...{
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate()
      }})

  },[state,setState])

  const setPanel = React.useCallback((panel : 'Y'|'M'|'D') => {
    setState({
      ...state,
      ...{
        panel:panel
      }
    })
  },[state,setState])

  const clickDataHandler = (e : React.MouseEvent<HTMLElement>) => {
    let target = e.target as any
    while (target) {
      if (target.tagName.toUpperCase() === 'DIV' && target.hasAttribute('calendar-data')) {
        const data = target.getAttribute('calendar-data')
        switch (state.panel) {
          case 'D':
            setState({
              ...state,
              ...(() => {
                const date = new Date(state.year,state.month,state.day)
                date.setDate(data)
                return {
                  year: date.getFullYear(),
                  month: date.getMonth(),
                  day: date.getDate(),
                  closeAction: true
                }
              })()
            })
            return
          case 'Y':
            setState({
              ...state,
              ...(() => {
                const date = new Date(state.year,state.month,state.day)
                date.setFullYear(data)
                return {
                  year: date.getFullYear(),
                  month: date.getMonth(),
                  day: date.getDate(),
                  panel: 'D' as any
                }
              })()
            })
            return

          case 'M':
            setState({
              ...state,
              ...(() => {
                const date = new Date(state.year,state.month,state.day)
                date.setMonth(data)
                return {
                  year: date.getFullYear(),
                  month: date.getMonth(),
                  day: date.getDate(),
                  panel: monthsNextPanel === 'D' ? 'D' : 'Y' as any
                }
              })()
            })
            return
        }
      }
      if ((target.classList as any).contains('hw-calendar-data')) {
        return
      }
      target = target.parentElement
    }
  }

  const rootClass = React.useMemo(() => {
    const classes = `hw-calendar-root${className ? ` ${className}` : ''}${showType === 'modal' ? ' hw-calendar-type-model' : (showType === 'popover' ? ' hw-calendar-popover' : '')}`
    return ` ${classes}${state.visible ? ' hw-calendar-show' : ''}${state.additionalClass}`
  },[className,showType,state.visible,state.additionalClass])

  const style = React.useMemo(() => {
    if (showType === 'popover') {
      return {
        ...state.position
      }
    }
    return {}
  },[showType,state])
  return (
    <div className={rootClass}  style = {style}  ref={(ele) => myId.current = ele as any}>
      <CalendarHeader state={state} locales={locales} setPanel={setPanel} moveMonth={moveMonth}/>
      <div className={'hw-calendar-data'}  onClick={clickDataHandler}>
        {
          state.panel === 'M' ? <CalendarPanelMonths locales={locales}  month={state.month}/> : (
            state.panel === 'Y' ? <CalendarPanelYears year={state.year} maxDate={maxDate as Date} minDate={minDate as Date}/> :   <CalendarPanelDays locales={locales} active={state.day} month={state.month} year={state.year} startDay={startDay === 'SUN' ? 0 : 1}/>
          )
        }
      </div>
    </div>
  )
}

export default Calendar

Calendar.defaultProps = {
  day: (new Date()).getDate(),
  month: (new Date()).getMonth(),
  year: (new Date()).getFullYear(),
  minDate:(new Date(2000,1,1,0 ,0 ,0 )),
  maxDate: (new Date(2100,0,0)),
  monthsNextPanel: 'D',
  panel: 'D',
  'show-type': 'component',
  'visible-state': 'hide',
  'start-day': 'SUN',
  'sub-header': 'hide'
}
