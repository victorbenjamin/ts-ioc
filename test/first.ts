import { assert } from 'chai';
import { Service } from './senario1';
import { load } from '../src/index'

describe('first test', () => {

    it('test 1', () => {

      const serviceInstance = load(Service);
      assert.instanceOf(serviceInstance, Service);
    });

});