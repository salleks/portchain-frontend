import React, {
  InputHTMLAttributes,
  PropsWithoutRef
}                         from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Label              from '../basic/Label'
import HelperText         from '../basic/HelperText'
import {IconProp}         from '@fortawesome/fontawesome-svg-core'

interface IInputIconsProps {
  icon ?: IconProp
  iconAction ?: IIconActionProps
}
export interface IIconActionProps {
  icon : IconProp,
  handler ? : (e : React.MouseEvent) => void
}

export interface IInputTextProps extends PropsWithoutRef<InputHTMLAttributes<HTMLInputElement>> {
  error ?: string | boolean
  label : string
  helperText ?: string
  icon ?: IconProp
  iconAction ?: IIconActionProps
  fullWidth ?: boolean,
  inputRef ? : React.Ref<HTMLInputElement>
  align ?: 'align-left' | 'align-center' | 'align-right'
}

export interface IInputTextDatePickerProps extends IInputTextProps{
  format ?: string /** (MMM - long (March)) (MM - short (Mar)) (MM - 2-digit (03)) (dd - 2-digit (01)) ( d - numeric (1)) (yy - 2-digit (12)) (yyyy- numeric (2012) (E - short (Thu)) (EE - long (Thursday))  */
  locales ?: string,
  'start-day' ?: 'MON' | 'SUN',
  'sub-header' ?: 'hide' | 'show',
  'date' ?: Date
}

const InputIcons = React.memo( ({icon,iconAction} : IInputIconsProps) => {
  return (
    <>
      {icon ? <FontAwesomeIcon icon={icon} className={'hw-input-icon'}/> : null}
      {iconAction ? <FontAwesomeIcon
            icon={iconAction.icon}
            className={'hw-input-icon-action'}
            onClick={(e) => {
              iconAction.handler && iconAction.handler(e)
            }}

      /> : null}
    </>
  )
}, ((prevProps, nextProps) => {

  if ( prevProps.iconAction !== nextProps.iconAction) {
    return false
  }
  return true
}))

const InputText = (props : IInputTextProps) => {

  const {error, inputRef, icon, iconAction, fullWidth, label, required, helperText,align, ...rest} = props

  const rootClass = React.useMemo(() => {
    return `hw-input-text-root ${ error ? 'error' : '' } ${ fullWidth ? 'full-width' : '' } ${ props.readOnly ? 'readOnly' : '' }${align ? ` ${align}` : ' align-left'} ${ props.disabled ? 'disabled' : '' }`
  }, [error,fullWidth,props.readOnly, props.disabled])
  return (
    <div className={rootClass}>
      <Label
          label = {label}
          required = {required}
          error = {error}
      />
      <div className={'hw-input-group'}>
        <InputIcons icon={icon} iconAction={iconAction} />
        <input
                    className={'hw-input-text'}
                    ref={inputRef}
                    {...rest}
        />
      </div>
      <HelperText
         error = {error}
         text = {helperText}
      />
    </div>
  )
}

export default InputText
