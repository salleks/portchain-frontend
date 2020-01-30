import React from 'react'
import {
  ITableHeaderCellProps,
  ITableHeaderProps
}            from './interfaces'

import {FontAwesomeIcon}         from '@fortawesome/react-fontawesome'
import {
    faSortAmountDownAlt,
    faSortAmountUp
}                                from '@fortawesome/free-solid-svg-icons'



interface ITableHeaderCellRenderBasicProps {
    label?: string,
    field?: string
    sortable?: boolean
    align: 'center' | 'left' | 'right'
    sorted ?: 'ASC' |  'DESC'
    setSorting ?: (field: string, direction: 'ASC' | 'DESC')=>void
}

const TableHeaderCellRenderBasic = ({label ,field, sortable,align, sorted, setSorting}: ITableHeaderCellRenderBasicProps) => {
    return (
        <div className={'hw-table-header-th-basic'} >
            <div style={{textAlign: align}}>{label}</div>
            { sortable ?
            <div className={`hw-table-header-th-basic-sort${sorted?' hw-table-header-th-basic-sorted':''}`} onClick={setSorting ? ()=> setSorting(field!,sorted==='DESC'?'ASC':'DESC'): void(0)}>
                <div>
                    {!sorted || sorted === 'DESC' ? <FontAwesomeIcon icon={faSortAmountUp}  /> : <></> }
                </div>
                <div>
                    {!sorted || sorted === 'ASC' ? <FontAwesomeIcon icon={faSortAmountDownAlt} /> : <></> }
                </div>
            </div> : <></> }
        </div>
    )
}

TableHeaderCellRenderBasic.defaultProps = {
      align: 'center'
}

const TableHeaderCell = ({label, field,sortable, sorted, setSorting} : ITableHeaderCellProps) => {

  return (
    <th className={'hw-table-header-th'}>
        <TableHeaderCellRenderBasic label= {label || field } field={field} sortable={sortable}  sorted={sorted} setSorting={setSorting}/>
    </th>
  )
}

TableHeaderCell.defaultProps =  {
      tableState: {}
}

const TableHeader = ({header,notShowHeader, setSorting,tableComponentState} : ITableHeaderProps) => {

  return (
    <thead className={'hw-table-header-root'}>
      <tr className={'hw-table-header-tr'}>
        {
          header.map((elem, index : number) => {
            if (notShowHeader) {
              return <th key={index} ></th>
            }

              const sorted = (()=> {
                  if(!elem.sortable) return void(0)
                  if(!tableComponentState || !tableComponentState.sorting) return void(0)
                  if(tableComponentState.sorting.field !== elem.field) return void(0)
                  return tableComponentState.sorting.direction
              })()

            return <TableHeaderCell key={index} {...elem } setSorting = {setSorting}  sorted={sorted} />
          })
        }
      </tr>
    </thead>
  )
}

TableHeader.defaultProps= {
     tableComponentState: {}
}

export default TableHeader
