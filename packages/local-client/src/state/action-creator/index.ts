import axios from 'axios';
import { Dispatch } from 'redux';

import {
  MoveCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  UpdateCellAction,
  Directions,
  Action,
} from '../action';
import { ActionType } from '../action-type';
import { Cell, CellTypes } from '../cell';
import { RootState } from '../';

import bundler from '../../bundler';

export const moveCell = (id: string, direction: Directions): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const insertCellAfter = (
  id: string | null,
  type: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundler(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          error: result.err as string,
        },
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });

    try {
      const { data }: { data: Cell[] } = await axios.get('/cells');

      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data,
      });
    } catch (error) {
      if (error instanceof Error)
        dispatch({
          type: ActionType.FETCH_CELLS_ERROR,
          payload: error.message,
        });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const data = getState().cells;

    const cells = data?.order.map((id) => data.data[id]);

    try {
      await axios.post('/cells', { cells });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: ActionType.SAVE_CELLS_ERROR,
          payload: error.message,
        });
      }
    }
  };
};
