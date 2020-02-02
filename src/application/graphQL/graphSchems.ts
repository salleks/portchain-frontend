import gql from 'graphql-tag'

gql`
   scalar DateTime

  type PortCall {
    id: ID!
    arrivalDate: DateTime!
    departureDate: DateTime!
    initStatus: Int!
    lastStatus: Int!
    validSequence: Int!
    fkPortCallId: Int
    fkPortId: Int!
    fkVesselId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    }

  type PortCallHistory {
    id: ID!
    arrivalDate: DateTime!
    departureDate: DateTime!
    initStatus: Int!
    lastStatus: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`

const portCallDetails = gql`
  fragment portCallDetails on PortCall {
      id
      arrivalDate
      departureDate
      initStatus
      lastStatus
      validSequence
      fkPortCallId
      fkPortId
      fkVesselId
      createdAt
      updatedAt
   }
`

const QUERY = {
  VESSELS: gql`
              query vessels{
                data:vessels{
                   id
                   name
                }
              }
            `,

  VESSELS_PORTS : gql`
     query schedulePorts($vessel: Int!) {
          data:schedulePorts(vessel: $vessel) {
             id
             name
             portUniqueStr
          }
      }
  `,

  VESSEL_SCHEDULE : gql`
     query validSchedule($vessel: Int!) {
          data:validSchedule(vessel: $vessel) {
             ...portCallDetails
          }
      }
      ${portCallDetails}
  `,

  PORT_HISTORY : gql`
    query portHistory($portCallId: Int!) {
        data: portHistory(portCallId: $portCallId) {
            id
            initStatus
            lastStatus
            departureDate
            arrivalDate
            createdAt
            updatedAt
        }
    }   
  `
}

export {
  QUERY
}
