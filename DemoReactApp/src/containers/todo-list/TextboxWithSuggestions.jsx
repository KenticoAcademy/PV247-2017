import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { EditorState } from 'draft-js';
import { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import { TextboxWithSuggestions as TextboxWithSuggestionsComponent } from '../../components/todo-list/rich-text-with-plugins/TextboxWithSuggestions.jsx';
import * as routes from '../../constants/routes';

const mentions = Immutable.fromJS([
    {
        name: 'Pepa',
        link: routes.PROFILE,
        avatar: 'assets/no-profile.png',
    },
    {
        name: 'Karel',
        link: routes.PROFILE,
        avatar: 'assets/no-profile.png',
    },
    {
        name: 'Franta',
        link: routes.PROFILE,
        avatar: 'assets/no-profile.png',
    },
]);

export class TextboxWithSuggestions extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        editorState: PropTypes.instanceOf(EditorState).isRequired,
        onChange: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);

        this.state = {
            suggestions: mentions,
        };
    }

    _onSearchChange = ({ value }) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, mentions),
        });
    };

    render() {
        return (
            <TextboxWithSuggestionsComponent
                className={this.props.className}
                editorState={this.props.editorState}
                onChange={this.props.onChange}
                suggestions={this.state.suggestions}
                onSearchChange={this._onSearchChange}
            />
        );
    }
}