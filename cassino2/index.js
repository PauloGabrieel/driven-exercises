import chalk from "chalk";
import randomNumber from "./random.js";
const luckyNumber = randomNumber(2,12);
const firstNumber = randomNumber(1,6);
const secondNumber = randomNumber(1,6);


console.log(`Seu número da sorte é ${chalk.blue(luckyNumber)}`);
console.log("Jogando os dados...")
setTimeout(()=>{
    console.log(`Você tirou ${firstNumber} no primeiro dado!`);
}, 2000);

setTimeout(()=>{
    console.log(`Você tirou ${secondNumber} no sgundo dado!`);

}, 4000);

setTimeout(() => {
    if(firstNumber === secondNumber || (firstNumber + secondNumber) === luckyNumber){
        console.log(chalk.green("Você ganhou!!!"));
    }else{
        console.log(chalk.red("Você perdeu..."));
    }
}, 5000);
