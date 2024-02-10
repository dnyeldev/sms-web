import React from 'react';
import { Alert } from 'react-bootstrap';

export default function AlertDismissible({ error, title = 'Login Error!', onClose }) {
  return (
    <Alert variant="danger" onClose={onClose} dismissible>
      <Alert.Heading>{title}</Alert.Heading>
      <p>{error}</p>
    </Alert>
  );
}
