import express from "express";

const extrato = [
  { cliente: 'Fulano', movimentacao: 300.00, data: "13/01/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 210.30, data: "14/01/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 500.00, data: "14/01/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 704.30, data: "20/01/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 600.00, data: "30/01/2022", tipo: "entrada" },
  { cliente: 'Beltrano', movimentacao: 200.50, data: "02/02/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 42.80, data: "02/02/2022", tipo: "saida" },
  { cliente: 'Beltrano', movimentacao: 100.00, data: "04/02/2022", tipo: "entrada" },
  { cliente: 'Fulano', movimentacao: 20.10, data: "11/02/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 300.00, data: "13/02/2022", tipo: "entrada" },
  { cliente: 'Fulano', movimentacao: 30.30, data: "21/02/2022", tipo: "saida" },
  { cliente: 'Beltrano', movimentacao: 300.20, data: "25/02/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 100.60, data: "30/02/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 41.00, data: "03/03/2022", tipo: "saida" },
  { cliente: 'Ciclana', movimentacao: 23.00, data: "08/03/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 300.00, data: "13/03/2022", tipo: "entrada" },
  { cliente: 'Beltrano', movimentacao: 10.10, data: "15/03/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 30.90, data: "20/03/2022", tipo: "saida" },
];

const app = express();

app.get("/extrato", (req, res) => {
  const nameClient = req.headers.user;
  const { dia, mes, tipo } = req.query;

  console.log(dia);
  console.log(mes);
  console.log(tipo);
  if (!nameClient) {
    res.sendStatus(401);
    return;
  }
  const extratoFiltrado = extrato.filter(client => client.cliente === nameClient);


  if (tipo) {
    if (mes) {
      if (dia) {
        const extratoFiltradoTipoMesDia = extratoFiltrado.filter(ex => ex.tipo === tipo
          && ex.data.substring(3, 5) === mes
          && ex.data.substring(0, 2) === dia);
        res.send(extratoFiltradoTipoMesDia);
      } else {
        const extratoFiltradoTipoMes = extratoFiltrado.filter(ex => ex.tipo === tipo
          && ex.data.substring(3, 5) === mes);
        res.send(extratoFiltradoTipoMes);
        return;
      };
    } else if(dia){
      const extratoFiltradoTipoDia = extratoFiltrado.filter(ex => ex.tipo === tipo && ex.data.substring(0,2) === dia );
      res.send(extratoFiltradoTipoDia);
      return;
    }else{
      const extratoFiltradoTipo = extratoFiltrado.filter(t => t.tipo === tipo);
      res.send(extratoFiltradoTipo);
      return;
    }
    
  
  } else if (mes) {
      if (dia) {
        const extratoFiltradoMesDia = extratoFiltrado.filter(ex => ex.data.substring(3, 5) === mes
        && ex.data.substring(0, 2) === dia);
        res.send(extratoFiltradoMesDia)
        return;
      }else{
        const extratoFiltradoMes = extratoFiltrado.filter(ex => ex.data.substring(3, 5) === mes);
        res.send(extratoFiltradoMes);
        return;
      };
    
  } else if (dia) {
    const extratoFiltradoDia = extratoFiltrado.filter(ex => ex.data.substring(0, 2) === dia);
    res.send(extratoFiltradoDia);
    return;
  }else{
    res.send(extratoFiltrado);
  }
});


app.listen(5000);
