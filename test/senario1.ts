import { injectable } from '../src/index';
import { Service } from './senario2';
import 'reflect-metadata';

@injectable
export class ServiceOneDep {

    constructor(public dep1: Service) {}

} 


