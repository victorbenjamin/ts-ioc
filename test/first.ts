import { assert } from 'chai';
import { ServiceOneDep } from './senario1';
import { Service } from './senario2';
import { ServiceOneDep3 } from './senario3';
import { ServiceTwoDep, ServiceOneDep2 } from './senario4';
import { load, IoCErrors } from '../src/index'

describe('first test', () => {

  it('should instance with no dependences', () => {

    const serviceInstance = load(Service);
    assert.instanceOf(serviceInstance, Service);
  });

  it('should instance with one existence dependence in the different file', () => {

    const serviceInstance = load(ServiceOneDep);
    assert.instanceOf(serviceInstance, ServiceOneDep);
    assert.instanceOf(serviceInstance.dep1, Service);
  });

  it('should instance with one existence dependence in the same file with wrong order', () => {

    try {
      load(ServiceOneDep3);
      assert.ok(false);
    } catch (err) {
      assert.equal(err.name, IoCErrors[IoCErrors.IOC_DEP_ORDER]);
    }
  });

  it('should instance with one existence dependence in the same file with wrong order', () => {

    const mainInstance = load(ServiceTwoDep);
    assert.instanceOf(mainInstance, ServiceTwoDep);
    assert.instanceOf(mainInstance.dep1, ServiceOneDep);
    assert.instanceOf(mainInstance.dep2, ServiceOneDep2);
    assert.strictEqual(mainInstance.dep1.dep1, mainInstance.dep2.dep);

  });


});