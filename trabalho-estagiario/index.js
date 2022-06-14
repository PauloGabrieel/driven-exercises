import fs from "fs"


for(let i = 1; i <=100;i++){
    const nomeArquivo = `${i}.txt`;
    const conteudoArquivo = `Lista 1 - Cálculo 1 - Exercício [${i}]`;
    fs.writeFileSync(nomeArquivo, conteudoArquivo );

};
