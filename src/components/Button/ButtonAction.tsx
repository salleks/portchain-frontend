import React          from 'react'
import {IButtonProps} from './Button'
import {Button}       from './index'

export interface IButtonActionProps extends IButtonProps{
  space ?:  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 ,
}

const ButtonAction = ({label,fullWidth,color,space} : IButtonActionProps) => {
  const classRoot = React.useMemo(() => {
    const arr = ['hw-button-action-root']
    space && arr.push(`hw-button-action-space-${space}`)
    return arr.join(' ')
  },[space])
  return (
    <div className={classRoot}>
      <Button
        label={label}
        fullWidth={fullWidth}
        color={color}
        outline
      />
    </div>
  )
}

ButtonAction.defaultProps = {
  space: 6
}

export default ButtonAction
