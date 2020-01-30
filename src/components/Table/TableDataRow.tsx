import React                                                            from 'react'
import _                                                                from 'lodash'
import TableDataCell                                                    from './TableDataCell'
import {
  ITableCellFeatures,
  ITableDataCellProps,
  ITableDataRowProps,
  ITableHeaderCellProps,
} from './interfaces'

const _getDataCellObject = (model : any, index : number, headerRow : ITableHeaderCellProps) : ITableDataCellProps => {
  const data = _.get(model, headerRow.field || '')
  return {
    index: index,
    field: headerRow.field || '',
    model: model,
    value: data,
    cell: headerRow.cell || ({} as ITableCellFeatures)
  }
}

const TableDataRow = ({model, header,index} : ITableDataRowProps) => {

  return (
    <tr className={'hw-table-data-row'} data-model-id={model.id}>
      {
        header.map((h, ind : number) => {
          const props = _getDataCellObject(model, index, h)
          return <TableDataCell key={ind} {...props } />
        })
      }
    </tr>
  )
}

export default TableDataRow
