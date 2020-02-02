import React, {
  useEffect,
  useState
}                             from 'react'
import Grid                   from '../components/Grid/Grid'
import {Select}               from '../components/Select'
import {
  ApolloProvider,
  useApolloClient,
  useQuery
}                             from '@apollo/react-hooks'
import {QUERY}                from './graphQL'
import ScheduleTableRow       from './ScheduleTableRow'
import {
  IPortModel,
  IScheduleTableRowData
}                             from './definitions'
import {SpinnerLoadingCenter} from '../components/Spinner/SpinnerLoading'
import {EasyDialog}           from '../components/EasyModel/EasyModal'
import PortHistory    from './PortHistory'
import {CenteredDialog}       from '../components/Dialog/DialogBasic'

export interface  IPortChainState {
  vessel : string
}

const ApplicationDashboard = () => {

  const [vessel,setVessel] : [IPortChainState,(r : IPortChainState) => void] = useState({} as IPortChainState)

  const apolloClient = useApolloClient()

  const {data,error,loading}  = useQuery(QUERY.VESSELS,{
    notifyOnNetworkStatusChange: true
  })

  const {data: dataPorts, error: errorPorts, loading: loadingPorts} = useQuery(QUERY.VESSELS_PORTS,{
    variables: {
      vessel: +vessel.vessel
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    skip: !vessel.vessel
  })

  const {data: dataSchedule, error: errorSchedule, loading: loadingSchedule} = useQuery(QUERY.VESSEL_SCHEDULE,{
    variables: {
      vessel: +vessel.vessel
    },
    skip: !vessel.vessel
  })

  useEffect(() => {
    if (!data || !data.data || vessel.vessel || data.data.length === 0) {
      return
    }
    setVessel({
      vessel: data.data[0].id.toString()
    })
  },[data])

  const handlerOnChangeVessel = (event : React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setVessel({
      vessel: value
    })
  }

  const optionsVessel = React.useMemo(() => (!data || !data.data) ? [] :
    data.data.map((x : any) => {
      return {
        label: x.name,
        value: x.id.toString(),
        description: x.id.toString()
      }
    })
  ,[data])

  const allPorts = React.useMemo(() =>  (!dataPorts || !dataPorts.data || dataPorts.data.length === 0) ? [] :  dataPorts.data ,[dataPorts])

  const dataOfSchedule = React.useMemo(() => (!dataSchedule || !dataSchedule.data) ? [] : dataSchedule.data,[dataSchedule])

  const getPort = React.useCallback((port : number) =>  allPorts.find((x : any) => +x.id === +port),[dataPorts])

  const handlerTableClick = (port : IPortModel,portCallId : number) => {
    openDialogPortHistory(port,portCallId,apolloClient)
  }

 /* setTimeout(() => {
    openDialogPortHistory({id:30,name:'Antwerpen',portUniqueStr:'BEANR'},420,apolloClient)
  },3000)*/

  return (
    <div className={'application-dashboard-root'}>
      {loading || loadingPorts || loadingSchedule ? <SpinnerLoadingCenter/> : <></>}

      <Grid container>
        <Grid container>
          <Grid size={1}></Grid>
          <Grid size={2}>
            <Select
                          label={'Choose Vessel'}
                          value={vessel.vessel}
                          options={optionsVessel}
                          onChange={handlerOnChangeVessel}
            />
          </Grid>
        </Grid>
        <Grid container flex-align-items={'center'}>
          <Grid size={1}></Grid>
          <Grid size={10}>
            <div className={'schedule-grid main-schedule-grid'}>

              <div className={'schedule-grid-row grid-header'}>
                <div>Port name</div>
                <div className={'port-unique-name'}>ABBR</div>
                <div>Arrival date</div>
                <div>Departure date</div>
                <div className={'port-unique-name'}>Start status</div>
                <div className={'port-unique-name'}>Last status</div>
                <div>First processed</div>
                <div>Last processed</div>
              </div>
              {
                dataOfSchedule.map((x : IScheduleTableRowData,index : number) => {
                  return (
                    <ScheduleTableRow
                      handlerTableClick={handlerTableClick}
                      port={getPort(x.fkPortId)}
                      {...x}
                      key={index}
                    />
                  )
                })
              }
            </div>
          </Grid>
          <Grid size={1}></Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default ApplicationDashboard

const openDialogPortHistory = (port : IPortModel, portCallId : number,apolloClient : any) => {

  EasyDialog((closeDialog : () => any, openDialog : (data : any) => any) => {

    const Component = () => {
      const ComponentToRender = () => {
        return (
          <ApolloProvider client={apolloClient}>
            <PortHistory portCallId={portCallId} />
          </ApolloProvider>
        )
      }
      return (
        <>
          <CenteredDialog
                title={'History port - ' + port.name + ' / ' + port.portUniqueStr}
                closeAction={closeDialog}
                Component={ComponentToRender}
                actionButtons={
                  [
                    {
                      onClick:closeDialog,
                      label: 'Close',
                      color: 'primary'
                    }
                  ]
                }

          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}

