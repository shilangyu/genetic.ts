# Genetic.js

A typescript library for genetic algorithms. Handles your parent finding, crossover and mutation. Contains also some helpful functions to get you started.

- [configuration](#configuration)
- [usage](#usage)
- [population](#population)
- [fitness function](#fitness-function)
- [modes](#modes)
- [mutating](#mutating)

---

## configuration

The `Genetic` class accepts a configuration object in the constructor. Genetic instance will follow the same structure. Here's the object it accepts with its defaults (those that do not have a default require a value to be passed):

- `population`: array containing your members that satisfy the [IPopMember](#population) interface
- `amountOfDna`: amount of new genes to create (default: length of your population)
- `mutationFunction`: function to be used when mutating the genes | [see here](#mutating)
- `mutationRate`: mutation rate of the algorithm (default: 0.1)
- `amountOfParents`: amount of parents to be chosen in the mating pool (default: 2)
- `fitnessFunction`: function to be used to assess each members fitness | [see here](#fitness-function)
- `modes`: object containing properties specifying the modes:
  - `parentsSelection`: method of choosing the parents (default: 'RANDOM') | [see here](#modes)
  - `crossover`: method of crossing parents' genes (default: 'BEST') | [see here](#modes)
- `preserveParents`: preservation of parents' genes in the new generation (default: false)

---

## usage

/* TODO */

---

## population

A population is considered correct when:

```ts
interface IPopMember {
	fitness: number
	dna: any /* !!!arrays and objects have to end with a number!!! */
}
```

- it is an array
- each element in the array is an object implementing `IPopMember`:
  - contains a fitness property (`number`)
  - contains a dna property:
    - can be any data structure as long as it ends with a `number`
    - the structure is the same for every element in the array

If you're unsure whether your population is correct you can always use the static method `Genetic.validatePopulation(pop)` that will throw an error if something is wrong.

---

## fitness function

A fitness function accepts a member and returns its calculated fitness.

A fitness function is considered correct when:

```ts
type FitnessFunction = (member: IPopMember) => number
```

- will accept a member
- will return a number

---

## modes

###### Parent selection modes:

_methods of choosing the parents_

`'BEST'`: takes members with highest fitness scores

`'PROBABILITY'`: selects members based on their fitness scores that will correspond to the chance of being chosen

###### Crossover modes:

_method of crossing parents' genes_

`'RANDOM'`: randomly choosing a parent for each gene

`'AVERAGE'`: averaging all parents' dna

`'CLONE'`: randomly selecting a parent and cloning his dna

---

## mutating

A mutation function accepts data about the current gene and will return a number that will be added to the gene.

A mutation function is considered correct when:

```ts
type MutationFunction = (mutationRate: number) => number
```

- will accept a mutationRate
- will return a number

#### premade mutation functions

Genetic.ts provides some pre-made functions for mutations:

###### chance

If you'd like to mutate only some properties (based on the mutation rate) wrap your function in `chance(yourFunction)`, like so:

```ts
const mutFunc = chance(mRate => 2 * mRate)
```

###### add

If you'd like to mutate values by some random number in a range use `add(min, max)`:

```ts
const mutFunc = add(-0.3, 0.3) /* min inclusive, max exclusive */
```
