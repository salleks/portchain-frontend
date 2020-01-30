import React, {ButtonHTMLAttributes} from 'react'
import {IconProp}                    from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon}             from '@fortawesome/react-fontawesome'

export interface IFabButtonProps extends React.PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  color ?: 'primary' | 'secondary' | 'success' | 'danger' | 'info',
  size  ?: 'sm' |'lg',
  outline ?: boolean,
  classNames ?: string,
  icon ?: IconProp,
  glossy ?: boolean
}

const Fab = (props : IFabButtonProps) => {
  const {color,size,outline,classNames,icon,glossy,...rest} = props

  const rootClass = React.useMemo(() => {
    return `hw-fab-button-root${color ? ` ${color}` : ''}${size ? ` ${size}` : ''}${outline ? ' outline' : ''}${glossy ? ' glossy' : ''}${props.disabled ? ' hw-disabled' : ''}${classNames ? ` ${classNames}` : ''}`
  }, [color, size,outline, glossy,props.disabled])

  return (
    <button {...rest} className={rootClass}>
      {icon ? <FontAwesomeIcon icon={icon} className={'hw-button-icon'}/> : null}
    </button>
  )
}

export default Fab
