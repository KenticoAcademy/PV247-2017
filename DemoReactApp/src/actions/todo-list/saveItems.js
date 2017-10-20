import * as keys from '../../constants/localStorageKeys';
import {
    savingFinished,
    savingStarted
} from './actionCreators';
import { convertItemToJson } from '../../utils/itemStorageConverter';

export const saveItemsFactory = (setItemToStorage) => () =>
    (dispatch, getState) => {
        dispatch(savingStarted());
        setTimeout(() => {
            const { byId } = getState().todoApp.items;
            setItemToStorage(keys.ITEMS_ALL_IDS, JSON.stringify(getState().todoApp.items.allIds.toJS()));

            const convertedById = byId.mapEntries(([key, value]) => [key, convertItemToJson(value)]);
            setItemToStorage(keys.ITEMS_BY_ID, JSON.stringify(convertedById.toJS()));

            dispatch(savingFinished());
        }, 1000);
    };
