import { useEffect } from "react"

import CodeEditor from "../CodeEditor"
import Preview from "../Preview"
import Resizable from "../Resizable"

import { useActions } from "../../hooks/use-actions"
import { Cell } from "../../state"
import { useTypedSelector } from '../../hooks/use-typed-selector'
import { useCumulativeCode } from '../../hooks/use-cumulative-code'

import './CodeCell.css'

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FunctionComponent<CodeCellProps> = (props) => {

    const bundle = useTypedSelector((state) => state.bundles![props.cell.id])

    const { updateCell, createBundle } = useActions()

    const cumulativeCode = useCumulativeCode(props.cell.id)

    useEffect(() => {

        if (!bundle) {
            createBundle(props.cell.id, cumulativeCode)
            return
        }

        const timer = setTimeout(async () => {

            createBundle(props.cell.id, cumulativeCode)

        }, 1000)

        return () => {
            clearTimeout(timer)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createBundle, cumulativeCode, props.cell.id])



    return (
        <Resizable direction="vertical">
            <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue={props.cell.content}
                        onChange={(value) => updateCell(props.cell.id, value)}
                    />
                </Resizable>
                <div className='progress-wrapper'>
                    {
                        !bundle || bundle.loading ?
                            <div className='progress-cover'>
                                <progress className='progress is-primary is-small' max='100'>
                                    loading
                                </progress>
                            </div>
                            : <Preview code={bundle.code} err={bundle.error} />
                    }
                </div>
            </div>
        </Resizable>
    )
}

export default CodeCell
