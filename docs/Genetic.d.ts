export declare enum ParentsSelectionModes {
    best = 0,
    probability = 1
}
export declare enum CrossoverModes {
    random = 0,
    average = 1,
    clone = 2
}
interface GeneticConstructor<T> {
    population: T[];
    amountOfDna?: number;
    mutationFunction: MutationFunction;
    mutationRate?: number;
    fitnessFunction: FitnessFunction<T>;
    numberOfParents?: number;
    modes?: {
        parentsSelection?: ParentsSelectionModes;
        crossover?: CrossoverModes;
    };
    preserveParents?: boolean;
}
declare type DNA = any;
interface IPopMember {
    fitness: number;
    dna: DNA;
}
declare type MutationFunction = (mutationRate: number) => number;
declare type FitnessFunction<T> = (member: T) => number;
declare type MapDnaFunction<T> = (newDna: DNA[]) => T[];
export default class Genetic<MemberType extends IPopMember> {
    parents: DNA[];
    newDna: DNA[];
    generation: number;
    population: MemberType[];
    amountOfDna: number;
    mutationFunction: MutationFunction;
    mutationRate: number;
    fitnessFunction: FitnessFunction<MemberType>;
    numberOfParents: number;
    modes: {
        parentsSelection: ParentsSelectionModes;
        crossover: CrossoverModes;
    };
    preserveParents: boolean;
    constructor({ population, amountOfDna, mutationFunction, mutationRate, numberOfParents, fitnessFunction, modes: { parentsSelection, crossover }, preserveParents }: GeneticConstructor<MemberType>);
    overwrite(overwriter: (self: this) => void): this;
    calculateFitness(): this;
    findParents(): this;
    crossover(): this;
    mutate(): this;
    finishGeneration(mapDnaFunction: MapDnaFunction<MemberType>): this;
    nextGeneration(mapDnaFunction: MapDnaFunction<MemberType>): this;
    static validatePopulation(population: any[]): void;
}
export declare const chance: (func: MutationFunction) => MutationFunction;
export declare const add: (min: number, max: number) => MutationFunction;
export {};
