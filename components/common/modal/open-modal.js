import React from 'react'
import { useModal } from "components/common/modal";


const OpenButton = ({children:child}) => {
  const { open } = useModal();

  return  React.cloneElement(
    child,
    {onClick: open }
  )
}

export default OpenButton
