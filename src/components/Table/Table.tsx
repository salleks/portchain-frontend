import React, {useState} from 'react'
import TableHeader       from './TableHeader'
import TableDataRow            from './TableDataRow'
import _ from 'lodash'
import {
  ITableHeaderCellProps,
  ITableProps
}        from './interfaces'

const _getDataRowObject = (data : object,index : number,header : ITableHeaderCellProps[],notShowHeader ?: boolean) => {
  return {
    index: index,
    model: data,
    header: header,
    notShowHeader: notShowHeader
  }
}

const Table = ({tableComponentState, setSorting,header, data, handlerEventDataClick, notShowHeader, separator} : ITableProps) => {

  const onClickHandler = (event : React.MouseEvent<HTMLTableSectionElement, MouseEvent>) => {
    let action : string = ''
    let target : HTMLElement | null = event.target as HTMLSelectElement
    while (target.tagName !== 'TR' && target.tagName !== 'TABLE') {
      if (target.hasAttribute('data-action') && !action) {
        action = target.getAttribute('data-action') as string
      }
      target = target.parentElement
      if (!target) {
        break
      }
    }

    if (target && target.tagName === 'TR') {
      const id = target.hasAttribute('data-model-id') ? target.getAttribute('data-model-id') : void(0)
      if (id && handlerEventDataClick) {
        handlerEventDataClick(event,id,action)
      }
    }
  }

  const modelFields = header.map(x => {
    return x.field || ''
  })
  const tableData = !data ? [] : data.map(x =>  _.pick(x,[...modelFields,...['id']]))

  const tableRootClass = React.useMemo(() => {
    const array = ['hw-table-root']
    if (separator) {
      switch (separator) {
        case 'vertical':
        case 'horizontal':
        case 'cell':
          array.push(`hw-tbl-separator-${separator}`)
      }
    }
    return array.join(' ')
  },[separator])

  return (
    <table className = {tableRootClass} >
      <TableHeader
        notShowHeader={notShowHeader}
        header ={header}
        tableComponentState={tableComponentState}
        setSorting ={setSorting}
      />
      <tbody onClick={(e) => onClickHandler(e)}>
        {
          tableData.map((x : object ,index : number) => {
            const opt = _getDataRowObject(x,index,header,notShowHeader)
            return (  <TableDataRow key ={index}  { ...opt  } />  )
          })
        }
      </tbody>
    </table>
  )
}

export default Table

export interface IUseTableStateSorting {
  field ?: string
  direction : 'ASC' | 'DESC'
}
export interface IUseTableComponentState {
  sorting : IUseTableStateSorting
}

export const useTableComponent = (startState ?: IUseTableComponentState) => {

  const [state, setState] : [IUseTableComponentState, (r : IUseTableComponentState) => void] = useState(startState ? startState : {} as IUseTableComponentState )

  const setSorting = React.useCallback((field : string, direction : 'ASC' | 'DESC') => {
    setState({
      ...state,
      sorting: {
        field: field,
        direction:direction
      },
    })
  },[state,setState])

  return {
    tableState: state,
    setSorting
  }

}
