/* global it */
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import Modal from './Modal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  act(() => {
    createRoot(div).render(<Modal />);
  });
});
