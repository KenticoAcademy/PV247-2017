import React from 'react';
import PropTypes from 'prop-types';
import {
    EditorState,
    RichUtils,
    AtomicBlockUtils,
} from 'draft-js';
import { RichTextEditor as RichTextEditorComponent } from '../../../components/todo-list/rich-text/RichTextEditor.jsx';
import { CustomBlock, entityTypes } from '../../../components/todo-list/rich-text/CustomBlock.jsx';

const imageUrl = 'http://dogecoin.com/imgs/dogecoin-300.png';

export class RichTextEditor extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        editorState: PropTypes.instanceOf(EditorState).isRequired,
        onChange: PropTypes.func.isRequired,
    };

    _onBoldClicked = () => {
        const newEditorState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
        this.props.onChange(newEditorState);
    };

    _onImageInsert = () => {
        const { onChange, editorState } = this.props;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(entityTypes.image, 'IMMUTABLE', { src: imageUrl });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity }
        );
        onChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
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
                editorState={this.props.editorState}
                onChange={this.props.onChange}
                onBoldClicked={this._onBoldClicked}
                onImageInsert={this._onImageInsert}
                getBlockRenderer={this._getBlockRenderer}
            />
        );
    }
}