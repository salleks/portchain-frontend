import React             from 'react'
import {faSpinner}       from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {SizeProp}        from '@fortawesome/fontawesome-svg-core'

interface ISpinnerProps {
  classNames ?: string,
  pulse ?: boolean,
  size ?: SizeProp
}

const Spinner1 = ({classNames,pulse,size} : ISpinnerProps) => {
  const style : any = {
    top: (window.innerHeight / 2) - 40 + 'px',
    left: (window.innerWidth / 2) - 40 + 'px',
  }

  return (
    <div style={style} className={`hw-spinner ${classNames ? classNames : ''}`}>
      <FontAwesomeIcon icon={faSpinner} spin size={size ? size : '4x'} pulse={pulse} />
    </div>
  )
}

export default Spinner1
