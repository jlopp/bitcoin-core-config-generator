/* global it */
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import Preview from './Preview';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const defaults = {
    __internal: {
      platform: 'Linux'
    }
  };
  act(() => {
    createRoot(div).render(<Preview settings={{}} defaults={defaults} />);
  });
});
