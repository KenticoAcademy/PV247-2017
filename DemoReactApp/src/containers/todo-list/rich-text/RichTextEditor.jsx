import React from 'react';
import PropTypes from 'prop-types';
import {
    EditorState,
    RichUtils,
    AtomicBlockUtils,
} from 'draft-js';
import { RichTextEditor as RichTextEditorComponent } from '../../../components/todo-list/rich-text/RichTextEditor.jsx';
import { TagDecorator } from '../../../utils/TagDecorator';
import { CustomBlock, entityTypes } from '../../../components/todo-list/rich-text/CustomBlock.jsx';

const imageUrl = 'http://dogecoin.com/imgs/dogecoin-300.png';

export class RichTextEditor extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(TagDecorator)
        };
    }

    _onChange = (editorState) => {
        this.setState({
            editorState
        });
    };

    _onBoldClicked = () => {
        const newEditorState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
        this._onChange(newEditorState);
    };

    _onImageInsert = () => {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(entityTypes.image, 'IMMUTABLE', { src: imageUrl });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity }
        );
        this._onChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
    };

    _getBlockRenderer = (block) => {
        if (block.getType() === 'atomic') {
            return {
                component: CustomBlock,
                editable: false,
            };
        }

        return null;
    };

    render() {
        return (
            <RichTextEditorComponent
                className={this.props.className}
                editorState={this.state.editorState}
                onChange={this._onChange}
                onBoldClicked={this._onBoldClicked}
                onImageInsert={this._onImageInsert}
                getBlockRenderer={this._getBlockRenderer}
            />
        );
    }
}