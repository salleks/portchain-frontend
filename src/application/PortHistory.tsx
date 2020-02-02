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

export interface IPortCallHistoryData {
  status : string
  time : string
  arrivalDate : string
  departureDate : string
}

const PortHistory = ({portCallId} : IPortHistoryProps) => {

  const {data: portHistory, error: errorPortHistory, loading: loadingPortHistory} = useQuery(QUERY.PORT_HISTORY,{
    variables: {
      portCallId: +portCallId
    },
    skip: !portCallId
  })

  const dataFinal = React.useMemo(() => {
    let arrivalLast : Date | undefined = undefined
    let departureLast : Date | undefined = undefined

    if (!portHistory || !portHistory.data) {
      return []
    }

    const arrivalDateString = (date : Date) => {
      if (!arrivalLast || arrivalLast != date) {
        arrivalLast = date
        return formatDate(date)
      }
      return ''
    }

    const departureDateString = (date : Date) => {
      if (!departureLast || departureLast != date) {
        departureLast = date
        return formatDate(date)
      }
      return ''
    }

    return portHistory.data.reduce((arr : any[],p : any) => {
      console.log(p)

      arr.push({
        status: PORT_CALL_STATUS[p.initStatus],
        time: formatDate(p.createdAt),
        arrivalDate: arrivalDateString(p.arrivalDate),
        departureDate: departureDateString(p.departureDate)
      })

      if (p.lastStatus === PORT_CALL_STATUS.DELETED) {
        arr.push({
          status: PORT_CALL_STATUS[p.lastStatus],
          time: formatDate(p.updatedAt),
          arrivalDate: '',
          departureDate: '',
        })

        arr.push({
          status: '',
          time: '',
          arrivalDate: '',
          departureDate: '',
        })

        arrivalLast = undefined
        departureLast = undefined
      }

      if (p.lastStatus === PORT_CALL_STATUS.PROCESSED) {
        arr.push({
          status: PORT_CALL_STATUS[p.lastStatus],
          time: formatDate(p.updatedAt),
          arrivalDate: '',
          departureDate: '',
        })
        arrivalLast = undefined
        departureLast = undefined
      }
      return arr
    },[])
  },[portHistory])

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
                  dataFinal.map((x : any,key : number) => {
                    return (
                      <div key={key} className={'schedule-grid-row'}>
                        <div>{x.status}</div>
                        <div>{x.time}</div>
                        <div>{x.arrivalDate}</div>
                        <div>{x.departureDate}</div>
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
