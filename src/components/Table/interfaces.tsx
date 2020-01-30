import React                            from 'react'
import Table, {IUseTableComponentState} from "./Table";

export interface ITableCellFeatures {
  format?(value : (number|string),index : (number|string),model : any,field : string) : any,
  render ?: React.ComponentType,
  renderProps ?: any,
  style ?: any
  classes?: string[]
}

export interface ITableHeaderCellProps{
  label ?: string,
  field ?: string   // field represent record in object object[field]
  sortable?: boolean
  cell ?: ITableCellFeatures
  sorted?: 'ASC'| 'DESC'
  setSorting ?: (field: string, direction: 'ASC' | 'DESC')=>void
}

export interface ITableDataCellProps {
  index : number,
  field : string,
  model : any,
  value : string
  cell ?: ITableCellFeatures
}

export interface ITableHeaderProps {
  header : ITableHeaderCellProps[]
  notShowHeader ?: boolean
  tableComponentState?: IUseTableComponentState
  setSorting ?: (field: string, direction: 'ASC' | 'DESC')=>void
}

export interface ITableDataRowProps {
  model : any,
  index : number,
  notShowHeader ?: boolean,
  header : ITableHeaderCellProps[]

}

export interface ITableProps {
  notShowHeader ?: boolean,
  separator ?: 'vertical' | 'horizontal'| 'cell'
  header : ITableHeaderCellProps[]
  data : Array<object>
  setSorting ?: (field: string, direction: 'ASC' | 'DESC')=>void,
  tableComponentState?: IUseTableComponentState
  handlerEventDataClick?(event : React.MouseEvent<HTMLTableSectionElement, MouseEvent>,id : string, action ?: string) : void

}

