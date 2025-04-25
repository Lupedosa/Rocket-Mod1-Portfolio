Array.prototype.meuMap = function(callback) {
    const resultado = [];
    for (let i = 0; i < this.length; i++) {
        resultado.push(callback(this[i], i, this));
    }
    return resultado;
};

Array.prototype.meuFilter = function(callback) {
    const resultado = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            resultado.push(this[i]);
        }
    }
    return resultado;
};

Array.prototype.meuReduce = function(callback, valorInicial) {
    let acumulador = valorInicial !== undefined ? valorInicial : this[0];
    let i = valorInicial !== undefined ? 0 : 1;

    for (; i < this.length; i++) {
        acumulador = callback(acumulador, this[i], i, this);
    }

    return acumulador;
};

Array.prototype.meuForEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
};

Array.prototype.meuFind = function(callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return this[i];
        }
    }
    return undefined;
};

const numeros = [10, 25, 30, 5, 50];

const dobrados = numeros.meuMap(n => n * 2);
console.log('Map (dobrados):', dobrados); // [20, 50, 60, 10, 100]

const maioresQue20 = numeros.meuFilter(n => n > 20);
console.log('Filter (maiores que 20):', maioresQue20); // [25, 30, 50]

const somaTotal = numeros.meuReduce((acc, n) => acc + n, 0);
console.log('Reduce (soma total):', somaTotal); // 120

console.log('ForEach (printando cada número):');
numeros.meuForEach(n => console.log(n)); // 10, 25, 30, 5, 50

const primeiroMaiorQue20 = numeros.meuFind(n => n > 20);
console.log('Find (primeiro maior que 20):', primeiroMaiorQue20); // 25
