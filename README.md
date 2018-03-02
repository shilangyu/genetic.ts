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
Gene takes 4 optional parameters: mutationRate, numberOfParents, inheritanceMode and matingMode
Their defaults are:
- ```mutationRate``` is 1%
- ```numberOfParents``` is 2
- ```inheritanceMode``` is 'chromosome' 
- ```matingMode``` is 'probability' 

Next you want to find their parents
```js
    gene.findParents(yourPopulation)
```
to see the parents and handle them yourself access them from ```gene.parents```
Finish off with creating a new population:
```js
    let yourNewPopulation = gene.createPopulation(100)
```

Method ```createPopulation``` takes an obligatory parameter: amount of members of population to create

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
- [ ] Gene.js creating and handling your population
- [ ] ```dna``` containing properties that are strings
- [ ] mutation modes
