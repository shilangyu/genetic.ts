export declare enum ParentsSelectionModes {
    best = 0,
    probability = 1
}
export declare enum CrossoverModes {
    random = 0,
    average = 1,
    clone = 2
}
interface GeneticConstructor {
    population: IPopMember[];
    amountOfDna?: number;
    mutationFunction: MutationFunction;
    mutationRate?: number;
    fitnessFunction: FitnessFunction;
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
declare type FitnessFunction = (member: IPopMember) => number;
declare type MapDnaFunction = (newDna: DNA[]) => IPopMember[];
export default class Genetic {
    parents: DNA[];
    newDna: DNA[];
    generation: number;
    population: IPopMember[];
    amountOfDna: number;
    mutationFunction: MutationFunction;
    mutationRate: number;
    fitnessFunction: FitnessFunction;
    numberOfParents: number;
    modes: {
        parentsSelection: ParentsSelectionModes;
        crossover: CrossoverModes;
    };
    preserveParents: boolean;
    constructor({ population, amountOfDna, mutationFunction, mutationRate, numberOfParents, fitnessFunction, modes: { parentsSelection, crossover }, preserveParents }: GeneticConstructor);
    overwrite(overwriter: (self: this) => void): this;
    calculateFitness(): this;
    findParents(): this;
    crossover(): this;
    mutate(): this;
    finishGeneration(mapDnaFunction: MapDnaFunction): this;
    nextGeneration(mapDnaFunction: MapDnaFunction): this;
    static validatePopulation(population: any[]): void;
}
export declare const chance: (func: MutationFunction) => MutationFunction;
export declare const add: (min: number, max: number) => MutationFunction;
export {};
