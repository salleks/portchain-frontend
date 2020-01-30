import React                   from 'react'
import {ITableHeaderCellProps} from './interfaces'
import Table                   from './Table'
import {TableActionCell}       from './TableRenderCell'

const data1 = {
  header : [
    {
      field: 'name',
      cell: {
        style: {
          color: 'blue'
        }
      }
    },
    {
      field: 'tax'
    },
    {
      field: 'price',
      cell: {
        style: {
          paddingLeft: '8px'
        },
      }
    },
    {
      cell: {
        render: TableActionCell
      }
    }
  ],
  data :[
    {
      id: 1,
      name: 'Some name 1',
      tax: 1,
      price: 1234
    },
    {
      id: 2,
      name: 'Some name 2',
      tax: 2,
      price: 2234.09
    }
  ],
  handlerEventDataClick: (event : React.MouseEvent<HTMLTableSectionElement, MouseEvent>,id : string, action ?: string) => {
    console.log('event', event,  id, action)
  }
}

export default () => {

  return (
    <div>
      <Table  {...data1}  separator={ 'cell' } />
    </div>
  )
}
