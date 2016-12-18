import 'source-map-support/register';
import 'reflect-metadata';

class IoCError extends Error {

  constructor(name: IoCErrors) {
    super();
    super.name = IoCErrors[name];
  }

}

const injectables: { [key: string]: Injectable } = {};

class Injectable {

  private _instance;

  constructor(private target: { new (...args) }) {
  }

  get instance(): any {
    if (this._instance) return this._instance;
    
    const deps = Reflect.getMetadata('design:paramtypes', this.target);
  
    // possible order error
    const unresovableIndex = deps.findIndex((d) => d === undefined);
    if (unresovableIndex > -1) {
      throw new IoCError(IoCErrors.IOC_DEP_ORDER);
    }

    const instances = deps.map((dep) => injectables[dep['name']].instance);
    return this._instance = new this.target(...instances);

  }

}

export enum IoCErrors {
  IOC_DEP_ORDER,
  IOC_NO_INJETABLE,
}

export function injectable(target: { new (...args) }) {
  let a = new Injectable(target);
  injectables[target['name']] = new Injectable(target);
}

export function load<T>(clazz: { new (...args): T }): T {
  const injectable = injectables[clazz['name']];
  if (injectable) {
    return injectable.instance;
  } else {
    throw new IoCError(IoCErrors.IOC_NO_INJETABLE);
  }
  //return new (Function.bind.apply(clazz, [null].concat(instances)))();
}