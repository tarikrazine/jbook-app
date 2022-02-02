import { useRef, useEffect } from 'react'

import { htmlCode } from './Html'

import './Preview.css'

interface PreviewProps {
    code: React.SetStateAction<string>
    err: React.SetStateAction<any>
}

const Preview: React.FunctionComponent<PreviewProps> = (props) => {

    const iframeRef = useRef<string | any>()

    useEffect(() => {

        iframeRef.current.srcdoc = htmlCode

        setTimeout(() => {
            iframeRef.current.contentWindow.postMessage(props.code, '*')
        }, 50)

    }, [props.code])


    return (
        <div className='preview-wrapper'>
            <iframe
                title="Preview Code"
                ref={iframeRef}
                sandbox="allow-scripts"
                srcDoc={htmlCode}
            />
            {props.err && <div className='preview-error'>{props.err?.message}</div>}
        </div>
    )
}

export default Preview
