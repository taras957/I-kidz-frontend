import React,{useRef}  from 'react'
import { useResizeObserver } from "hooks/useResizeObserver";

const ContentWidth = React.createContext()

const ContentWidthProvider  = ({children}) => {
    const ref = useRef(null);
    const [width] = useResizeObserver(ref);


    return (
        <ContentWidth.Provider value={width}>
        <div  ref={ref} >
            {children}
        </div>
        </ContentWidth.Provider>

    )
}

export default ContentWidthProvider


export const useContentWidth = () => {
    const context = React.useContext(ContentWidth)
       
    return context

}