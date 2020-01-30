import React                  from 'react'
import Grid                   from '../components/Grid/Grid'
import {
  IPortHistoryProps,
  PORT_CALL_STATUS
}                             from './definitions'
import {useQuery}             from '@apollo/react-hooks'
import {QUERY}                from './graphQL'
import {SpinnerLoadingCenter} from '../components/Spinner/SpinnerLoading'
import {formatDate}           from './utils'

const PortHistory = ({portCallId} : IPortHistoryProps) => {

  const {data: portHistory, error: errorPortHistory, loading: loadingPortHistory} = useQuery(QUERY.PORT_HISTORY,{
    variables: {
      portCallId: +portCallId
    },
    skip: !portCallId
  })
  console.log('portCallId',portCallId)
  return (
    <div className={'port-history-root'}>
      {
        loadingPortHistory ?

          (
            <SpinnerLoadingCenter/>
          )

          : (
            <Grid container flex-align-items={'center'}>
              <div className={'schedule-grid'}>
                <div className={'schedule-grid-row grid-header'}>
                  <div>Status</div>
                  <div>Date</div>
                  <div>Arrival date</div>
                  <div>Departure date</div>
                </div>
                {
                  portHistory.data.map((x : any,key : number) => {
                    const date = key !== portHistory.data.length - 1 ? formatDate(x.createdAt) : formatDate(x.updatedAt)
                    const status = key === portHistory.data.length - 1 ? PORT_CALL_STATUS[x.lastStatus] : PORT_CALL_STATUS[x.initStatus]
                    let arrivalDate = ''
                    let departureDate = ''
                    if (x.initStatus === 8 || key === 0) {
                      arrivalDate = formatDate(x.arrivalDate)
                      departureDate = formatDate(x.departureDate)
                    }

                    return (
                      <div key={key} className={'schedule-grid-row'}>
                        <div>{status}</div>
                        <div>{date}</div>
                        <div>{arrivalDate}</div>
                        <div>{departureDate}</div>
                      </div>
                    )
                  })
                }
              </div>
            </Grid>
          )

      }
    </div>
  )
}

export default PortHistory
