const expect = require('chai').expect;
const jsonFileImport = require('../index.js');
const {exec} = require('child_process');

it('JSON with no import directives', function (done) {
  expect(jsonFileImport.load(`./test/test-noimport.json`)).eql({
      n: 1,
      b: true,
      s: "abc",
      a: [
        1,
        2,
        3
      ],
      o: {
        n1: 1,
        n2: 2,
        n3: {
          n4: "n4"
        }
      }
    }
  );
  done();
});

it('JSON with import directives', function (done) {

  expect(jsonFileImport.load(`./test/test-import.json`)).eql({
    n: 1,
    b: true,
    s: "abc",
    s2: "password",
    s3: {
      "os-username": "user",
      "os-password": "password",
      keypair: "xxx",
      o: {
        a: {
          c: 3
        },
        b: 2
      }
    },
    a: [
      1,
      2,
      "password",
      4
    ],
    o: {
      n1: 1,
      n2: 2,
      n3: {
        "os-username": "user",
        "os-password": "password",
        keypair: "xxx",
        o: {
          a: {
            c: 3
          },
          b: 2
        }
      },
      n4: {
        "os-username": "user"
      }
    }
  });
  done();
});

it('JSON with nested import directives', function (done) {
  expect(jsonFileImport.load(`./test/test-nested.json`)).eql({
      c: 3
    }
  );
  done();
});

it('JSON with no-match nested import directives', function (done) {
  try {
    jsonFileImport.load(`./test/test-nomatch.json`);
  } catch (e) {
    expect(e.message).includes('Element \'@import!./test/secrets.json#xxx\' not matched');
  }
  done();
});

it('JSON with no-match import file', function (done) {
  try {
    jsonFileImport.load(`./test/test-nofilematch.json`);
  } catch (e) {
    expect((e.message || e).includes('Import file not found'));
  }
  done();
});

it('CLI JSON successful file import', function (done) {
  exec(`./bin/jsonimport test/test-nested.json`, (err, stdout, stderr) => {
    expect(JSON.parse(stdout)).eql({
        c: 3
      }
    );
    done();
  });
});

it('CLI JSON un-successful file import (no file match)', function (done) {
  exec(`./bin/jsonimport test/test-nofilematch.json`, (err, stdout, stderr) => {
    expect(stderr.includes('Import file not found: xxx.json'));
    done();
  });
});

it('CLI JSON un-successful file import (no key match)', function (done) {
  exec(`./bin/jsonimport test/test-nomatch.json`, (err, stdout, stderr) => {
    expect(stderr.includes('Element \'@import!secrets.json#xxx\' not matched'));
    done();
  });
});

