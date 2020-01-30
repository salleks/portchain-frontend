import React, {ButtonHTMLAttributes} from 'react'
import {IconProp}                    from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon}             from '@fortawesome/react-fontawesome'

export interface IButtonProps extends React.PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  label : string,
  color ?: 'primary' | 'secondary' | 'success' | 'danger' | 'info',
  size  ?: 'sm' |'lg',
  fullWidth ?: boolean,
  outline ?: boolean,
  classNames ?: string,
  icon ?: IconProp,
  iconRight ?: IconProp,
  glossy ?: boolean,
}

interface IButtonIconsProps {
  icon ?: IconProp,
  iconRight ?: IconProp
}

const ButtonIcons = React.memo(({icon,iconRight} : IButtonIconsProps) => {
  return (
    <>
      {icon ? <FontAwesomeIcon icon={icon} className={'button-icon'}/> : null}
      {iconRight ? <FontAwesomeIcon icon={iconRight} className={'button-icon-right'}/> : null}
    </>
  )
},((prevProps, nextProps) => {

  if ( prevProps.icon !== nextProps.icon || prevProps.iconRight !== nextProps.iconRight) {
    return false
  }
  return true
}))

const Button = (props : IButtonProps) => {
  const {label,color,size,outline,fullWidth,classNames,icon,iconRight,glossy,...rest} = props

  const rootClass = React.useMemo(() => {
    return `button-root${color ? ` ${color}` : ''}${size ? ` ${size}` : ''}${fullWidth ?  ' full-width' : ''}${outline ? ' outline' : ''}${glossy ? ' glossy' : ''}${props.disabled ? ' disabled' : ''}${classNames ? ` ${classNames}` : ''}`
  }, [fullWidth, color, size,outline, glossy,props.disabled])

  return (
    <button {...rest} className={rootClass}>
      <ButtonIcons icon={icon} iconRight={iconRight} />
      {label}
    </button>
  )
}

export default Button
