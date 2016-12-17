import 'source-map-support/register';
import 'reflect-metadata';

class IoCError extends Error {

  constructor(name: IoCErrors) {
    super();
    super.name = IoCErrors[name];
  }

}

export enum IoCErrors {
  IOC_DEP_ORDER,
  IOC_NO_INJETABLE,
}

const injetables = {};

export function injectable(target: Function) {
  injetables[target['name']] = true;
}

export function load<T>(clazz: { new (...args): T }): T {
  if (!injetables[clazz['name']]) {
    throw new IoCError(IoCErrors.IOC_NO_INJETABLE);
  }
  
  const deps = Reflect.getMetadata('design:paramtypes', clazz);
  
  // possible order error
  const unresovableIndex = deps.findIndex((d) => d === undefined);
  if (unresovableIndex > -1) {
    throw new IoCError(IoCErrors.IOC_DEP_ORDER);
  }

  const instances = deps.map((dep) => load(dep));
  return new (Function.bind.apply(clazz, [null].concat(instances)))();
}