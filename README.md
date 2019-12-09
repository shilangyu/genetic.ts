# Genetic.ts

[![](https://github.com/shilangyu/genetic.ts/workflows/ci/badge.svg)](https://github.com/shilangyu/genetic.ts/actions)

A simple yet powerful and hackable Genetic Algorithm library. Handles your parent finding, crossover and mutation. Contains also some helpful functions to get you quickly started.

- [Genetic.ts](#geneticts)
  - [installation](#installation)
  - [usage](#usage)
  - [configuration](#configuration)
  - [population](#population)
  - [modes](#modes)
    - [Parent selection modes:](#parent-selection-modes)
    - [Crossover modes:](#crossover-modes)
  - [mutating](#mutating)
  - [history](#history)
  - [premade mutation functions](#premade-mutation-functions)
    - [chance](#chance)
    - [add](#add)

---

## installation

As a module:

```sh
npm i genetic.ts
# or
yarn add genetic.ts
```

For browser:

```html
<script src="https://cdn.jsdelivr.net/npm/genetic.ts/dist/genetic.web.js"></script>
```

---

## usage

See [examples](https://shilangyu.dev/genetic.ts/). Source code can be found in `docs/`.

```ts
import * as genetic from 'genetic.ts' /* import the library, this object will be available globally if imported through HTML */

const population = [
  {
    dna: [1, 2, 4],
    fitness() {
      return this.dna.reduce((a, b) => a + b)
    }
  },
  {
    dna: [4, 4, 8],
    fitness() {
      return this.dna.reduce((a, b) => a + b)
    }
  },
  {
    dna: [11, 3, 7],
    fitness() {
      return this.dna.reduce((a, b) => a + b)
    }
  }
]

/* create your genetic object */
const ga = new genetic.Instance({
  population /* set your population */,
  mutationFunction: genetic.chance(
    genetic.add(-0.5, 0.5)
  ) /* add mutation function */,
  modes: {
    crossover:
      genetic.CrossoverModes.clone /* overwrite default modes with enums */
  }
})

/* All Genetic's methods are chainable */
ga.findParents() /* finds parents using the passed mode */
  .crossover() /* creates new genes using the passed mode */
  .mutate() /* mutates the genes using the passed function */
  .finishGeneration() /* Overwrites your population's dna and increments the generation counter */

/* or use the `nextGeneration` method to do the above all at once */
ga.nextGeneration()
```

---

## configuration

The `genetic.Instance` class accepts a configuration object in the constructor. Genetic instance will follow the same structure. Here's the object it accepts with its defaults (those that do not have a default require a value to be passed):

- `population`: array containing your members that satisfy the [IPopMember](#population) interface
- `mutationFunction`: function to be used when [mutating](#mutating) the genes
- `mutationRate`: mutation rate of the algorithm (default: `0.1`)
- `amountOfParents`: amount of parents to be chosen from the mating pool (default: `2`)
- `modes`: object containing properties specifying the [modes](#modes):
  - `parentsSelection`: method of choosing the parents (default: `'best'`)
  - `crossover`: method of crossing parents' genes (default: `'random'`)
- `preserveParents`: preservation of parents' dna in the new generation. If you set this to `true` and have `modes.parentsSelection = 'best'` you will ensure the next generations wont get worse (default: `false`)
- `keepHistory`: saves history of parents of every generation in [`this.history`](#history)

---

## population

A population is considered correct when:

```ts
interface IPopMember<DNA> {
  fitness(): number
  dna: DNA
}
```

- it is an array
- each element in the array is an object implementing `IPopMember`:
  - contains a fitness method that returns the fitness (`number`)
  - contains a dna property:
    - can be any data structure as long as it ends with a `number`
    - the structure is the same for every member in the array

If you're unsure whether your population is correct you can always use `genetic.validatePopulation(pop)` that will throw an error if something is wrong.

---

## modes

### Parent selection modes:

_methods of choosing the parents_

`best`: takes members with highest fitness scores

`probability`: selects members based on their fitness scores that will correspond to the chance of being chosen

`probability2`: selects members based on their fitness scores squared that will correspond to the chance of being chosen

`probability3`: selects members based on their fitness scores cubed that will correspond to the chance of being chosen

### Crossover modes:

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

## history

If enabled history is stored under `ga.history`. It is saved each time `ga.findParents()` is called. It is an array of arrays of all previous parents with their fitness and dna:

```ts
type HistoryRecord<DNA> = {
  fitness: number
  dna: DNA
}[]
```

## premade mutation functions

Genetic.ts provides some pre-made functions for mutations:

### chance

If you'd like to mutate only some properties (based on the mutation rate) wrap your function in `chance(yourFunction)`, like so:

```ts
const mutFunc = chance(mRate => 2 * mRate)
```

### add

If you'd like to mutate values by some random number in a range use `add(min, max)`:

```ts
const mutFunc = add(-0.3, 0.3) /* min inclusive, max exclusive */
```
