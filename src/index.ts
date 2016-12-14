import 'source-map-support/register';

export function load<T>(clazz: { new(): T }): T {
    return new (Function.bind.apply(clazz, [ null ]))();
}