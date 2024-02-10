import React from 'react';

export default function SelectRole({ onSelect }) {
  return (
    <select
      className="form-select"
      aria-label="select role"
      onChange={(e) => {
        if (e.target.value) {
          onSelect(e.target.value);
        } else {
          onSelect(null);
        }
      }}
    >
      <option value="" selected>All Roles</option>
      <option value="SUPERADMIN">Super Admin</option>
      <option value="MARKETING_ADMIN">Marketing Admin</option>
      <option value="PARTNER_MERCHANT">Partner Merchant</option>
      <option value="SUPPORT">Support</option>
    </select>
  );
}
