import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button } from 'react-bootstrap';
import { func } from 'prop-types';

export default function Index({ onClick }) {
  return (
    <Button variant="default" className="btn btn-sm" onClick={onClick}>
      <FontAwesomeIcon icon={solid('list')} />
      {' '}
      Load More
    </Button>
  );
}

Index.propTypes = {
  onClick: func.isRequired,
};
