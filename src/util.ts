import { DNA } from './genetic'

export const dnaCopy = (target: DNA): any => {
  if (Array.isArray(target)) {
    return target.map(dnaCopy)
  } else if (typeof target === 'object') {
    const temp: any = {}
    for (const key of Object.keys(target)) {
      temp[key] = dnaCopy(target[key])
    }
    return temp
  } else if (typeof target === 'number') return target
}

export const validatePopulation = (population: any) => {
  if (!Array.isArray(population))
    throw new Error('The population is not an array.')

  if (
    !population.every(
      mem => 'fitness' in mem && typeof mem.fitness === 'function'
    )
  )
    throw new Error('Member of the population is missing the fitness method.')

  if (!population.every(mem => typeof mem.fitness() === 'number'))
    throw new Error(
      'Fitness of a member of the population returns something else than a number.'
    )

  if (!population.every(mem => 'dna' in mem))
    throw new Error('Member of the population is missing the dna property.')

  function validateDnaTypes(obj: any) {
    if (Array.isArray(obj)) for (const ele of obj) validateDnaTypes(ele)
    else if (typeof obj === 'object')
      for (const ele of Object.values(obj)) validateDnaTypes(ele)
    else if (typeof obj !== 'number')
      throw new Error(
        'Dna of a member of the population has an incorrect type.'
      )
  }
  validateDnaTypes(population.map(p => p.dna))

  const zip = (a: any, b: any): any[] => a.map((e: any, i: number) => [e, b[i]])

  function validateStructure(obj: any, model: any) {
    if (Array.isArray(model)) {
      if (obj.length !== model.length)
        throw new Error(
          'Dna of a member of the population has a different structure.'
        )

      for (const [a, b] of zip(obj, model)) {
        if (Array.isArray(a) !== Array.isArray(b)) {
          throw new Error(
            'Dna of a member of the population has a different structure.'
          )
        } else if (typeof a !== typeof b) {
          throw new Error(
            'Dna of a member of the population has a different structure.'
          )
        } else if (typeof a !== 'number') {
          validateStructure(a, b)
        }
      }
    } else if (typeof obj === 'object') {
      if (
        !zip(Object.keys(obj), Object.keys(model)).every(([a, b]) => a === b)
      ) {
        throw new Error(
          'Dna of a member of the population has a different structure.'
        )
      }

      for (const [a, b] of zip(Object.values(obj), Object.values(model))) {
        if (Array.isArray(a) !== Array.isArray(b)) {
          throw new Error(
            'Dna of a member of the population has a different structure.'
          )
        } else if (typeof a !== typeof b) {
          throw new Error(
            'Dna of a member of the population has a different structure.'
          )
        } else if (typeof a !== 'number') {
          validateStructure(a, b)
        }
      }
    } else if (typeof obj !== 'number')
      throw new Error(
        'Dna of a member of the population has a different structure.'
      )
  }

  for (const curr of population.slice(1))
    validateStructure(curr.dna, population[0].dna)
}
