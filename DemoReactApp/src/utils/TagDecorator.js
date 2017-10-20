import { CompositeDecorator } from 'draft-js';
import { TagSpan } from '../components/todo-list/rich-text/RichTextEditor.styles.jsx';

function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

export const TagDecorator = new CompositeDecorator([
    {
        strategy: (contentBlock, callback) => {
            findWithRegex(/#[a-zA-Z0-9]+/g, contentBlock, callback);
        },
        component: TagSpan
    }
]);