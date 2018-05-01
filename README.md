# Genetic.js
Simple and clear JavaScript class for genetic algorithms. Contains helpful warning and error messages to enhance your understanding.
* [usage](#usage)
* [modes](#modes)
* [on the way](#on-the-way)

## usage
First, include the Gene.js file in your project. In HTML:
```html
<script scr="Gene.js"></script>
```
Adjust the path in the ```scr``` property

Then in your JavaScript code create your population. For now you need to do it yourself, but soon i'll update the code to do it for you.
Here are the criteria’s of your population:
- it must be an array of objects
-  each object must have a property called ```fitness``` 
- each object must contain also a ```dna``` object. It will have all your dna data that you want to pass to the next generations. All properties of ```dna``` must be numbers

Example of a population:
```js
    let yourPopulation =
        [{fitness: 201, dna:{prop1: 111, prop2: 0.2, prop3:43}}, 
        {fitness: 10, dna:{prop1: 200, prop2: 3, prop3: 50}},
        {fitness: 92, dna:{prop1: 2, prop2: 20, prop3: 13}}]
```
Now you are all set! Now just create a Gene instance, find the parents and finish with creating your new, better population. Just like that:
```js
    let gene = new Gene()
```
Gene takes 3 optional parameters: mutationRate, numberOfParents, and modes

Their defaults are:
- ```mutationRate``` is 1%
- ```numberOfParents``` is 2
- ```modes``` object with properties: inheritance = 'chromosome', mating = 'probability', mutating = '' 

Next you want to find their parents
```js
    let yourParents = gene.findParents(yourPopulation)
```
to see the parents and handle them yourself access them from ```gene.parents``` or catch it from the function itself.

Now, create the genes:
```js
    let yourNewGenes = gene.createGenes(100)
```

Method ```createGenes``` takes an obligatory parameter: amount of genes to create. Again, you can retrieve the genes from the function or from ```gene.newGenes```.

Finish off with mutating the genes:
```js
    let yourNewMutatedGenes = gene.mutateGenes()
```
returns an array of mutated genes.

## modes
###### Inheritance modes: 
*methods of choosing the passed dna*

```'chromosome'```: classical method. Mixing parents' dna by choosing randomly a parent for each dna's property

```'average'```: sum of each parents dna property divided by the number of parents

###### Mutation modes:
*methods of mutating the passed dna*

```''```: 

```''```: 

###### Mating pool modes:
*methods of choosing the parents*

```'best'```: takes n amount of members with best fitness scores

```'probability'```: all members have a % chance of being chosen based on their fitness'


## on the way
- [ ] ```dna``` containing  different types than only numbers
- [ ] mutation modes
