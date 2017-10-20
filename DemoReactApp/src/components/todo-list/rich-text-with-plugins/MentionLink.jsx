import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MentionLink = ({ entityKey, mention, className, decoratedText }) => (
    <Link key={entityKey} className={className} to={mention.get('link')}>
        {decoratedText}
    </Link>
);

MentionLink.propTypes = {
    entityKey: PropTypes.string.isRequired,
    mention: PropTypes.object.isRequired,
    className: PropTypes.string,
    decoratedText: PropTypes.string.isRequired,
};

export { MentionLink };