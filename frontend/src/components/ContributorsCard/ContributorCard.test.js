import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ContributorsCard from './ContributorsCard';

// Mocking the fetch function
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ id: 1, login: 'user1', avatar_url: 'url1' }, { id: 2, login: 'user2', avatar_url: 'url2' }]),
    })
  );
});

afterAll(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

test('renders contributors card', async () => {
  render(<ContributorsCard />);
  
  // Wait for fetch to be called and component to update
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  
  // Check if the card content is rendered
  expect(screen.getByText('A Special Thanks To All The Contributors!')).toBeInTheDocument();
  
  // Check if the number of contributors is rendered
  expect(screen.getByText('To our 2 contributors for helping in')).toBeInTheDocument();
  
  // Check if avatar images are rendered
  expect(screen.getAllByAltText('user1')).toHaveLength(1);
  expect(screen.getAllByAltText('user2')).toHaveLength(1);
  
  // Check if the "More Details Here" button is rendered
  expect(screen.getByRole('button', { name: 'More Details Here' })).toBeInTheDocument();
});
