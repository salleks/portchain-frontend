import React                 from 'react'
import * as _                from 'lodash'
import {
  ITableCellFeatures,
  ITableDataCellProps
} from './interfaces'

const TableDataCell = ({value, cell,model,field,index} : ITableDataCellProps) => {

  const { style:innerStyle, render:Render, renderProps } = cell as ITableCellFeatures
  const {classes,format} = cell!

  const classRoot= React.useMemo(()=>{
       if(!classes) return  'hw-table-data-cell'
       return ['hw-table-data-cell',...classes].join(' ')
  },[classes])

  return Render ? (
    <td className={classRoot} style={innerStyle}>
      <Render {...renderProps} value={value} index={index}/>
    </td>
  ) : (
    <td className={classRoot} style={innerStyle}>
      {format ? format(value,index, model, field) : value}
    </td>
  )
}

TableDataCell.defaultProps = {
    cell: {}
}

export default TableDataCell

