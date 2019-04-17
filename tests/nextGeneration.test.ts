import { Instance } from '../Genetic'

describe('`nextGeneration` method of an Genetic instance', () => {
	it('tests the generation counter increase', () => {
		const g = new Instance({
			population: [],
			mutationFunction: () => 1,
			fitnessFunction: () => 0
		})

		g.nextGeneration(() => [])

		const result = g.generation
		const expected = 2

		expect(result).toEqual(expected)
	})

	it('tests the second generation on one instance', () => {
		const mockPopulation = [
			{ fitness: 100, dna: { asd: 1, tut: 11 } },
			{ fitness: 200, dna: { asd: 2, tut: 12 } },
			{ fitness: 300, dna: { asd: 3, tut: 1 } },
			{ fitness: 400, dna: { asd: 4, tut: 12 } },
			{ fitness: 500, dna: { asd: 8, tut: 10 } }
		]

		const g = new Instance({
			population: mockPopulation,
			numberOfParents: 1,
			mutationFunction: () => 0,
			fitnessFunction: () => 0
		})

		g.nextGeneration(newDna => newDna.map(dna => ({ fitness: 0, dna })))

		const result = g.population
		const expected = [
			{ fitness: 0, dna: { asd: 8, tut: 10 } },
			{ fitness: 0, dna: { asd: 8, tut: 10 } },
			{ fitness: 0, dna: { asd: 8, tut: 10 } },
			{ fitness: 0, dna: { asd: 8, tut: 10 } },
			{ fitness: 0, dna: { asd: 8, tut: 10 } }
		]

		expect(result).toEqual(expected)
	})
})
