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
}

export function injectable(target: Function) {
}

export function load<T>(clazz: { new (...args): T }): T {
  const deps = Reflect.getMetadata('design:paramtypes', clazz);
  const depProblem = deps.findIndex((d) => d === undefined);
  const unresovableIndex = deps.findIndex((d) => d === undefined);
  if (unresovableIndex > -1) {
    throw new IoCError(IoCErrors.IOC_DEP_ORDER);
  }
  const instances = deps.map((dep) => load(dep));
  return new (Function.bind.apply(clazz, [null].concat(instances)))();
}