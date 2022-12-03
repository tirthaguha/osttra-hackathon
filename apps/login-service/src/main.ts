/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as path from 'path';
import * as jwt from "jsonwebtoken"

import { validateAuth, orgData, otherOrgs } from '@osttra-hackathon/validate-auth';
import { processNewSwap } from '@osttra-hackathon/process-new-swap';

const secret = "2cbac2c8-d00f-4fd4-b6f1-f974aa88753d"

const app = express();

app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to login-service!' });
});

app.post("/auth", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const status: boolean = validateAuth(username, password)
  if (status) {
    const org = orgData(username);
    const token = jwt.sign({ username: username, org: org }, secret);
    console.log(token);
    res.send({ message: "success", token })
  } else {
    res.status(401).send({ message: "Invalid Username / Password" })
  }
})

app.post("/org-list", (req, res) => {
  const { token } = req.body;
  const { org } = jwt.verify(token, secret);
  const orgData = otherOrgs(org);
  const resData = {
    org, orgData
  }
  res.send(resData);
});


app.post("/new-swap", (req, res) => {
  const { token, data } = req.body;
  const { org } = jwt.verify(token, secret);

  console.log(data);
  processNewSwap(data);
  res.send({ message: "success" });
});

app.post("/swap-data", (req, res) => {
  const data = [
    { creator: 'Morgan Stanley', swapId: "EB5702", actionParty: 'Bank Of America', tenor: 'default', swaptype: 'Equity', creationTime: 'Today', status: "awaiting affirmation" },
    { creator: 'Morgan Stanley', swapId: "EB5701", actionParty: 'Wells Fargo', tenor: 'default', swaptype: 'Equity', creationTime: 'Today', status: "awaiting affirmation" },
    { creator: 'Morgan Stanley', swapId: "EB5706", actionParty: 'JP Morgan Chase', tenor: 'default', swaptype: 'Equity', creationTime: 'Today', status: "accepted" },
    { creator: 'Wells Fargo', swapId: "EB5707", actionParty: 'Morgan Stanley', tenor: 'default', swaptype: 'Equity', creationTime: 'Today', status: "awaiting affirmation" }
  ]
  res.send(data);
})

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
