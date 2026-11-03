/* global it */
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import Section from './Section';

it('renders without crashing', () => {
  const div = document.createElement('div');
  act(() => {
    createRoot(div).render(<Section title='Section one' description='Defines some stuff.'><h1>Hello!</h1></Section>);
  });
});
