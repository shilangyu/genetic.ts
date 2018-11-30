import Genetic from '../Genetic'

describe('`calculateFitness` method of an Genetic instance', () => {
	it('tests the best parents selection', () => {
		const mockPopulation = [
			{ fitness: 0, dna: { asd: 1, a: [0, 2] } },
			{ fitness: 0, dna: { asd: 2, a: [1, 2] } },
			{ fitness: 0, dna: { asd: 3, a: [2, 2] } },
			{ fitness: 0, dna: { asd: 4, a: [3, 2] } },
			{ fitness: 0, dna: { asd: 5, a: [4, 2] } }
		]

		const g = new Genetic({
			fitnessFunction: ({ dna }) => dna.asd + dna.a[1] * dna.a[0],
			population: mockPopulation,
			mutationFunction: () => 1
		})

		g.calculateFitness()

		const result = g.population
		const expected = [
			{ fitness: 1, dna: { asd: 1, a: [0, 2] } },
			{ fitness: 4, dna: { asd: 2, a: [1, 2] } },
			{ fitness: 7, dna: { asd: 3, a: [2, 2] } },
			{ fitness: 10, dna: { asd: 4, a: [3, 2] } },
			{ fitness: 13, dna: { asd: 5, a: [4, 2] } }
		]

		expect(result).toEqual(expected)
	})
})
