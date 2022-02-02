import { useEffect, useRef, useState } from "react"

import MDEditor from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize";

import { Cell } from "../../state"
import { useActions } from '../../hooks/use-actions'

import './TextEditor.css'

interface TextEditorProps {
    cell?: Cell
}

const TextEditor: React.FunctionComponent<TextEditorProps> = (props) => {

    const ref = useRef<HTMLDivElement | null>(null)

    const [editing, setEditing] = useState(false)

    const { updateCell } = useActions()

    useEffect(() => {

        const clickListener = (event: MouseEvent) => {

            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                return
            }

            setEditing(false)
        }

        document.addEventListener('click', clickListener, { capture: true })

        return () => {
            document.removeEventListener('click', clickListener, { capture: true })
        }
    }, [])

    if (editing) {
        return (
            <div className="text-editor" ref={ref}>
                <MDEditor
                    value={props.cell?.content}
                    onChange={(v) => updateCell(props.cell!.id, v || '')}
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                    }}
                />
            </div>
        )
    }
    return (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className='card-content'>
                <MDEditor.Markdown
                    source={props.cell?.content || 'Click to edit!'}
                    rehypePlugins={[[rehypeSanitize]]}
                />
            </div>
        </div>
    )
}

export default TextEditor
