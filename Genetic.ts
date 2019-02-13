export const enum ParentsSelectionModes {
	best = 'BEST',
	probability = 'PROBABILITY'
}

export const enum CrossoverModes {
	random = 'RANDOM',
	average = 'AVERAGE',
	clone = 'CLONE'
}

interface GeneticConstructor {
	population: IPopMember[]
	amountOfDna?: number
	mutationFunction: MutationFunction
	mutationRate?: number
	fitnessFunction: FitnessFunction
	numberOfParents?: number
	modes?: {
		parentsSelection?: ParentsSelectionModes
		crossover?: CrossoverModes
	}
	preserveParents: boolean
}

type DNA = any

interface IPopMember {
	fitness: number
	dna: DNA
}

type MutationFunction = (mutationRate: number) => number
type FitnessFunction = (member: IPopMember) => number
type MapDnaFunction = (newDna: DNA[]) => IPopMember[]

export default class Genetic {
	parents: DNA[] = []
	newDna: DNA[] = []
	generation: number = 1

	population: IPopMember[]
	amountOfDna: number
	mutationFunction: MutationFunction
	mutationRate: number
	fitnessFunction: FitnessFunction
	numberOfParents: number
	modes: {
		parentsSelection: ParentsSelectionModes
		crossover: CrossoverModes
	}
	preserveParents: boolean

	constructor({
		population,
		amountOfDna,
		mutationFunction,
		mutationRate = 0.1,
		numberOfParents = 2,
		fitnessFunction,
		modes: { parentsSelection = ParentsSelectionModes.best, crossover = CrossoverModes.random } = {
			parentsSelection: ParentsSelectionModes.best,
			crossover: CrossoverModes.random
		},
		preserveParents = false
	}: GeneticConstructor) {
		this.population = population
		this.amountOfDna = amountOfDna || population.length
		this.mutationFunction = mutationFunction
		this.mutationRate = mutationRate
		this.numberOfParents = numberOfParents
		this.fitnessFunction = fitnessFunction
		this.modes = {
			parentsSelection,
			crossover
		}
		this.preserveParents = preserveParents
	}

	overwrite(overwriter: (self: this) => void): this {
		overwriter(this)
		return this
	}

	calculateFitness(): this {
		for (const member of this.population) member.fitness = this.fitnessFunction(member)

		return this
	}

	findParents(): this {
		this.parents = []

		if (this.modes.parentsSelection === ParentsSelectionModes.best) {
			this.parents = this.population
				.sort((a, b) => a.fitness - b.fitness)
				.slice(-this.numberOfParents)
				.map(e => e.dna)
		} else if (this.modes.parentsSelection === ParentsSelectionModes.probability) {
			let left = this.numberOfParents
			let fitnessSum = this.population.reduce((prev, curr) => prev + curr.fitness, 0)

			while (left-- > 0) {
				let chosen = Math.random() * fitnessSum

				for (let member of this.population) {
					chosen -= member.fitness
					if (chosen <= 0) {
						this.parents.push(member.dna)
						fitnessSum -= member.fitness
						this.population.splice(this.population.indexOf(member), 1)
						break
					}
				}
			}
		}

		return this
	}

	crossover(): this {
		this.newDna = []

		if (this.modes.crossover === CrossoverModes.random) {
			const deepAvrg = (targets: any[]): any => {
				if (Array.isArray(targets[0])) {
					return new Array(targets[0].length)
						.fill(null)
						.map((e, i) => deepAvrg(targets.map(e => e[i])))
				} else if (typeof targets[0] === 'object') {
					const temp: any = {}
					for (const key of Object.keys(targets[0])) {
						temp[key] = deepAvrg(targets.map(e => e[key]))
					}
					return temp
				} else if (typeof targets[0] === 'number')
					return targets[Math.floor(Math.random() * targets.length)]
			}

			this.newDna = new Array(this.amountOfDna).fill(null).map(() => deepAvrg(this.parents))
		} else if (this.modes.crossover === CrossoverModes.clone) {
			let left = this.amountOfDna

			while (left-- > 0) {
				let chosen = Math.floor(Math.random() * this.parents.length)

				this.newDna.push(JSON.parse(JSON.stringify(this.parents[chosen])))
			}
		} else if (this.modes.crossover === CrossoverModes.average) {
			const deepAvrg = (targets: any[]): any => {
				if (Array.isArray(targets[0])) {
					return new Array(targets[0].length)
						.fill(null)
						.map((e, i) => deepAvrg(targets.map(e => e[i])))
				} else if (typeof targets[0] === 'object') {
					const temp: any = {}
					for (const key of Object.keys(targets[0])) {
						temp[key] = deepAvrg(targets.map(e => e[key]))
					}
					return temp
				} else if (typeof targets[0] === 'number')
					return targets.reduce((prev, curr) => prev + curr, 0) / targets.length
			}

			const res = JSON.stringify(deepAvrg(this.parents))

			this.newDna = new Array(this.amountOfDna).fill(null).map(() => JSON.parse(res))
		}

		return this
	}

