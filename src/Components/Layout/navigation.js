import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../../Context';
import UserRole from '../../Config/role';

export default function Navigation() {
  function getNavigationItems(role) {
    switch (role) {
      case UserRole.Admin.name:
        return [
          {
            name: 'Admin Menu I',
            link: '/',
          },
          {
            name: 'Admin Menu II',
            link: '/',
          },
        ];
      case UserRole.Regular.name:
        return [
          {
            name: 'User Menu I',
            link: '/',
          },
          {
            name: 'User Menu II',
            link: '/',
          },
        ];
      default:
        return [
          {
            name: 'default',
            link: '/',
          },
        ];
    }
  }

  const user = useAuthState();
  const role = user.userDetails.role;
  const navigationItems = getNavigationItems(role);

  return (
    <ul className="nav nav-pills navbar-right side-bar">
      {navigationItems.map((r) => (
        <li key={r.name}>
          <Link
            to={r.link}
            style={{ textDecorationLine: 'none', marginLeft: 30 }}
          >
            {r.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
