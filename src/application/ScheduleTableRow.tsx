import React        from 'react'
import {
  IScheduleTableRowData,
  PORT_CALL_STATUS
}                   from './definitions'
import {formatDate} from './utils'

const ScheduleTableRow = (data : IScheduleTableRowData) => {
  return (
    <div className={'schedule-grid-row'} onClick={() => data.handlerTableClick(data.port,data.id)}>
      <div>{data.port ? data.port.name : ''} <small>{data.id}</small>  -  <small>   {data.port ? data.port.id : ''}</small></div>
      <div className={'port-unique-name'}>{data.port ? data.port.portUniqueStr : ''}</div>
      <div>{formatDate(data.arrivalDate)}</div>
      <div>{formatDate(data.departureDate)}</div>
      <div className={'port-unique-name'}>{PORT_CALL_STATUS[data.initStatus]}</div>
      <div className={'port-unique-name'}>{PORT_CALL_STATUS[data.lastStatus]}</div>
      <div>{formatDate(data.createdAt)}</div>
      <div>{formatDate(data.updatedAt)}</div>
    </div>
  )
}

export default ScheduleTableRow
