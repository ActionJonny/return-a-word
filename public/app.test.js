/*** @jest-environment jsdom */

jest.mock('node-fetch', () => jest.fn());
import { getRandomWord } from './script.js';

describe('getRandomWord', () => {
  it('should fetch a word, capitalize it, and update the DOM', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue('hello'),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    document.body.innerHTML = '<p class="word-container"></p>';

    await getRandomWord();

    expect(document.querySelector('.word-container').textContent).toBe('Hello');
    expect(global.fetch).toHaveBeenCalledWith('/word');
  });

  it('should handle errors and display an error message', async () => {
    const mockResponse = { ok: false };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    document.body.innerHTML = '<p class="word-container"></p>';

    await getRandomWord();

    expect(document.querySelector('.word-container').textContent).toBe('There was an error getting your word.');
    expect(global.fetch).toHaveBeenCalledWith('/word');
  });
});