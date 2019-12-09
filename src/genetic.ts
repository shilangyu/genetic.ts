import { dnaCopy } from './util'

export enum ParentsSelectionModes {
  best = 'best',
  probability = 'probability',
  probability2 = 'probability2',
  probability3 = 'probability3'
}

export enum CrossoverModes {
  random = 'random',
  average = 'average',
  clone = 'clone'
}

export interface IGeneticConstructor<Member> {
  population: Member[]
  mutationFunction: MutationFunction
  mutationRate?: number
  numberOfParents?: number
  modes?: {
    parentsSelection?: ParentsSelectionModes
    crossover?: CrossoverModes
  }
  preserveParents?: boolean
}

export interface IPopMember<DNA> {
  fitness(): number
  dna: DNA
}

export type MutationFunction = (mutationRate: number) => number

type InferDna<T> = T extends { dna: infer DNA } ? DNA : T

export const Instance = class<
  Member extends IPopMember<InferDna<Member>>,
  DNA extends InferDna<Member>
> implements IGeneticConstructor<Member> {
  parents: DNA[] = []
  newDna: DNA[] = []
  generation: number = 1

  population: Member[]
  mutationFunction: MutationFunction
  mutationRate: number
  numberOfParents: number
  modes: {
    parentsSelection: ParentsSelectionModes
    crossover: CrossoverModes
  }
  preserveParents: boolean

  constructor({
    population,
    mutationFunction,
    mutationRate = 0.1,
    numberOfParents = 2,
    modes: {
      parentsSelection = ParentsSelectionModes.best,
      crossover = CrossoverModes.random
    } = {
      parentsSelection: ParentsSelectionModes.best,
      crossover: CrossoverModes.random
    },
    preserveParents = false
  }: IGeneticConstructor<Member>) {
    this.population = population
    this.mutationFunction = mutationFunction
    this.mutationRate = mutationRate
    this.numberOfParents = numberOfParents
    this.modes = {
      parentsSelection,
      crossover
    }
    this.preserveParents = preserveParents
  }

  findParents(): this {
    this.parents = []

    switch (this.modes.parentsSelection) {
      case ParentsSelectionModes.best:
        const tempParents = []
        let worseParentIndex = 0

        for (let i = 0; i < this.population.length; i++) {
          if (tempParents.length === this.numberOfParents) {
            if (
              tempParents[worseParentIndex].fitness() <
              this.population[i].fitness()
            ) {
              tempParents[worseParentIndex] = this.population[i]
              for (let n = 0; n < this.numberOfParents; n++) {
                if (
                  tempParents[worseParentIndex].fitness() >
                  tempParents[n].fitness()
                ) {
                  worseParentIndex = n
                }
              }
            }
          } else {
            tempParents.push(this.population[i])
            if (
              tempParents[worseParentIndex].fitness() >
              this.population[i].fitness()
            ) {
              worseParentIndex = tempParents.length - 1
            }
          }
        }

        this.parents = tempParents.map(p => dnaCopy(p.dna))
        break

      case ParentsSelectionModes.probability:
      case ParentsSelectionModes.probability2:
      case ParentsSelectionModes.probability3:
        const power =
          this.modes.parentsSelection === ParentsSelectionModes.probability
            ? 1
            : this.modes.parentsSelection === ParentsSelectionModes.probability2
            ? 2
            : 3
        let left = this.numberOfParents
        let fitnessSum = 0
        for (const memeber of this.population) {
          fitnessSum += memeber.fitness() ** power
        }

        const blacklist: number[] = []

        while (left-- > 0) {
          let chosen = Math.random() * fitnessSum

          for (let i = 0; i < this.population.length; i++) {
            if (!blacklist.includes(i)) {
              chosen -= this.population[i].fitness() ** power
              if (chosen <= 0) {
                this.parents.push(dnaCopy(this.population[i].dna))
                fitnessSum -= this.population[i].fitness() ** power
                blacklist.push(i)
                break
              }
            }
          }
        }
        break

      default:
        throw new Error('Current parent selection mode is not supported.')
    }

    return this
  }

  crossover(): this {
    this.newDna = []

    const deep = (finisherFunc: (t: number[]) => number) =>
      function deep(targets: any[]): any {
        if (Array.isArray(targets[0])) {
          return new Array(targets[0].length)
            .fill(null)
            .map((e, i) => deep(targets.map(e => e[i])))
        } else if (typeof targets[0] === 'object') {
          const temp: any = {}
          for (const key of Object.keys(targets[0])) {
            temp[key] = deep(targets.map(e => e[key]))
          }
          return temp
        } else if (typeof targets[0] === 'number') return finisherFunc(targets)
      }

    switch (this.modes.crossover) {
      case CrossoverModes.random:
        const randomGene = deep(t => t[Math.floor(Math.random() * t.length)])

        for (let i = 0; i < this.population.length; i++) {
          this.newDna.push(randomGene(this.parents))
        }
        break

      case CrossoverModes.clone:
        for (let i = 0; i < this.population.length; i++) {
          const chosen = Math.floor(Math.random() * this.numberOfParents)
          const chooseOne = deep(t => t[chosen])
          this.newDna.push(chooseOne(this.parents))
        }
        break

      case CrossoverModes.average:
        const averager = deep(
          t => t.reduce((prev, curr) => prev + curr, 0) / t.length
        )

        const avg = JSON.stringify(averager(this.parents))
        for (let i = 0; i < this.population.length; i++) {
          this.newDna.push(JSON.parse(avg))
        }
        break

      default:
        throw new Error('Current crossover mode is not supported.')
    }

    return this
  }

  mutate(): this {
    const deep = (target: any): any => {
      if (Array.isArray(target)) {
        return target.map(deep)
      } else if (typeof target === 'object') {
        const temp: any = {}
        for (const key of Object.keys(target)) {
          temp[key] = deep(target[key])
        }
        return temp
      } else if (typeof target === 'number')
        return target + this.mutationFunction(this.mutationRate)
    }

    for (let i = 0; i < this.newDna.length; i++) {
      if (this.preserveParents && i < this.numberOfParents) {
        this.newDna[i] = dnaCopy(this.parents[i])
      } else {
        this.newDna[i] = deep(this.newDna[i])
      }
    }

    return this
  }

  finishGeneration(): this {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].dna = this.newDna[i]
    }
    this.generation++

    return this
  }

  nextGeneration(): this {
    return this.findParents()
      .crossover()
      .mutate()
      .finishGeneration()
  }
}

export { add, chance } from './mutators'
export { validatePopulation } from './util'
