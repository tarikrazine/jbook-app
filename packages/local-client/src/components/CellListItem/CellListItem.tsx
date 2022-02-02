import { Cell } from "../../state"
import CodeCell from "../CodeCell"
import TextEditor from '../TextEditor'
import ActionBar from '../ActionBar'

import './CellListItem.css'

interface CellListItemProps {
    cell?: Cell
}

const CellListItem: React.FunctionComponent<CellListItemProps> = (props) => {

    let Child: JSX.Element;

    if (props.cell?.type === 'code') {
        Child = <>
            <div className='action-bar-wrapper'>
                <ActionBar id={props.cell?.id} />
            </div>
            <CodeCell cell={props.cell} />
        </>
    } else {
        Child = <div>
            <TextEditor cell={props.cell} />
            <ActionBar id={props.cell?.id} />
        </div>
    }

    return (
        <div className='cell-list-item'>
            {Child}
        </div>
    )
}

export default CellListItem
