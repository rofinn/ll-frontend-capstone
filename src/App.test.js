import {MemoryRouter as Router} from "react-router-dom";
import { render, screen } from '@testing-library/react';
import App, {updateTimes, initializeTimes} from './App';

test('renders learn react link', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const linkElement = screen.getByText(/Little Lemon Restaurant/i);
  expect(linkElement).toBeInTheDocument();
});

test('updateTimes', () => {
  // Happy case
  const state = ["Select a time"];
  var action = {type: 'get_available_times', date: '2023-10-12'};
  var expected = [
    '2023-10-12T17:00',
    '2023-10-12T18:00',
    '2023-10-12T19:00',
    '2023-10-12T20:00',
    '2023-10-12T21:00',
    '2023-10-12T22:00',
  ];
  expect(updateTimes(state, action)).toEqual(expected)

  // Failure cases
  action = {type: 'foobar', date: '2023-10-12'};
  expect(() => updateTimes([], action)).toThrow(Error);

  action = {date: '2023-10-12'};
  expect(() => updateTimes([], action)).toThrow(Error);

  action = {type: 'get_available_times', day: '2023-10-12'};
  expect(() => updateTimes([], action)).toThrow(Error);

  // Undefined case cause we're just using strings and validation occurs in the form
  action = {type: 'get_available_times', date: 'foobar'};
  expected = [
    'foobarT17:00',
    'foobarT18:00',
    'foobarT19:00',
    'foobarT20:00',
    'foobarT21:00',
    'foobarT22:00',
  ];
  expect(updateTimes([], action)).toEqual(expected);
});

test('initializing times', () => {
  expect(initializeTimes()).toEqual(["Select a time"])
});
