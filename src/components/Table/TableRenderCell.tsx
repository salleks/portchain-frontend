import React             from 'react'
import {
  faEdit,
  faTimesCircle
} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

interface ITableCommandsFieldProps {
  preventEdit : boolean
  preventDelete : boolean
}

export const TableActionCell : React.FC<Partial<ITableCommandsFieldProps>> = ({preventDelete, preventEdit}) => {

  return (
    <div className={'hw-table-cell-action'}>
      { preventEdit ? <></> :   <FontAwesomeIcon icon={faEdit} data-action={'edit'}  />  }
      { preventDelete ? <></> : <FontAwesomeIcon icon={faTimesCircle} data-action={'delete'}  /> }
    </div>
  ) 
}
