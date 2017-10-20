import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import {
    ItemBar,
    TitlePane,
    Title,
    ActionPane,
    Action,
    DangerAction,
    GrabAction
} from './TodoListBarItem.styles';
import { ItemPane} from './TodoListItem.styles';

function ConnectDnd(props) {
    return props.connectFunc(
        <div>
            {props.children}
        </div>
    );
}

ConnectDnd.prototypes = {
    connectFunc: PropTypes.func.isRequired
};

function TodoListBarItem(props) {
    return (
        <ItemPane>
            <ConnectDnd connectFunc={props.connectDropTarget}>
                <ConnectDnd connectFunc={props.connectDragPreview}>
                    <ItemBar disabled={props.expandDisabled}>
                        <ActionPane>
                            <ConnectDnd connectFunc={props.connectDragSource}>
                                <GrabAction disabled={props.reorderDisabled}>
                                    <i className="glyphicon" aria-hidden="true" />
                                </GrabAction>
                            </ConnectDnd>
                            <Action disabled={props.expandDisabled} onClick={props.expandDisabled ? null : props.onExpand}>
                                <i className="glyphicon glyphicon-menu-down" aria-hidden="true" />
                            </Action>
                        </ActionPane>
                        <TitlePane disabled={props.expandDisabled} onClick={props.expandDisabled ? null : props.onExpand}>
                            <Title>{props.item.title}</Title>
                        </TitlePane>
                        <ActionPane>
                            <DangerAction onClick={() => props.onDelete()}>
                                <i className="glyphicon glyphicon-remove" aria-hidden="true" />
                            </DangerAction>
                        </ActionPane>
                    </ItemBar>
                </ConnectDnd>
            </ConnectDnd>
        </ItemPane>
    );
}

TodoListBarItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.instanceOf(EditorState)
    }).isRequired,
    expandDisabled: PropTypes.bool,
    reorderDisabled: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
    onReorder: PropTypes.func.isRequired,

    //React-dnd props
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
};

export { TodoListBarItem };