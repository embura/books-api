const supertest = require('supertest');
const chai = require('chai');
const Joi = require('joi');
const joiAssert = require('joi-assert');
const app = require('../../app');

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.Joi = Joi;
global.joiAssert = joiAssert;
