import ReactDOM      from 'react-dom'
import React         from 'react'
import {DialogError} from '../Dialog/DialogBasic'

const openDialog = (elemHolder : any, Component : any) => {
  ReactDOM.render(Component, elemHolder)
}

export const EasyDialog = (f : any) => {
  const elemHolder = document.createElement('div')
  document.body.appendChild(elemHolder)
  const closeDialog = () => {
    ReactDOM.unmountComponentAtNode(elemHolder)
    setTimeout(() => {
      document.body.removeChild(elemHolder)
    })
  }
  setTimeout(() => {
    f(closeDialog, openDialog.bind(null, elemHolder))
  })
}

export const easyDialogError = (message : string) => {

  EasyDialog( (closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      return (
        <>
          <DialogError text={message} buttonLabel={'OK'} actionButton={closeDialog}  closeAction={closeDialog}/>
        </>
      )
    }
    openDialog(<Component/>)
  })
}

