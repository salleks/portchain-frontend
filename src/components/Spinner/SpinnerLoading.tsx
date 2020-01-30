import React             from 'react'
import {faSpinner}       from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {SizeProp}        from '@fortawesome/fontawesome-svg-core'

interface ISpinnerProps {
  classNames ?: string,
  pulse ?: boolean,
  size ?: SizeProp
}

const SpinnerLoading = ({classNames,pulse,size} : ISpinnerProps) => {
  return (
    <div className={`hw-spinner ${classNames ? classNames : ''}`}>
      <FontAwesomeIcon icon={faSpinner} spin size={size ? size : '4x'} pulse={pulse} />
    </div>
  )
}

export const SpinnerLoadingCenter = ({classNames,pulse,size} : ISpinnerProps) => {
  return (
    <div className = 'hw-spinner-center'>
      <div className={`hw-spinner-center-inner ${classNames ? classNames : ''}`}>
        <FontAwesomeIcon icon={faSpinner} spin size={size ? size : '4x'} pulse={pulse} />
      </div>
    </div>
  )
}

export default SpinnerLoading
