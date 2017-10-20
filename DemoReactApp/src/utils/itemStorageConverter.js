import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { TagDecorator } from './TagDecorator';

export const convertItemToJson = (item) => {
    return {
        ...item,
        description: convertToRaw(item.description.getCurrentContent())
    };
};

export const convertItemFromJson = (item) => {
    return {
        ...item,
        description: EditorState.createWithContent(convertFromRaw(item.description), TagDecorator)
    };
};