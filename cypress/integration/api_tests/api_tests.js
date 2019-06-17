import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

const md5 = require('md5');
//const publicKey = '46bf7560849ef0f8306590beaaae08f6';
const publicKey = '001ac6c73378bbfff488a36141458af2';
const privateKey = 'c3175686d641fd38c9266a772705c032af9a1aee'

function getHash() {
  const date = new Date();
  const timestamp = date.getTime();
  var hash = md5(timestamp + privateKey + publicKey);
  hash = '72e5ed53d1398abb831c3ceec263f18b';
  //return [timestamp, hash];
  return ["thesoer", hash];
}

When(`publickey is missing in api call {string}`, path => {
  cy.request({
    url: `${path}?ts=${getHash()[0]}&hash=${getHash()[1]}`, 
    failOnStatusCode: false
  }).then(($response) =>{
	  return $response;
  }).as("response");
});

Then(`Verify status code {int} and message {string}`, (code, msg) => {
  cy.get("@response").then(($res) => {
	  expect($res.status).to.eq(code)
    expect($res.body).to.have.property('message', msg)
  });
});

When(`hash is missing in api call {string}`, path => {
  cy.request({
    url: `${path}?ts=${getHash()[0]}&apikey=${publicKey}`, 
    failOnStatusCode: false
  }).then(($response) =>{
	  return $response;
  }).as("response");
});


When(`timestamp is missing in api call {string}`, path => {
  cy.request({
    url: `${path}?apikey=${publicKey}&hash=${getHash()[1]}`, 
    failOnStatusCode: false
  }).then(($response) =>{
	  return $response;
  }).as("response");
});

When(`invalid hash in api call {string}`, path => {
  cy.request({
    url: `${path}?ts=${getHash()[0]}&apikey=${publicKey}&hash=invalid`, 
    failOnStatusCode: false
  }).then(($response) =>{
	  return $response;
  }).as("response");
});

When(`HTTP verb which is not allowed in api call {string}`, path => {
  cy.request({
    method: 'POST',
    url: `${path}?ts=${getHash()[0]}&apikey=${publicKey}&hash=invalid`, 
    failOnStatusCode: false
  }).then(($response) =>{
	  return $response;
  }).as("response");
});

When(`api call {string}`, path => {
  cy.request({
    url: `${path}?ts=${getHash()[0]}&apikey=${publicKey}&hash=${getHash()[1]}`
  }).then(($response) =>{
	  return $response;
  }).as("response");
});

Then(`Verify status code {int} and response payload matches {string} type definition`, (code, typedef) => {
  cy.get("@response").then(($res) => {
	  expect($res.status).to.eq(code)
    expect($res.body.data.results[0]).to.have.property("format", typedef)
  });
});

Then(`Verify name of character is {string}`, name => {
  cy.get("@response").then(($res) => {
	  expect($res.body.data.results[0]).to.have.property("name", name)
  });
});

And(`Verify last modification was after January 2014`, () => {
  cy.get("@response").then(($res) => {
    var x = $res.body.data.results[0].modified;
    var firstDate = new Date(x);
    var anotherDate = new Date("31 January 2014");
    expect(firstDate).to.gt(anotherDate)
  });
});

Then(`Verify status code {int}`, code => {
  cy.get("@response").then(($res) => {
	  expect($res.status).to.eq(code)
  });
});