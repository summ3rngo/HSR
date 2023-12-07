import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SearchBar from './components/SearchBar';

let options;
let filteredOptions;
let setOptionsMock;

beforeEach(() => {
    options = [
        { name: 'Blade' },
        { name: 'HuoHuo' },
        { name: 'Bailu' }
    ];
    filteredOptions = [...options];
    setOptionsMock = jest.fn();
});

test('1. Renders the SearchBar component', () => {
  render(<SearchBar />);
  const searchBarElement = screen.getByPlaceholderText('Search for character');
  expect(searchBarElement).toBeInTheDocument();
});

test('2. Checks initial input state', () => {
  render(<SearchBar />);
  const searchBarElement = screen.getByPlaceholderText('Search for character');
  expect(searchBarElement).toHaveValue('');
});

test('3. Tests input change', async () => {
  render(<SearchBar />);
  const searchBarElement = screen.getByPlaceholderText('Search for character');
  fireEvent.change(searchBarElement, { target: { value: 'test' } });
  await waitFor(() => {
    expect(searchBarElement).toHaveValue('test');
  });
});

test("4. input triggers a delayed call to setOptions", () => {
  jest.useFakeTimers();
  const { getByPlaceholderText } = render(
      <SearchBar options={options} setOptions={setOptionsMock} filteredOptions={filteredOptions} />
  );

  const input = getByPlaceholderText('Search for character');
  fireEvent.change(input, { target: { value: 'Character1' } });

  expect(setOptionsMock).not.toHaveBeenCalled();
  jest.advanceTimersByTime(1000);
  expect(setOptionsMock).toHaveBeenCalled();
  jest.useRealTimers();
});

test("5. setOptions updates with filtered characters based on input", () => {
  const { getByPlaceholderText } = render(
      <SearchBar options={options} setOptions={setOptionsMock} />
  );

  const input = getByPlaceholderText('Search for character');
  fireEvent.change(input, { target: { value: 'Character' } });

  setTimeout(() => {
      expect(setOptionsMock).toHaveBeenCalledWith(options);
  }, 1000);
});

