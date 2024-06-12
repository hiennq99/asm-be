// const express = require('express');
// const axios = require('axios');
import express from "express";
import axios from "axios";

const app = express();
const servers = [
  {
    "url": "https://does-not-work.perfume.new",
    "priority": 1
  },
  {
    "url": "https://gitlab.com",
    "priority": 4
  },
  {
    "url": "http://app.scnt.me",
    "priority": 3
  },
  {
    "url": "https://offline.scentronix.com",
    "priority": 2
  }
]

app.get('/', async (req, res) => {
  try {
    const server = await findServer();
    res.send(`Online server with lowest priority: ${server.url}`);
  } catch (error) {
    res.status(500).send('No servers are online');
  }
});

export const findServer = async () => {
  const requests = servers.map(server => {
    return axios.get(server.url, { timeout: 5000 })
      .then(() => server)
      .catch(() => null);
  });

  const responses = await Promise.all(requests);
  const onlineServers = responses.filter(server_1 => server_1 !== null);
  if (onlineServers.length === 0) {
    throw new Error('No servers are online');
  }
  return onlineServers.reduce((prev, curr) => prev.priority < curr.priority ? prev : curr);
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
