import { Instance } from '../src/genetic'

describe('`nextGeneration` method of an Genetic instance', () => {
  it('tests the generation counter increase', () => {
    const ga = new Instance({
      population: [],
      mutationFunction: () => 1
    })

    ga.nextGeneration()

    const result = ga.generation
    const expected = 2

    expect(result).toEqual(expected)
  })

  it('tests the second generation on one instance', () => {
    const mockPopulation = [
      { fitness: () => 100, dna: { asd: 1, tut: 11 } },
      { fitness: () => 200, dna: { asd: 2, tut: 12 } },
      { fitness: () => 300, dna: { asd: 3, tut: 1 } },
      { fitness: () => 400, dna: { asd: 4, tut: 12 } },
      { fitness: () => 500, dna: { asd: 8, tut: 10 } }
    ]

    const ga = new Instance({
      population: mockPopulation,
      numberOfParents: 1,
      mutationFunction: () => 0
    }).nextGeneration()

    const result = ga.population.map(e => e.dna)
    const expected = [
      { asd: 8, tut: 10 },
      { asd: 8, tut: 10 },
      { asd: 8, tut: 10 },
      { asd: 8, tut: 10 },
      { asd: 8, tut: 10 }
    ]

    expect(result).toEqual(expected)
  })
})
