import { validatePopulation } from '../src/genetic'

describe('`validatePopulation` static method of the Genetic class', () => {
  it('tests missing fitness', () => {
    const mockPopulation = [
      { fitness: () => 100, dna: { asd: 1 } },
      { dna: { asd: 2 } },
      { fitness: () => 300, dna: { asd: 3 } },
      { fitness: () => 400, dna: { asd: 4 } },
      { fitness: () => 500, dna: { asd: 5 } }
    ]

    expect(() => validatePopulation(mockPopulation)).toThrowError(
      'Member of the population is missing the fitness method.'
    )
  })

  it('tests fitness that isnt a method', () => {
    const mockPopulation = [
      { fitness: () => 100, dna: { asd: 1 } },
      { fitness: 200, dna: { asd: 2 } },
      { fitness: () => 300, dna: { asd: 3 } },
      { fitness: () => 400, dna: { asd: 4 } },
      { fitness: () => 500, dna: { asd: 5 } }
    ]

    expect(() => validatePopulation(mockPopulation)).toThrowError(
      'Member of the population is missing the fitness method.'
    )
  })

  it('tests wrong type fitness', () => {
    const mockPopulation = [
      { fitness: () => 100, dna: { asd: 1 } },
      { fitness: () => 'a', dna: { asd: 2 } },
      { fitness: () => 300, dna: { asd: 3 } },
      { fitness: () => 400, dna: { asd: 4 } },
      { fitness: () => 500, dna: { asd: 5 } }
    ]

    expect(() => validatePopulation(mockPopulation)).toThrowError(
      'Fitness of a member of the population returns something else than a number.'
    )
  })

  it('tests population not being an array', () => {
    const mockPopulation = { fitness: () => 100, dna: { asd: 1 } }

    expect(() => validatePopulation(mockPopulation)).toThrowError(
      'The population is not an array.'
    )
  })

  it('tests missing DNA', () => {
    const mockPopulation = [
      { fitness: () => 100, dna: { asd: 1 } },
      { fitness: () => 200, dna: { asd: 2 } },
      { fitness: () => 300, dna: { asd: 3 } },
      { fitness: () => 400 },
      { fitness: () => 500, dna: { asd: 5 } }
    ]

    expect(() => validatePopulation(mockPopulation)).toThrowError(
      'Member of the population is missing the dna property.'
    )
  })

  it('tests wrong type DNA', () => {
    const mockPopulation = [
      { fitness: () => 100, dna: { asd: { abc: [1, 2, [0]] } } },
      { fitness: () => 200, dna: { asd: { abc: [1, 2, [0]] } } },
      { fitness: () => 300, dna: { asd: { abc: [1, 2, ['1']] } } },
      { fitness: () => 400, dna: { asd: { abc: [1, 2, [0]] } } },
      { fitness: () => 500, dna: { asd: { abc: [1, 2, [0]] } } }
    ]

    expect(() => validatePopulation(mockPopulation)).toThrowError(
      'Dna of a member of the population has an incorrect type.'
    )
  })

  it('tests inconsistent dna throughout the population', () => {
    const mockPopulation = [
      { fitness: () => 100, dna: { asd: { abc: [1, 2, [0]] } } },
      { fitness: () => 200, dna: { asd: { abc: [1, 2, [0]] } } },
      { fitness: () => 300, dna: { asd: { azc: [1, 2, [0]] } } },
      { fitness: () => 400, dna: { asd: { abc: [1, 2, [0]] } } },
      { fitness: () => 500, dna: { asd: { abc: [1, 2, [0]] } } }
    ]

    expect(() => validatePopulation(mockPopulation)).toThrowError(
      'Dna of a member of the population has a different structure.'
    )
  })

  it('tests a valid population', () => {
    const mockPopulation = [
      { fitness: () => 100, dna: { asd: { abc: [1, 2, [0]] } } },
      { fitness: () => 200, dna: { asd: { abc: [1, 2, [0]] } } },
      { fitness: () => 300, dna: { asd: { abc: [1, 2, [123]] } } },
      { fitness: () => 400, dna: { asd: { abc: [1, 2, [0]] } } },
      { fitness: () => 500, dna: { asd: { abc: [1, 2, [0]] } } }
    ]

    expect(() => validatePopulation(mockPopulation)).not.toThrowError()
  })
})
