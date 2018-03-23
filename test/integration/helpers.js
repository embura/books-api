const supertest = require('supertest');
const chai = require('chai');
const app = require('../../app');

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
