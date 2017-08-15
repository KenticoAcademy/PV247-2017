import React from 'react';
import PropTypes from 'prop-types';
import {
    ItemPane,
    ItemBar,
    TitlePane,
    Title,
    ActionPane,
    Action,
    DangerAction
} from './TodoListItemStyles';

function TodoListItem(props) {
    return (
        <ItemPane>
            <ItemBar>
                <ActionPane>
                    <Action onClick={() => props.onExpand(props.item.id)}>
                        <i className="glyphicon glyphicon-menu-down" aria-hidden="true" />
                    </Action>
                </ActionPane>
                <TitlePane onClick={() => props.onExpand(props.item.id)}>
                    <Title>{props.item.title}</Title>
                </TitlePane>
                <ActionPane>
                    <DangerAction onClick={() => props.onDelete(props.item.id)}>
                        <i className="glyphicon glyphicon-remove" aria-hidden="true" />
                    </DangerAction>
                </ActionPane>
            </ItemBar>
        </ItemPane>
    );
}

TodoListItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired
};

export { TodoListItem };