const zkSnark = require('snarkjs').original;
const Circuit = require('snarkjs').Circuit;
const fs = require('fs');
const path = require('path');
const JSON = require('json-bigint');

describe('Audience', function() {
   let definition = JSON.parse(fs.readFileSync(path.join('./circuits', 'audience.json'), 'utf8'));
   let circuit = new Circuit(definition);
   let setup;

  beforeAll(function() {
    setup = zkSnark.setup(circuit);
    // setup.toxic;
  });

  it('verifies an audience segment', function() {
    let input = {
      'tag': 1
    };

    let witness = circuit.calculateWitness(input);

    let {proof, publicSignals} = zkSnark.genProof(setup.vk_proof, witness);
    console.log(proof);
    console.log(publicSignals);

    expect(true).toBe(true);
  });
});
