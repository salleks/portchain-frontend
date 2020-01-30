import React, {
  HTMLAttributes,
  PropsWithoutRef
}                        from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquare}        from '@fortawesome/free-regular-svg-icons'

import {faCheckSquare} from '@fortawesome/free-solid-svg-icons'

export interface ICheckBoxProps extends PropsWithoutRef<HTMLAttributes<HTMLInputElement>>{
  'component-direction' ? : 'row' | 'column' | 'column-reverse' | 'row-reverse'
  label ? : string
  value ? : string | boolean
  disabled ?: boolean
}

const CheckBox = (props : ICheckBoxProps) => {
  const {'component-direction': direction, value, label,className, onChange, disabled } = props

  const onClickHandler = (e : React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      return
    }
    if (onChange) {
      const event = {
        persist: () => {},
        target:{
          value: !value as any
        }
      } as any
      onChange(event)
    }
  }

  return (
    <div className={`hw-check-box-root flex-direction-${direction}${className ? ` ${className}` : ''}${disabled ? ' hw-disabled' : ''}`} >
      <div className={`hw-check-box-data${disabled ? ' hw-disabled' : ''}`} onClick={onClickHandler}>
        <FontAwesomeIcon icon={faCheckSquare}  className={`hw-check-box-icon ${value ? 'hw-visible' : 'hw-invisible'}`}/>
        <FontAwesomeIcon icon={faSquare}  className={`hw-check-box-icon ${value ? 'hw-invisible' : 'hw-visible'}`} />
      </div>
      <div className={'hw-check-box-label'}>
        {label}
      </div>
    </div>
  )
}

CheckBox.defaultProps = {
  'component-direction' : 'row'
}

export default CheckBox
