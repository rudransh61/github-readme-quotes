import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DiscordButton from './DiscordButton';

test('clicking the Discord button redirects to the correct URL', () => {
  const { getByAltText } = render(<DiscordButton />);
  const discordButton = getByAltText('Discord Logo');

  // Mock the window.location.href setter
  delete window.location;
  window.location = { href: '' };
  const { href } = window.location;

  fireEvent.click(discordButton);

  // Check if the URL has changed to the Discord URL
  expect(href).toBe('https://discord.gg/2nN2VqwNaK');
});
