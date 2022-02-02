import { useEffect, useState } from "react"

import { ResizableBox, ResizableBoxProps } from "react-resizable"

import './Resizable.css'

interface ResizableProps {
    children?: React.ReactNode[] | React.ReactNode
    direction: 'horizontal' | 'vertical'
}

const Resizable: React.FunctionComponent<ResizableProps> = (props) => {

    const [innerHeight, setInnerHeight] = useState(window.innerHeight)
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [width, setWidth] = useState(window.innerWidth * 0.75)

    useEffect(() => {

        let timer: ReturnType<typeof setTimeout>

        const innerSizeListener = () => {

            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight)
                setInnerWidth(window.innerWidth)

                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75)
                }

            }, 100);

        }

        window.addEventListener('resize', innerSizeListener)

        return () => {
            window.removeEventListener('resize', innerSizeListener)
        }
    }, [width])

    let resizableProps: ResizableBoxProps

    if (props.direction === 'horizontal') {

        resizableProps = {
            className: 'resize-horizontal',
            height: Infinity,
            width,
            resizeHandles: ['e'],
            minConstraints: [innerWidth * 0.2, Infinity],
            maxConstraints: [innerWidth * 0.75, Infinity],
            onResizeStop: (_event, data) => {
                setWidth(data.size.width)
            }
        }

    } else {

        resizableProps = {
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
            minConstraints: [Infinity, 28],
            maxConstraints: [Infinity, innerHeight * 0.9],
        }

    }

    return (
        <ResizableBox {...resizableProps}>
            {props.children}
        </ResizableBox>
    )
}

export default Resizable
