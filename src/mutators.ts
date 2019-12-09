import { MutationFunction } from './genetic'

export const chance = (
  func: MutationFunction
): MutationFunction => mutationRate => {
  if (Math.random() < mutationRate) return func(mutationRate)
  return 0
}

export const add = (min: number, max: number): MutationFunction => () => {
  return Math.random() * (max - min) + min
}
