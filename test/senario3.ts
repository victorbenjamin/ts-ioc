import { injectable } from '../src/index';

@injectable
export class ServiceOneDep3 {

    constructor(public dep1: Service3) {

    }

}

@injectable
export class Service3 {

}