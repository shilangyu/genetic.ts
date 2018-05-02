class Gene {
	constructor(mutationRate = .01, amountOfParents = 2, modes) {
		const inhModes = ['chromosome', 'average']
		const mateModes = ['best', 'probability']

		this.modes = {
			inheritance: 'chromosome',
			mating: 'probability'
		}

		try {
			if(Number.isNaN(amountOfParents = Number.parseInt(amountOfParents)))
				throw new TypeError(`amountOfParents argument is not a number`)
			else if(amountOfParents <= 0) 
				throw 'Cannot use less than 1 parent.'
			else
				this.amountOfParents = amountOfParents

			if(modes.inheritance == undefined);
			else if(!inhModes.some(val => val == modes.inheritance))
				throw `No such inheritance mode found: ${modes.inheritance}.\nAvailable modes: ${inhModes.join(', ')}`
			else
				this.modes.inheritance = modes.inheritance

			if(modes.mating == undefined);
			else if(!mateModes.some(val => val == modes.mating))
				throw `No such mating mode found: ${modes.mating}.\nAvailable modes: ${mateModes.join(', ')}`
			else
				this.modes.mating = modes.mating
			
			if(Number.isNaN(mutationRate = Number.parseFloat(mutationRate)))
				throw new TypeError(`mutationRate argument is not a number`)
			else if(mutationRate <= 0 || mutationRate >= 1)
				console.warn(`Mutation rate is ${mutationRate*100}%`)
			this.mutationRate = mutationRate

			this.parents = []
			this.newGenes = []
		} catch(e) {
			if(e instanceof TypeError)
				console.error(e)
			else
				throw new Error(e)
		}
	}

	findParents(population) {
		try {
			if(!Array.isArray(population))
				throw new TypeError(`Passed parameter is not an array`)
			
			if(population.length < this.amountOfParents)
				throw new RangeError(`Population has less members than amount of parents chosen.\nPop: ${population.length}, Parents: ${this.amountOfParents}`)

			if(!population[0].hasOwnProperty('dna'))
				throw new ReferenceError(`Population does not contain the 'dna' property.`)
			
			if(!population[0].hasOwnProperty('fitness'))
				throw new ReferenceError(`Population does not contain the 'fitness' property.`)
				
		} catch(e) {
			if(e instanceof TypeError)
				console.error(e)
			else if(e instanceof RangeError)
				console.error(e)
			else if(e instanceof ReferenceError)
				console.error(e)
			else
				throw new Error(e)
		}
		

		switch(this.modes.mating) {
			case 'best':
				this.parents = population	.slice()
											.sort((a, b) => a.fitness - b.fitness)
											.slice(-this.amountOfParents)
											.map( ele => ele.dna)
				break
			case 'probability':
				this.parents = []
				
				let left = this.amountOfParents
				while(left-- > 0) {
					let choose = Math.random() * population.reduce( (total, curr) => total+curr.fitness, 0)
				
					for (let i = 0; i < population.length; i++) {
						choose -= population[i].fitness
						if(choose <= 0 ) {
							this.parents.push(population[i].dna)
							break
						}
					}
				}
				break
			default:
				break
		}
		return this.parents
	}

	createGenes(amount) {
		if(amount <= 0)
			console.warn('You are creating an empty population.')

		// create new generation with parents mutated genes
		switch (this.modes.inheritance) {
			case 'chromosome':
				for (let i = 0; i < amount; i++) {
					let tempObj = {}
					for (let val in this.parents[0])
						tempObj[val] = this.parents[Math.floor(Math.random() * this.amountOfParents)][val]
					this.newGenes.push(tempObj)
				}
				break
			case 'average':
				let temp = {}
				for (let prop in this.parents[0]) {
					if(this.parents[0].hasOwnProperty(prop))
						temp[prop] = this.parents.map(ele => ele[prop]).reduce((sum, curr) => sum + curr) / this.amountOfParents
				}
				this.parents = temp

				for (let i = 0; i < amount; i++) {
					let tempObj = {}
					for (let val in this.parents)
						tempObj[val] = this.parents[val]
					this.newGenes.push(tempObj)
				}
				break
			default:
				break
		}
		return this.newGenes
	}

	mutateGenes(func) {

		try {
			if(typeof f != 'function')
				throw new TypeError(`Passed parameter is not a function`)
		} catch(e) {
			if(e instanceof TypeError)
				console.error(e)
			else
				throw new Error(e)
		}

		for (let i = 0; i < this.newGenes.length; i++) {
			for (let val in this.newGenes[i]) {
				this.newGenes[i][val] = func(this.newGenes[i][val], this.mutationRate)
			}
		}
		return this.newGenes
	}
}
