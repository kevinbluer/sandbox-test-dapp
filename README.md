Drizzle dapp with test contracts for teams and sandbox-tx-dealer. Use this to
confirm dashboard data. It should roughly match what's displayed on teams
dashbaord.

## How to use
  1. Add this project to your teams repo.
  1. Use `yarn teams:force-build` to initiate a new build for teams to pick up.
  1. Deploy to sandbox
  1. wire it up (needs documentation)
  1. start dapp ui


## Todo
  - [ ] store version number corresponding to commit hash
  - [ ] explain how to get and wire up artifacts from teams deployment

### Contracts

SimpleStorage

  - [x] set a state
  - [ ] send value to contract
  - [ ] transfer value from contract
  - [x] fail a transaction
  - [ ] version info tied to commit hash

 
