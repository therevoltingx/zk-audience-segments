# zk-audience-segments
Private Audience Based Advertising

## Abstract
In this document we outline a mechanism in which browsers can enable an Audience Segmentation API which produces secretive data which advertisers can bid against without knowing the specifics of that data.

This proposal is largely inspired by FloC and TURTLEDOVE.

## Overview
We aim to solve for:
* Advertisers able to target and bid on a specific bid request by an audience segment id
* ??Specific audience segment ids cannot be attributed to an individual, even when coupled with a personal identifier (email, social, etc.)??
* No Advertising ID required

Requirements:
* A browser provided audience segmentation API

## Implementation
* The browser builds a list of segment IDs for a given user
* The publisher uses the segmentation API to retrieve a zkSNARK proof which can be included in an ad request

### zkSNARK
A zkSNARK is a specific type of cryptographic proof that we can use to prove inclusion of a segment id without revealing any of the ids.

The zkSNARK proof is built by the browser to include the list of user segment ids. 

The circuit is stored in a publicly accessible way such as a blockchain. The circuit is basically a contract of what segment ids are targetable. 

DSPs, Exchanges, etc would use the circuit and proof to verify that:
* A user is in a given set of segments
* If the segments are in a list of acceptable industry segments

This can be done without knowing the actual list of segments for a given user.

### Downsides
* Can this be replaced by a simpler bloom filter data structure?
* Information leak when coupled with PII (can we ban PII in OpenRTB?)
* Snoopers can still probe segment targeting, even when not consented - can be improved with an encryption scheme such that only consented vendor can check the proof

## Code

```
npm install
./node_modules/circom/cli.js ./circuits/audience.circuit -o circuits/audience.json
npm test
```

## References
* https://github.com/jkarlin/floc
* https://iden3-docs.readthedocs.io/
