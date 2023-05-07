import chai from 'chai';
import chaiHttp from 'chai-http';
import { When, Then } from '@cucumber/cucumber';
import { StatusCodes } from 'http-status-codes';
import api from '../../index.js';

// IMPORTANT : For Cucumber working, always use function () {}
// (never () => {})

chai.use(chaiHttp);

Then('I should have response {string}', function(expectedStatusCode) {
  chai.expect(this.response).to.have.status(StatusCodes[expectedStatusCode]);
});

When('I get the {string}', async function(type) {
  const res = await chai.request(api).get(`/${type}`);
  this.response = res;
});

When('I get the {string} having id {string}', async function(type, id) {
  const res = await chai.request(api).get(`/${type}s/${id}`);
  this.response = res;
});

When('I list all {string}', async function(type) {
  const res = await chai.request(api).get(`/${type}`);
  this.response = res;
});

When('I create the following {string}:', async function (type, dataTable) {
  if(type === 'order'){
    dataTable = dataTable.hashes().map((order) => {
      order.quantity = parseInt(order.quantity);
      return order;
    })
    const res = await chai.request(api).post(`/${type}s`).send(dataTable[0]);
    this.response = res;
  }
  else{
    const res = await chai.request(api).post(`/${type}s`).send(dataTable.hashes()[0]);
    this.response = res;
  }
  
});

When('I update the {string} having id {string} with following data:', async function (type, id, dataTable) {
  //IF type is order, then we need to convert the quantity to integer
  if(type === 'order') {
    dataTable = dataTable.hashes().map((order) => {
      order.quantity = parseInt(order.quantity);
      return order;
    });

    const res = await chai.request(api).put(`/${type}s/${id}`).send(dataTable[0]);
    this.response = res;
  }

  else{
    const res = await chai.request(api).put(`/${type}s/${id}`).send(dataTable.hashes()[0]);
    this.response = res;
  }

  
});

When('I delete the {string} having id {string}', async function(type, id) {
  const res = await chai.request(api).delete(`/${type}s/${id}`);
  this.response = res;
});

Then('following {string} list:', function(type,dataTable) {

  //IF type is orders, then we need to convert the quantity to integer
  if(type === 'orders') {
    dataTable = dataTable.hashes().map((order) => {
      order.quantity = parseInt(order.quantity);
      return order;
    });
    chai.expect(this.response.body).to.deep.equal({
      data: dataTable
    });
  }

  else{
    chai.expect(this.response.body).to.deep.equal({
      data: dataTable.hashes()
    });
  }
  
});

Then('following new {string} item:', function(type,expectedData) {
  const {id, ...responseData} = this.response.body.data;
  chai.expect(id).to.have.lengthOf(36);
  
  if(type === 'order') {
    expectedData = expectedData.hashes().map((order) => {
      order.quantity = parseInt(order.quantity);
      return order;
    });
    chai.expect(responseData).to.deep.equal(expectedData[0]);
  }

  else{
    chai.expect(responseData).to.deep.equal(expectedData.hashes()[0]);
  }
  
  
});

Then('following {string} item:', function(type,expectedData) {

  //IF type is orders, then we need to convert the quantity to integer
  if(type === 'order') {
    expectedData = expectedData.hashes().map((order) => {
      order.quantity = parseInt(order.quantity);
      return order;
    });
    chai.expect(this.response.body).to.deep.equal({
      data: expectedData[0]
    });
  }
  
  else{
    chai.expect(this.response.body).to.deep.equal({
      data: expectedData.hashes()[0]
    });
  }
});

Then('following updated {string} item:', function (type,expectedData) {
  if(type === 'order') {
    expectedData = expectedData.hashes().map((order) => {
      order.quantity = parseInt(order.quantity);
      return order;
    });

    chai.expect(this.response.body).to.deep.equal({
      data: expectedData[0]
    });
  }

  else{
    chai.expect(this.response.body).to.deep.equal({
      data: expectedData.hashes()[0]
    });
  }
  
});

Then('following deleted {string} item:', function(type,expectedData) {

  if(type === 'order') {
    expectedData = expectedData.hashes().map((order) => {
      order.quantity = parseInt(order.quantity);
      return order;
    });
    chai.expect(this.response.body).to.deep.equal({
      meta: {
        deleted: expectedData[0]
      }
    })
  }
  else{
    chai.expect(this.response.body).to.deep.equal({
      meta: {
        deleted: expectedData.hashes()[0]
      }
    });
  }

});

Then('following error : {string}', function(expectedError) {
  chai.expect(this.response.body).to.deep.equal({
    error: expectedError
  });
});
