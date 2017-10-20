import PropTypes from 'prop-types';
import {
    DragSource,
    DropTarget
} from 'react-dnd';
import { EditorState } from 'draft-js';
import { TodoListBarItem as TodoListBarItemComponent } from '../../components/todo-list/TodoListBarItem.jsx';

const todoItemDragSourceSpecs = {
    beginDrag(props) {
        props.onDragStarted();
        return { draggedItemId: props.item.id };
    },

    endDrag(props) {
        props.onDragEnded();
    },

    canDrag(props) {
        return !props.reorderDisabled;
    }
};

function collectDragSourceProps(connect) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
    };
}

const todoItemDropTargetSpecs = {
    hover(props, monitor) {
        const draggedItemId = monitor.getItem().draggedItemId;
        const hoveredItemId = props.item.id;

        if (draggedItemId !== hoveredItemId) {
            props.onReorder(draggedItemId, hoveredItemId);
        }
    }
};

function collectDropTargetProps(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

const DndTodoListBarItem = DragSource('TodoItem', todoItemDragSourceSpecs, collectDragSourceProps)(
    DropTarget('TodoItem', todoItemDropTargetSpecs, collectDropTargetProps)(TodoListBarItemComponent));

DndTodoListBarItem.propTypes = {
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
    onDragStarted: PropTypes.func.isRequired,
    onDragEnded: PropTypes.func.isRequired
};

export { DndTodoListBarItem as TodoListBarItem };
