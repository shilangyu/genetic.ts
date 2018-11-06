export const enum ParentsSelectionModes {
	best = 'BEST',
	probability = 'PROBABILITY'
}

export const enum CrossoverModes {
	random = 'RANDOM',
	average = 'AVERAGE',
	clone = 'CLONE'
}

type DNA = { [key: string]: number }

interface IPopMember {
	fitness: number
	dna: DNA
}

export default class Genetic {
	parents: DNA[]
	chromosomes: DNA[]

	constructor(
		public mutationRate: number,
		public numberOfParents: number,
		public parentsSelectionMode: ParentsSelectionModes,
		public crossoverMode: CrossoverModes
	) {
		this.parents = []
		this.chromosomes = []
	}

	findParents(population: IPopMember[]): this {
		if (this.parentsSelectionMode === ParentsSelectionModes.best) {
			this.parents = population
				.sort((a, b) => a.fitness - b.fitness)
				.slice(-this.numberOfParents)
				.map(e => e.dna)
		} else if (this.parentsSelectionMode === ParentsSelectionModes.probability) {
			let left = this.numberOfParents
			let fitnessSum = population.reduce((prev, curr) => prev + curr.fitness, 0)

			while (left-- > 0) {
				let chosen = Math.random() * fitnessSum

				for (let member of population) {
					chosen -= member.fitness
					if (chosen <= 0) {
						this.parents.push(member.dna)
						fitnessSum -= member.fitness
						population.splice(population.indexOf(member), 1)
						break
					}
				}
			}
		}

		return this
	}

	crossover(amountOfChromosomes: number): this {
		if (this.crossoverMode === CrossoverModes.random) {
			let left = amountOfChromosomes

			while (left-- > 0) {
				const res: DNA = {}

				for (const key of Object.keys(this.parents[0])) {
					let chosen = Math.floor(Math.random() * this.parents.length)
					res[key] = this.parents[chosen][key]
				}

				this.chromosomes.push(res)
			}
		} else if (this.crossoverMode === CrossoverModes.clone) {
			let left = amountOfChromosomes

			while (left-- > 0) {
				let chosen = Math.floor(Math.random() * this.parents.length)

				this.chromosomes.push({ ...this.parents[chosen] })
			}
		} else if (this.crossoverMode === CrossoverModes.average) {
			const res: DNA = {}

			for (const key of Object.keys(this.parents[0])) {
				const sum = this.parents.reduce((prev, curr) => prev + curr[key], 0)
				const avrg = sum / this.parents.length
				res[key] = avrg
			}

			this.chromosomes = new Array(amountOfChromosomes).fill(null).map(() => ({ ...res }))
		}

		return this
	}
}
