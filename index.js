function sumNumbers(number){
    if(typeof number !== 'number') return;
    let sum = 0
    for (let index = 0; index <= number; index++) {
      sum += index;
    }
    return sum;
}