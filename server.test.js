import { findServer } from './server'
import axios from 'axios';

jest.mock('axios');

describe('findServer', () => {
  it('should resolve with the online server with the lowest priority', async () => {
    axios.get.mockResolvedValueOnce();
    axios.get.mockRejectedValueOnce();
    axios.get.mockResolvedValueOnce();

    const server = await findServer();
    console.log(server)

    expect(server).toEqual({ url: 'https://does-not-work.perfume.new', priority: 1 });
  });

  it('should reject with an error if no servers are online', async () => {
    axios.get.mockRejectedValueOnce();
    axios.get.mockRejectedValueOnce();
    axios.get.mockRejectedValueOnce();

    await expect(findServer()).rejects.toThrow('No servers are online');
  });
});