	mutate(): this {
		const deeper = (target: any[]): any => {
			if (Array.isArray(target)) {
				return target.map(deeper)
			} else if (typeof target === 'object') {
				const temp: any = {}
				for (const key of Object.keys(target)) {
					temp[key] = deeper(target[key])
				}
				return temp
			} else if (typeof target === 'number')
				return target + this.mutationFunction(this.mutationRate)
		}

		this.newDna = this.newDna.map(deeper)

		if (this.preserveParents) {
			this.parents.forEach((parent, i) => {
				this.newDna[i] = JSON.parse(JSON.stringify(parent))
			})
		}

		return this
	}

	finishGeneration(mapDnaFunction: MapDnaFunction): this {
		this.population = mapDnaFunction(this.newDna)
		this.generation++

		return this
	}

	nextGeneration(mapDnaFunction: MapDnaFunction): this {
		return this.calculateFitness()
			.findParents()
			.crossover()
			.mutate()
			.finishGeneration(mapDnaFunction)
	}

	static validatePopulation(population: any[]) {
		if (!population.every(mem => 'fitness' in mem))
			throw new Error('Member of the population is missing the fitness property.')

		if (!population.every(mem => typeof mem.fitness === 'number'))
			throw new Error('Fitness of a member of the population is not of type number.')

		if (!population.every(mem => 'dna' in mem))
			throw new Error('Member of the population is missing the dna property.')

		function validateTypes(obj: any) {
			if (Array.isArray(obj)) for (const ele of obj) validateTypes(ele)
			else if (typeof obj === 'object') for (const ele of Object.values(obj)) validateTypes(ele)
			else if (typeof obj !== 'number')
				throw new Error('Dna of a member of the population has an incorrect type.')
		}
		validateTypes(population)

		const zip = (a: any, b: any): any[] => a.map((e: any, i: number) => [e, b[i]])

		function validateStructure(obj: any, model: any) {
			if (Array.isArray(model)) {
				if (obj.length !== model.length)
					throw new Error('Dna of a member of the population has a different structure.')

				for (const [a, b] of zip(obj, model)) {
					if (Array.isArray(a) !== Array.isArray(b)) {
						throw new Error('Dna of a member of the population has a different structure.')
					} else if (typeof a !== typeof b) {
						throw new Error('Dna of a member of the population has a different structure.')
					} else if (typeof a !== 'number') {
						validateStructure(a, b)
					}
				}
			} else if (typeof obj === 'object') {
				if (!zip(Object.keys(obj), Object.keys(model)).every(([a, b]) => a === b)) {
					throw new Error('Dna of a member of the population has a different structure.')
				}

				for (const [a, b] of zip(Object.values(obj), Object.values(model))) {
					if (Array.isArray(a) !== Array.isArray(b)) {
						throw new Error('Dna of a member of the population has a different structure.')
					} else if (typeof a !== typeof b) {
						throw new Error('Dna of a member of the population has a different structure.')
					} else if (typeof a !== 'number') {
						validateStructure(a, b)
					}
				}
			} else if (typeof obj !== 'number')
				throw new Error('Dna of a member of the population has a different structure.')
		}

		for (const curr of population.slice(1)) validateStructure(curr, population[0])
	}
}

export const chance = (func: MutationFunction): MutationFunction => mutationRate => {
	if (Math.random() < mutationRate) return func(mutationRate)
	return 0
}

export const add = (min: number, max: number): MutationFunction => () => {
	return Math.random() * (max - min) + min
}
