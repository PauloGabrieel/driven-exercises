const luckyNumber = randomNumber(2,12);
const firstNumber = randomNumber(1,6);
const secondeNumber = randomNumber(1,6);


console.log(`Seu número da sorte é ${luckyNumber}`);
console.log("jogando os dados...");

setTimeout(()=>{
    console.log(`Seu primeiro número é ${firstNumber}`)
}, 2000);

setTimeout(() => {
    console.log(`Seu segundo número é ${secondeNumber}`)
}, 4000);

setTimeout (()=>{
    const sum = firstNumber + secondeNumber;

    if(sum === luckyNumber || firstNumber === secondeNumber){
        console.log("Você ganhou!");
    }else{
        console.log("Você perdeu...")
    }
    
}, 5000)




function randomNumber(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }