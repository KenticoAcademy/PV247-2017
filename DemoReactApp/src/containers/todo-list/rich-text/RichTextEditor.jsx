import React from 'react';
import PropTypes from 'prop-types';
import {
    EditorState,
} from 'draft-js';
import { RichTextEditor as RichTextEditorComponent } from '../../../components/todo-list/rich-text/RichTextEditor.jsx';

export class RichTextEditor extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty()
        };
    }

    _onChange = (editorState) => {
        this.setState({
            editorState
        });
    };

    render() {
        return (
            <RichTextEditorComponent
                className={this.props.className}
                editorState={this.state.editorState}
                onChange={this._onChange}
            />
        );
    }
}