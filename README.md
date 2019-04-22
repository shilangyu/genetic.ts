# Genetic.js

A simple yet powerful and hackable Genetic Algorithm library. Handles your parent finding, crossover and mutation. Contains also some helpful functions to get you started quick.

- [configuration](#configuration)
- [installation](#installation)
- [usage](#usage)
- [population](#population)
- [fitness function](#fitness-function)
- [modes](#modes)
- [mutating](#mutating)

---

## installation

As a module:

```sh
npm i --save genetic.ts
```

or

```sh
pnpm i --save genetic.ts
```

or

```sh
yarn add genetic.ts
```

For browser:

```html
<script src="https://cdn.jsdelivr.net/npm/genetic.ts/dist/Genetic.web.js"></script>
```

---

## configuration

The `genetic.Instance` class accepts a configuration object in the constructor. Genetic instance will follow the same structure. Here's the object it accepts with its defaults (those that do not have a default require a value to be passed):

- `population`: array containing your members that satisfy the [IPopMember](#population) interface
- `amountOfDna`: amount of new genes to create (default: length of your population)
- `mutationFunction`: function to be used when mutating the genes | [see here](#mutating)
- `mutationRate`: mutation rate of the algorithm (default: 0.1)
- `amountOfParents`: amount of parents to be chosen in the mating pool (default: 2)
- `fitnessFunction`: function to be used to assess each members fitness | [see here](#fitness-function)
- `modes`: object containing properties specifying the modes:
  - `parentsSelection`: method of choosing the parents (default: 'random') | [see here](#modes)
  - `crossover`: method of crossing parents' genes (default: 'best') | [see here](#modes)
- `preserveParents`: preservation of parents' genes in the new generation (default: false)

---

## usage

See [examples](https://shilangyu.github.io/genetic.ts/). Source code can be found in `docs/`.

```ts
import * as genetic from 'genetic.ts' /* import the library, this object will be available globally if imported through HTML */

const population = [
	{
		dna: [1, 2, 4],
		fit: function() {
			return this.dna.reduce((a, b) => a + b)
		}
	},
	{
		dna: [4, 4, 8],
		fit: function() {
			return this.dna.reduce((a, b) => a + b)
		}
	},
	{
		dna: [11, 3, 7],
		fit: function() {
			return this.dna.reduce((a, b) => a + b)
		}
	}
]

/* create your genetic object */
const ga = new genetic.Instance({
	population: population /* set your population */,
	mutationFunction: genetic.chance(genetic.add(-0.5, 0.5)) /* add mutation function */,
	fitnessFunction: mem => mem.fit() /* add fitness function */,
	modes: {
		crossover: genetic.CrossoverModes.clone /* overwrite default modes with enums */
	}
})

/* All Genetic's methods are chainable */
ga.calculateFitness() /* calls previously passed fitnessFunction on all members */
	.findParents() /* finds parents using the passed mode */
	.crossover() /* creates new genes using the passed mode */
	.mutate() /* mutates the genes using the passed mode */
	.finishGeneration(newGenes => {
		newGenes.forEach((g, i) => {
			population[i].dna = g
		})
		return population
	}) /* here you map the new genes to your population, then return the ready population. It will also increment the generation count */

/* or use the `nextGeneration` method to do the above all at once */
ga.nextGeneration(newGenes => {
	newGenes.forEach((g, i) => {
		population[i].dna = g
	})
	return population
})
```

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
    - the structure is the same for every member in the array

If you're unsure whether your population is correct you can always use `genetic.validatePopulation(pop)` that will throw an error if something is wrong.

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

`best`: takes members with highest fitness scores

`probability`: selects members based on their fitness scores that will correspond to the chance of being chosen

###### Crossover modes:

_method of crossing parents' genes_

`random`: randomly choosing a parent for each gene

`average`: averaging all parents' dna

`clone`: randomly selecting a parent and cloning his dna

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
