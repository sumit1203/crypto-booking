/* eslint-env mocha */
const { expect } = require('chai');
const { toPlainObject } = require('../../src/utils/classHelper');
const { ToPlainObjectTestClass } = require('./test-data');

const instance = new ToPlainObjectTestClass();
const plainObject = toPlainObject(instance);

describe('Class helper', () => {
  describe('toPlainObject', () => {
    it('Should return a plain object of a class', () => {
      expect(plainObject).to.not.be.an.instanceof(ToPlainObjectTestClass);
    });
    it('Should contain getters as properties', () => {
      expect(plainObject).to.have.property('email', instance.email);
    });
    it('Should avoid private props', () => {
      expect(plainObject).to.not.have.property('_email');
    });
    it('Should avoid methods', () => {
      expect(plainObject).to.not.have.property('save');
    });
  });
});
