import { CrossoverModes, Instance } from '../src/genetic'

describe('`crossover` method of an Genetic instance', () => {
  describe('random gene crossover', () => {
    it('tests for shallow DNA', () => {
      const mockPopulation = [
        { fitness: () => 100, dna: { asd: 1, tut: 11 } },
        { fitness: () => 200, dna: { asd: 2, tut: 12 } },
        { fitness: () => 300, dna: { asd: 3, tut: 1 } },
        { fitness: () => 400, dna: { asd: 4, tut: 12 } },
        { fitness: () => 500, dna: { asd: 8, tut: 10 } }
      ]

      const g = new Instance({
        population: mockPopulation,
        mutationFunction: () => 1
      })

      g.findParents().crossover()

      const result = g.newDna

      expect(result).toHaveLength(5)
    })

    it('tests for deep DNA', () => {
      const mockPopulation = [
        { fitness: () => 100, dna: [{ a: 213, e: [31] }, [[2, 46, 5]]] },
        { fitness: () => 200, dna: [{ a: 23, e: [31] }, [[32, 64, 542]]] },
        { fitness: () => 300, dna: [{ a: 21, e: [32] }, [[2, 4, 53]]] },
        { fitness: () => 400, dna: [{ a: 13, e: [223] }, [[442, 24, 35]]] },
        { fitness: () => 500, dna: [{ a: 3, e: [13] }, [[2, 74, 5]]] }
      ]

      const g = new Instance({
        population: mockPopulation,
        mutationFunction: () => 1
      })

      g.findParents().crossover()

      const result = g.newDna

      expect(result).toHaveLength(5)
    })
  })

  describe('clone gene crossover', () => {
    it('tests for shallow DNA', () => {
      const mockPopulation = [
        { fitness: () => 100, dna: { asd: 1, tut: 11 } },
        { fitness: () => 200, dna: { asd: 2, tut: 12 } },
        { fitness: () => 300, dna: { asd: 3, tut: 1 } },
        { fitness: () => 400, dna: { asd: 4, tut: 12 } },
        { fitness: () => 500, dna: { asd: 8, tut: 10 } }
      ]

      const g = new Instance({
        population: mockPopulation,
        numberOfParents: 1,
        mutationFunction: () => 1,
        modes: { crossover: CrossoverModes.clone }
      })

      g.findParents().crossover()

      const result = g.newDna
      const expected = [
        { asd: 8, tut: 10 },
        { asd: 8, tut: 10 },
        { asd: 8, tut: 10 },
        { asd: 8, tut: 10 },
        { asd: 8, tut: 10 }
      ]

      expect(result).toEqual(expected)
    })

    it('tests for deep DNA', () => {
      const mockPopulation = [
        { fitness: () => 100, dna: [{ a: 213, e: [31] }, [[2, 46, 5]]] },
        { fitness: () => 200, dna: [{ a: 23, e: [31] }, [[32, 64, 542]]] },
        { fitness: () => 300, dna: [{ a: 21, e: [32] }, [[2, 4, 53]]] },
        { fitness: () => 400, dna: [{ a: 13, e: [223] }, [[442, 24, 35]]] },
        { fitness: () => 500, dna: [{ a: 3, e: [13] }, [[2, 74, 5]]] }
      ]

      const g = new Instance({
        population: mockPopulation,
        numberOfParents: 1,
        mutationFunction: () => 1,
        modes: { crossover: CrossoverModes.clone }
      })

      g.findParents().crossover()

      const result = g.newDna
      const expected = [
        [{ a: 3, e: [13] }, [[2, 74, 5]]],
        [{ a: 3, e: [13] }, [[2, 74, 5]]],
        [{ a: 3, e: [13] }, [[2, 74, 5]]],
        [{ a: 3, e: [13] }, [[2, 74, 5]]],
        [{ a: 3, e: [13] }, [[2, 74, 5]]]
      ]

      expect(result).toEqual(expected)
    })
  })

  describe('average gene crossover', () => {
    it('tests for shallow DNA', () => {
      const mockPopulation = [
        { fitness: () => 100, dna: { asd: 1, tut: 11 } },
        { fitness: () => 200, dna: { asd: 2, tut: 12 } },
        { fitness: () => 300, dna: { asd: 3, tut: 1 } },
        { fitness: () => 400, dna: { asd: 4, tut: 12 } },
        { fitness: () => 500, dna: { asd: 8, tut: 10 } }
      ]

      const g = new Instance({
        population: mockPopulation,
        mutationFunction: () => 1,
        modes: { crossover: CrossoverModes.average }
      })

      g.findParents().crossover()

      const result = g.newDna
      const expected = [
        { asd: 6, tut: 11 },
        { asd: 6, tut: 11 },
        { asd: 6, tut: 11 },
        { asd: 6, tut: 11 },
        { asd: 6, tut: 11 }
      ]

      expect(result).toEqual(expected)
    })

    it('tests for deep DNA', () => {
      const mockPopulation = [
        { fitness: () => 100, dna: [{ a: 213, e: [31] }, [[2, 46, 5]]] },
        { fitness: () => 200, dna: [{ a: 23, e: [31] }, [[32, 64, 542]]] },
        { fitness: () => 300, dna: [{ a: 21, e: [32] }, [[2, 4, 53]]] },
        { fitness: () => 400, dna: [{ a: 13, e: [223] }, [[442, 24, 35]]] },
        { fitness: () => 500, dna: [{ a: 3, e: [13] }, [[2, 74, 5]]] }
      ]

      const g = new Instance({
        population: mockPopulation,
        mutationFunction: () => 1,
        modes: { crossover: CrossoverModes.average }
      })

      g.findParents().crossover()

      const result = g.newDna
      const expected = [
        [{ a: 8, e: [118] }, [[222, 49, 20]]],
        [{ a: 8, e: [118] }, [[222, 49, 20]]],
        [{ a: 8, e: [118] }, [[222, 49, 20]]],
        [{ a: 8, e: [118] }, [[222, 49, 20]]],
        [{ a: 8, e: [118] }, [[222, 49, 20]]]
      ]

      expect(result).toEqual(expected)
    })
  })

  it('tests unsupported crossover mode', () => {
    const mockPopulation = [
      { fitness: () => 100, dna: [{ a: 213, e: [31] }, [[2, 46, 5]]] },
      { fitness: () => 200, dna: [{ a: 23, e: [31] }, [[32, 64, 542]]] },
      { fitness: () => 300, dna: [{ a: 21, e: [32] }, [[2, 4, 53]]] },
      { fitness: () => 400, dna: [{ a: 13, e: [223] }, [[442, 24, 35]]] },
      { fitness: () => 500, dna: [{ a: 3, e: [13] }, [[2, 74, 5]]] }
    ]

    const g = new Instance({
      population: mockPopulation,
      mutationFunction: () => 1,
      modes: { crossover: -1 }
    })

    expect(() => g.findParents().crossover()).toThrowError(
      'Current crossover mode is not supported.'
    )
  })
})
