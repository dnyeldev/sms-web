import React from 'react';

export default function selectTicketStatus({ onChange }) {
  return (
    <select
      className="form-select"
      aria-label="select status"
      onChange={(e) => onChange(e.target.value)}
      placeholder="Select Status"
      defaultValue=""
    >
      <option value="">All Status</option>
      <option value="OPEN">Open</option>
      <option value="CLOSED">Closed</option>
    </select>
  );
}
