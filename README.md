# Genetic.js

A typescript library for genetic algorithms. Handles your parent finding, crossover and mutation. Contains also some helpful functions to get you started.

- [before you start](#before-you-start)
- [usage](#usage)
- [modes](#modes)
- [mutating](#mutating)

## before you start

A population is considered correct when:

```ts
interface IPopMember {
	fitness: number
	dna: any /* !!!arrays and objects have to end with a number!!! */
}
```

- it is an array
- each element in the array is an object (`IPopMember`):
  - containing a fitness property (`number`)
  - containing a dna property:
    - can be any data structure as long as it ends with a `number`
    - the structure is the same for every element in the array

If you're unsure whether your population is correct you can always use the static method `Genetic.validatePopulation(pop)` that will throw an error if something is wrong.

## usage

Genetic class methods are **chainable**. Meaning you can create your new genes in one go. Here's an example.

```ts
import Genetic, {
	CrossoverModes,
	ParentsSelectionModes,
	chance,
	add
} from './Genetic' /* 1 */
const pop = [
	{ fitness: 100, dna: { asd: 1, tut: 11 } },
	{ fitness: 200, dna: { asd: 2, tut: 12 } },
	{ fitness: 300, dna: { asd: 3, tut: 1 } },
	{ fitness: 400, dna: { asd: 4, tut: 12 } },
	{ fitness: 500, dna: { asd: 8, tut: 10 } }
] /* 2 */

Genetic.validatePopulation(pop) /* 3 */

const newGenes = new Genetic({
	mutationRate: 0.1,
	numberOfParents: 2,
	modes: {
		parentsSelection: ParentsSelectionModes.best,
		corssover: CrossoverModes.random
	}
}) /* 4 */
	.findParents(pop) /* 5 */
	.crossover(5) /* 6 */
	.mutate(chance(add(-0.5, 0.5))) /* 7 */

const newPopulation = newGenes.map(dna => ({ fitness: 0, dna })) /* 8 */
```

1. importing the class, Mode enums and 2 helper functions: `chance` and `add`
2. creating a population that satisfies the `IPopMember[]` interface
3. validating the population. If correct nothing will happen but if not an error with me thrown and the script will be terminated.
4. initializing a Genetic instance. Takes an object as parameter:

- mutation rate (default: 0.1)
- amount of parents (default: 2)
- modes
	- parent selection (default: 'BEST')
	- crossover (default: 'RANDOM')

5. finding parents. Takes 1 parameter:

- a valid population

6. creating new genes (chromosomes). Takes 1 parameter:

- amount of genes to create

7. mutating the previously created genes. Takes 1 parameter:

- function that will return a number that will be added to a gene

8. mapping the new genes to a new population

## modes

###### Parent selection modes:

_methods of choosing the parents_

`'BEST'`: takes members with highest fitness scores

`'PROBABILITY'`: selects members based on their fitness scores that will correspond to the chance of being chosen

###### Crossover modes:

_methods of choosing the passed dna_

`'RANDOM'`: randomly choosing a parent for each gene

`'AVERAGE'`: averaging all parents' gene

`'CLONE'`: randomly selecting a parent and cloning all of his genes

## mutating

Here's what you need to know about the function that you're passing to the `mutate` method:

- accept 1 argument:
  - mutation rate
- returns a number

Genetic.ts provides some pre-made functions for mutations:

##### chance

If you'd like to mutate only some properties (based on the mutation rate) wrap your function in `chance(yourFunction)`, like so:

```ts
g.mutate(chance(mRate => 1 * mRate))
```

##### add

If you'd like to mutate values by some random number in a range use `add(min, max)`:

```ts
g.mutate(add(-0.3, 0.3)) /* min inclusive, max exclusive */
```
