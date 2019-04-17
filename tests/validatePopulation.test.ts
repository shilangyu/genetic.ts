import { validatePopulation } from '../Genetic'

describe('`validatePopulation` static method of the Genetic class', () => {
	it('tests missing fitness', () => {
		const mockPopulation = [
			{ fitness: 100, dna: { asd: 1 } },
			{ dna: { asd: 2 } },
			{ fitness: 300, dna: { asd: 3 } },
			{ fitness: 400, dna: { asd: 4 } },
			{ fitness: 500, dna: { asd: 5 } }
		]

		const expected = 'Member of the population is missing the fitness property.'
		let result = ''

		try {
			validatePopulation(mockPopulation)
		} catch (err) {
			result = err.message
		}

		expect(result).toBe(expected)
	})

	it('tests wrong type fitness', () => {
		const mockPopulation = [
			{ fitness: 100, dna: { asd: 1 } },
			{ fitness: 'a', dna: { asd: 2 } },
			{ fitness: 300, dna: { asd: 3 } },
			{ fitness: 400, dna: { asd: 4 } },
			{ fitness: 500, dna: { asd: 5 } }
		]

		const expected = 'Fitness of a member of the population is not of type number.'
		let result = ''

		try {
			validatePopulation(mockPopulation)
		} catch (err) {
			result = err.message
		}

		expect(result).toBe(expected)
	})

	it('tests missing DNA', () => {
		const mockPopulation = [
			{ fitness: 100, dna: { asd: 1 } },
			{ fitness: 200, dna: { asd: 2 } },
			{ fitness: 300, dna: { asd: 3 } },
			{ fitness: 400 },
			{ fitness: 500, dna: { asd: 5 } }
		]

		const expected = 'Member of the population is missing the dna property.'
		let result = ''

		try {
			validatePopulation(mockPopulation)
		} catch (err) {
			result = err.message
		}

		expect(result).toBe(expected)
	})

	it('tests wrong type DNA', () => {
		const mockPopulation = [
			{ fitness: 100, dna: { asd: { abc: [1, 2, [0]] } } },
			{ fitness: 200, dna: { asd: { abc: [1, 2, [0]] } } },
			{ fitness: 300, dna: { asd: { abc: [1, 2, ['1']] } } },
			{ fitness: 400, dna: { asd: { abc: [1, 2, [0]] } } },
			{ fitness: 500, dna: { asd: { abc: [1, 2, [0]] } } }
		]

		const expected = 'Dna of a member of the population has an incorrect type.'
		let result = ''

		try {
			validatePopulation(mockPopulation)
		} catch (err) {
			result = err.message
		}

		expect(result).toBe(expected)
	})

	it('tests inconsistent dna throughout the population', () => {
		const mockPopulation = [
			{ fitness: 100, dna: { asd: { abc: [1, 2, [0]] } } },
			{ fitness: 200, dna: { asd: { abc: [1, 2, [0]] } } },
			{ fitness: 300, dna: { asd: { azc: [1, 2, [0]] } } },
			{ fitness: 400, dna: { asd: { abc: [1, 2, [0]] } } },
			{ fitness: 500, dna: { asd: { abc: [1, 2, [0]] } } }
		]

		const expected = 'Dna of a member of the population has a different structure.'
		let result = ''

		try {
			validatePopulation(mockPopulation)
		} catch (err) {
			result = err.message
		}

		expect(result).toBe(expected)
	})

	it('tests a valid population', () => {
		const mockPopulation = [
			{ fitness: 100, dna: { asd: { abc: [1, 2, [0]] } } },
			{ fitness: 200, dna: { asd: { abc: [1, 2, [0]] } } },
			{ fitness: 300, dna: { asd: { abc: [1, 2, [123]] } } },
			{ fitness: 400, dna: { asd: { abc: [1, 2, [0]] } } },
			{ fitness: 500, dna: { asd: { abc: [1, 2, [0]] } } }
		]

		const expected = ''
		let result = ''

		try {
			validatePopulation(mockPopulation)
		} catch (err) {
			result = err.message
		}

		expect(result).toBe(expected)
	})
})
