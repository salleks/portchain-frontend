import React from 'react'

interface ILabelProps {
  label : string,
  required ?: boolean,
  error ?: boolean|string
}

const Label = ({label,required,error} : ILabelProps) => {
  return (
    <label className={`hw-label ${error ? 'error' : ''}`}>{label} {required ?
      <small className={'required'}>*</small> : null}</label>
  )
}

export default React.memo(Label)
