import gql           from 'graphql-tag'
import {ApolloCache} from 'apollo-cache'

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
             id
             fkPortId
             lastStatus
             createdAt
             initStatus
             lastStatus
             updatedAt
             arrivalDate
             departureDate
          }
      }
  `,

  PORT_HISTORY : gql`
    query portHistory($portCallId: Int!) {
        data: portHistory(portCallId: $portCallId) {
            id
            fkPortId
            initStatus
            lastStatus
            arrivalDate
            departureDate
            createdAt
            updatedAt
        }
    }
  `
}

export {
  QUERY
}
