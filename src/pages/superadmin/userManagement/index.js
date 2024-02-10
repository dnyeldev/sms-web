import React, { useState } from 'react';
import { DashboardTemplate } from '../../../template/components';
import UserList from './userList';
import UserForm from './userForm';

export default function Index() {
  const [showForm, setShowForm] = useState(false);

  return (
    <DashboardTemplate>
      { !showForm ? (
        <UserList
          onClickAdd={() => setShowForm(true)}
        />
      ) : (
        <UserForm
          onSuccess={() => setShowForm(false)}
          onCancel={() => setShowForm(false)}
        />
      )}
    </DashboardTemplate>
  );
}
