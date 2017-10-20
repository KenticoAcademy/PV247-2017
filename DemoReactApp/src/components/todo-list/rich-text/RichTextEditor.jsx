import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState } from 'draft-js';
import { EditorBorder } from './RichTextEditor.styles.jsx';

const RichTextEditor = ({
    className,
    editorState,
    onChange,
    onBoldClicked,
}) => (
    <EditorBorder className={className}>
        <button
            className="btn btn-sm btn-default"
            onClick={onBoldClicked}
        >
            Bold
        </button>
        <Editor
            editorState={editorState}
            onChange={onChange}
        />
    </EditorBorder>
);

RichTextEditor.propTypes = {
    className: PropTypes.string,
    editorState: PropTypes.instanceOf(EditorState).isRequired,
    onChange: PropTypes.func.isRequired,
    onBoldClicked: PropTypes.func.isRequired,
};

export { RichTextEditor };