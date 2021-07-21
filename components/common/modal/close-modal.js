import React from 'react'
import { useModal } from "components/common/modal";


const CloseButton = ({children: child}) => {
  const { close } = useModal();
  return  React.cloneElement(
    child,
    {onClick: close }
  )
}

export default CloseButton
