export interface IPortModel {
  id : number
  name : string
  portUniqueStr : string
}

export interface IScheduleTableRowData {
  id : number
  handlerTableClick : (port : IPortModel,portCallId : number) => void
  fkPortId : number
  port : IPortModel
  arrivalDate : Date
  departureDate : Date
  lastStatus : number
  initStatus : number
  createdAt : Date
  updatedAt : Date
}

export interface IPortHistoryProps {
  portCallId : number
}

export enum PORT_CALL_STATUS {
  NOT_DEFINED,
  REMOVED,
  DELETED,
  INSERTED,
  ADDED,
  NEW,
  PROCESSED,
  VALID,
  CHANGED
}

