import { saveItemsFactory } from './saveItems';
import { createNewItemFactory } from './actionCreators';
import { uuid } from '../../utils/uuidGenerator';

export const createNewItem = createNewItemFactory(uuid());

function setItemToStorage(key, value) {
    localStorage.setItem(key, value);
}

export const saveItems = saveItemsFactory(setItemToStorage);