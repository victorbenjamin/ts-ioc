import { injectable } from '../src/index';
import { ServiceOneDep } from './senario1';
import { ServiceOneDep3 } from './senario3';
import { Service } from './senario2';

@injectable
export class ServiceOneDep2 {
    
    constructor(public dep: Service) {}
}


@injectable
export class ServiceTwoDep {

    constructor(public dep1: ServiceOneDep, public dep2: ServiceOneDep2) {}

}