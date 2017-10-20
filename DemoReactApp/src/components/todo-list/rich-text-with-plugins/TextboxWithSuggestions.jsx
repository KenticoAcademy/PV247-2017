import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';
import { EditorBorder } from '../rich-text/RichTextEditor.styles.jsx';

import 'draft-js-mention-plugin/lib/plugin.css';

export class TextboxWithSuggestions extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        editorState: PropTypes.instanceOf(EditorState).isRequired,
        onChange: PropTypes.func.isRequired,
        suggestions: PropTypes.instanceOf(Immutable.List).isRequired,
        onSearchChange: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.mentionPlugin = createMentionPlugin();
        this.plugins = [this.mentionPlugin];
    }

    render() {
        const { MentionSuggestions } = this.mentionPlugin;
        return (
            <EditorBorder className={this.props.className}>
                <Editor

                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                    plugins={this.plugins}
                />
                <MentionSuggestions
                    suggestions={this.props.suggestions}
                    onSearchChange={this.props.onSearchChange}
                />
            </EditorBorder>
        );
    }
}