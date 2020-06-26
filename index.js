const express = require("express");
const MercadoPago = require("mercadopago"); 
const app = express();

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-3260321011293596-061906-6cdf2c22206e79007f91b8f5642b3cf2-267336909"
});


app.get("/", (req, res) => {

    var filters = {
        "order.id": "1548504759"
      };
    
      console.log(filters);

      MercadoPago.payment.search({
        qs: filters
      }).then(function (data) {
        res.send(data);
      }).catch(function (error) {
        res.send(error);
      });

    
});

app.get("/pagar",async (req, res) => {

    // Pagamentos

    // id // codigo // pagador // status
    // 1 // 1593163315787 // victordevtb@gmail.com  // Não foi pago
    // 2 //  1593163315782 // victordevtb2@gmail.com // Pago

    var id = "" + Date.now();
    var emailDoPagador = "victordevtb@outlook.com";

    var dados = {
        items: [
            item = {
                id: id,
                title: "2x video games;3x camisas",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer:{
            email: emailDoPagador
        },
        external_reference: id
    }

    try{
        var pagamento = await MercadoPago.preferences.create(dados);
        //Banco.SalvarPagamento({id: id, pagador: emailDoPagador});
        return res.redirect(pagamento.body.init_point);
    }catch(err){
        return res.send(err.message);
    }
});

app.post("/not",(req, res) => {
    var id = req.query.id;

    //"1548504759"
    
    var filters = {
        "order.id": ""+id
      };

      var filtro = {
        "order.id": ""+id
    }
    
      console.log(filters);
      console.log(filtro);

      MercadoPago.payment.search({
        qs: filters
      }).then(function (data) {
        console.log(data);
      }).catch(function (error) {
        console.log(error);
      });


    /*
    var filtro = {
        "order.id": ""+id
    }

    console.log(filtro);

    MercadoPago.payment.search({
        qs: filtro
    }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
    */

    res.send("OK");
});


app.listen(80,(req, res) => {

    console.log("Servidor rodando!");

});