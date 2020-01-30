import React, {
  PropsWithoutRef,
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState
}                        from 'react'
import {IconProp}        from '@fortawesome/fontawesome-svg-core'
import Label             from '../basic/Label'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faCheck
}                        from '@fortawesome/free-solid-svg-icons'
import HelperText        from '../basic/HelperText'

export interface ISelectChooseOptions {
  label : string
  value ?: string
  description ?: string
  icon ?: IconProp
}

export interface ISelectProps extends PropsWithoutRef<SelectHTMLAttributes<HTMLSelectElement>> {
  error ?: string | boolean
  label : string
  helperText ?: string
  options : ISelectChooseOptions[] | string[]
}

const SelectOption = ({selection, selected, label,value,description,icon,placeholder} : Partial<ISelectChooseOptions> & {selection ?: boolean, selected ?: any, placeholder ?: string}) => {

  return (
    <div hw-comp-select-option-value ={value} className={`hw-select-option ${selection ? 'main-selection' : ''}`}>
      <div className={'hw-select-icon'}>
        <div>{icon ? <FontAwesomeIcon icon={icon}/> : null}</div>
      </div>
      {!selection && (selected === value) ?
        <div className={'hw-select-icon right'}>
          <FontAwesomeIcon icon={faCheck}/>
        </div> : null}

      {selection ?
        <div className={'hw-select-icon main-icon-arrow'}>
          <FontAwesomeIcon icon={faCaretDown}/>
        </div> : null}

      <div className={'hw-select-data'}>
        <div className={`hw-select-label ${description ? 'hw-select-desc' : ''} ${(label === void(0) && placeholder) ? 'hw-select-placeholder' : ''}`}>{label ? label : placeholder}</div>
        { description ?    <div className={'hw-select-description'}>{description}</div> : null  }
      </div>
    </div>
  )
}

enum SELECT_STATE {
  CLOSE,
  CREATE,
  SHOW
}
interface ISelectStateOpen {
  visible : SELECT_STATE
  top   : number
  left ?  : number,
  height ? : number,
  x ?: number,
  y ? : number
}

interface ISelectDropDownProps {
  value ? : string|string[]|number,
  options : ISelectChooseOptions[],
  onChange ? : (e : React.ChangeEvent<HTMLSelectElement>) => void,
  stateOpen : ISelectStateOpen,
  setOpened : (r : ISelectStateOpen) => void
}

const SelectDropDown = ({value,options, onChange,stateOpen,setOpened} : ISelectDropDownProps) =>  {

  const myId = useRef()

  useEffect(() => {
    if (stateOpen.visible === SELECT_STATE.CREATE) {
      const windowLast = window.innerHeight - 10
      const myRealPos = (myId.current as any).getBoundingClientRect().bottom - 20000
      const moveUp = () => {
        const move = windowLast < myRealPos ? (myRealPos - windowLast) : 0
        return (move < 5) ?  0 : (move < 40 ? 40 : move)
      }
      setOpened({
        ...stateOpen,
        ...{
          visible: SELECT_STATE.SHOW,
          top: stateOpen.top - moveUp()
        }
      })
      return
    }
  })

  useEffect(() => {
    const fn = () => {
      setOpened({
        visible : SELECT_STATE.CLOSE,
        top: 0
      })
    }
    window.addEventListener('click', fn, false)
    return () => {
      window.removeEventListener('click', fn, false)
    }

  },[setOpened])

  const  onClickHandler = React.useCallback((e : React.MouseEvent<HTMLElement>) => {
    let target = e.target as any
    while (target) {
      if (target.tagName.toUpperCase() === 'DIV' && target.hasAttribute('hw-comp-select-option-value')) {
        onChange && onChange( {
          persist: () => {},
          target:{
            value: target.getAttribute('hw-comp-select-option-value')
          }
        } as React.ChangeEvent<HTMLSelectElement>)
        break
      }
      target = target.parentElement
    }
  },[onChange])

  const style = {
    top: `${stateOpen.visible === SELECT_STATE.CREATE ? (20000 + stateOpen.top) : stateOpen.top}px`,
    left:`${stateOpen.left}px`,
    maxHeight: `${stateOpen.height}px`
  }

  return (
    <div   ref={(ele) => myId.current = ele as any} className = {`hw-select-choose-section ${stateOpen.visible === SELECT_STATE.SHOW ? 'select-show' : ''}`} onClick = {onClickHandler} style={style}>
      {
        options.map( (option,index) =>  <SelectOption {...option}  key = {index}  selected={value}/> )
      }
    </div>
  )
}

const Select = ({className,label,error,required,options,value,placeholder, onChange,helperText} : ISelectProps) => {
  const [opened, setOpened] : [ISelectStateOpen,(r : ISelectStateOpen) => void]  = useState({visible: SELECT_STATE.CLOSE ,top: 0, left: 0} as ISelectStateOpen)

  const  onClickHandlerOpen = (e : React.MouseEvent<HTMLElement>) => {

    let target = e.target as any
    while (target) {
      if (target.tagName.toUpperCase() === 'DIV' && (target.classList as any).contains('hw-select-option')) {
        break
      }
      target = target.parentElement
    }
    if (target) {
      const targetDataInner = target.getBoundingClientRect()
      while (target) {
        if ((target.tagName.toUpperCase() === 'DIV') && ((target.classList as any).contains('hw-select-root'))) {
          break
        }
        target = target.parentElement
      }
      if (target) {
        const targetDataOuter = target.getBoundingClientRect()
        setOpened({
          visible: opened.visible === SELECT_STATE.CLOSE ? SELECT_STATE.CREATE : SELECT_STATE.CLOSE,
          top: (targetDataInner.bottom - targetDataOuter.top) + 4,
          left:(targetDataInner.left - targetDataOuter.left),
          height:  Math.floor(window.innerHeight * 0.96),
          x: targetDataInner.x,
          y: targetDataInner.bottom
        })
      }
    }
  }

  const optionsSelect = React.useMemo(() : ISelectChooseOptions[] => {
    return (options as []).map( (x : any) => {
      if (typeof x === 'string') {
        return {
          label : x,
          value :x
        } as ISelectChooseOptions
      }
      return {
        label: x.label,
        value: x.value === void(0) ? x.label : x.value,
        icon: x.icon,
        description: x.description
      }
    })
  },[options])

  const propsSelected : Partial<ISelectChooseOptions> = React.useMemo(() => {
    const data = optionsSelect.find(x => x.value === value)
    return data ? data : {
      label: undefined
    }
  },[value,optionsSelect])

  return (
    <div className={`hw-select-root${className ? ` ${className}` : ''}`} >
      <Label
            label = {label}
            required = {required}
            error = {error}
      />
      <div onClick = {onClickHandlerOpen} className={`hw-select-selected ${error ? 'error' : ''}`}>
        <SelectOption {...propsSelected} selection placeholder={placeholder}/>
      </div>
      { opened.visible !== SELECT_STATE.CLOSE ?  <SelectDropDown value={value} options ={optionsSelect} onChange={onChange} stateOpen={opened} setOpened={setOpened}/> : null }
      <HelperText
            error = {error}
            text = {helperText}
      />
    </div>
  )

}

export  default  Select
