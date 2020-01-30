import React, {PropsWithChildren} from 'react'
export interface IGridProps extends PropsWithChildren<any>{
  container ?: boolean,
  size ?: 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  'size-lg' ?: 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  'size-md' ?: 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  'size-sm' ?: 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  space ? :   1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 ,
  'space-lg' ? :   1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 ,
  'space-md' ? :   1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 ,
  'space-sm' ? :   1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 ,
  'flex-align-items' ?: 'center' | 'start' | 'end'
}

const Grid = ({'flex-align-items':alignItems,space,'space-lg':spaceLg,'space-md':spaceMd,'space-sm':spaceSm, 'size-lg':sizeLg, 'size-md': sizeMd,'size-sm':sizeSm,size,container,children} : IGridProps) => {

  const classRoot = React.useMemo(() => {
    const arr =  ['grid',`grid-${size}`,`flex-align-items-${alignItems}`, `grid-space-${space}`]
    container && arr.push('container')
    sizeLg &&  arr.push(`grid-lg-${sizeLg}`)
    sizeMd &&  arr.push(`grid-md-${sizeMd}`)
    sizeSm &&  arr.push(`grid-sm-${sizeSm}`)

    spaceLg &&  arr.push(`grid-space-lg-${spaceLg}`)
    spaceMd &&  arr.push(`grid-space-md-${spaceMd}`)
    spaceSm &&  arr.push(`grid-space-sm-${spaceSm}`)

    return arr.join(' ')
  },[container,size,sizeLg, sizeMd, sizeSm,space,spaceLg,spaceMd,spaceSm])

  return (
    <div className={`${classRoot}`}>
      {children}
    </div>
  )
}

Grid.defaultProps = {
  size: 12,
  space: 3,
  'flex-align-items': 'center'
}

export default Grid
