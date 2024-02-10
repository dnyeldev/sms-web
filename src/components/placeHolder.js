import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import {
  arrayOf, bool, node, number, oneOfType,
} from 'prop-types';

export default function Index({ children, loading, rowSet }) {
  function list() {
    const Items = [];
    for (let i = 0; i < rowSet; ++i) {
      Items.push(<Item />);
    }

    return Items;
  }

  if (loading) {
    return (
      <Card>
        <Card.Body>
          {list()}
        </Card.Body>
      </Card>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-fragments, react/jsx-no-useless-fragment
    <React.Fragment>{children}</React.Fragment>
  );
}

function Item() {
  return (
    <Placeholder as={Card.Text} animation="glow">
      <Placeholder xs={7} />
      {' '}
      <Placeholder xs={4} />
      {' '}
      <Placeholder xs={4} />
      {' '}
      <Placeholder xs={6} />
      {' '}
      <Placeholder xs={8} />
    </Placeholder>
  );
}

Index.defaultProps = {
  rowSet: 3,
};

Index.propTypes = {
  rowSet: number,
  loading: bool.isRequired,
  children: oneOfType([arrayOf(node), node]).isRequired,
};
