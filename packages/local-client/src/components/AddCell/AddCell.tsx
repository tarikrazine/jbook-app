import { useActions } from '../../hooks/use-actions'

import './AddCell.css'

interface AddCellProps {
    previousCellId: string | null
    forceVisible?: boolean
}

const AddCell: React.FunctionComponent<AddCellProps> = (props) => {

    const { insertCellAfter } = useActions()

    return (
        <div className={`add-cell ${props.forceVisible && 'force-visible'}`} >
            <div className='add-buttons'>
                <button
                    className='button is-rounded is-primary is-small' onClick={() => insertCellAfter(props.previousCellId, 'code')}
                >
                    <span className='icon is-small'>
                        <i className='fas fa-plus'></i>
                    </span>
                    <span>
                        Code
                    </span>
                </button>
                <button
                    className='button is-rounded is-primary is-small'
                    onClick={() => insertCellAfter(props.previousCellId, 'text')}
                >
                    <span className='icon is-small'>
                        <i className='fas fa-plus'></i>
                    </span>
                    <span>
                        Text
                    </span>
                </button>
                <div className='divider'></div>
            </div>
        </div>
    )
}

export default AddCell