import * as Immutable from 'immutable';
import {
    EditorState,
    ContentState
} from 'draft-js';
import { uuid } from './uuidGenerator';
import * as keys from '../constants/localStorageKeys';
import { convertItemFromJson } from './itemStorageConverter';
import { TagDecorator } from './TagDecorator';

const firstId = uuid();
const secondId = uuid();

const buildDescription = (text) => EditorState.createWithContent(ContentState.createFromText(text), TagDecorator);

const firstItem = {
    id: firstId,
    title: 'Wash dishes',
    description: buildDescription('Not again!'),
};

const secondItem = {
    id: secondId,
    title: 'Kill spider',
    description: buildDescription('All lives matter'),
};

const allIds = Immutable.List([firstId, secondId]);
const byId = Immutable.Map([[firstId, firstItem], [secondId, secondItem]]);

export const getInitialItems = () => {
    const storedMapJSON = localStorage.getItem(keys.ITEMS_BY_ID);
    const storedListJSON = localStorage.getItem(keys.ITEMS_ALL_IDS);

    const itemsById = storedMapJSON
        ? Immutable.Map(JSON.parse(storedMapJSON))
            .mapEntries(([key, value]) => [key, convertItemFromJson(value)])
            .toMap()
        : byId;

    return {
        allIds: storedListJSON ? Immutable.List(JSON.parse(storedListJSON)) : allIds,
        byId: itemsById,
    };
};
