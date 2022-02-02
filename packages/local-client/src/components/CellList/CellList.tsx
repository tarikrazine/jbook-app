import { Fragment, useEffect } from "react"

import { useTypedSelector } from "../../hooks/use-typed-selector"

import CellListItem from "../CellListItem"
import AddCell from "../AddCell"

import { useActions } from "../../hooks/use-actions"

import './CellList.css'

const CellList: React.FunctionComponent = () => {

    const cells = useTypedSelector((state) => {
        return state.cells?.order.map(id => {
            return state.cells?.data[id]
        })
    })

    const { fetchCells } = useActions()

    useEffect(() => {
        fetchCells()
    }, [])

    const renderCells = cells?.map(cell =>

        <Fragment key={cell?.id}>
            <CellListItem cell={cell} />
            <AddCell previousCellId={cell?.id as string} />
        </Fragment>
    )

    return (
        <div className='cell-list'>
            <AddCell forceVisible={cells?.length === 0} previousCellId={null} />
            {renderCells}
        </div>
    )
}

export default CellList
