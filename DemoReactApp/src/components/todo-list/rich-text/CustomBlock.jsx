import React from 'react';
import PropTypes from 'prop-types';
import {
    ContentState,
    ContentBlock,
} from 'draft-js';

export const entityTypes = {
    image: 'image'
};

const CustomBlock = ({ contentState, block }) => {
    const entity = contentState.getEntity(block.getEntityAt(0));
    const entityType = entity.getType();
    if (entityType === entityTypes.image) {
        const { src } = entity.getData();
        return (<img src={src} />);
    }
    else {
        return (<span>Unknown block</span>);
    }
};

CustomBlock.propTypes = {
    contentState: PropTypes.instanceOf(ContentState).isRequired,
    block: PropTypes.instanceOf(ContentBlock).isRequired
};

export { CustomBlock };