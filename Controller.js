const express = require('express');
const cors = require('cors');
const {Sequelize} = require('./models');
const models = require('./models');
const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;
let compra = models.Compra;
let produto = models.Produto;
let itemcompra = models.ItemCompra;

app.get('/', function(req, res) {
    res.send("Olá, Mundo!");
});
app.post('/servicos', async(req, res) => {
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "O serviço foi criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});
app.post('/clientes', async(req, res) => {
    await cliente.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Cliente cadastrado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar, tente novamente."
        })
    });
});
app.post('/pedidos', async(req, res) => {
    await pedido.create(
        req.body        
    ).then(function(){
        return res.json({
            error: false,
            message: "Pedido realizado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Sem sucesso, tente novamente."
        })
    });
});
app.post('/itenspedido', async(req, res)=>{
    await itempedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro de conexão. Tente novamente."
        })
    });
});

app.post('/compras', async(req, res)=>{
    await compra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Compra realizada com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro de conexão. Tente novamente."
        })
    });
});
app.get('/listacompras', async(req, res)=>{
    await compra.findAll({
        raw: true
    }).then(function(compras){
        res.json({compras})
    });
});
app.put('/atualizacompra', async(req, res)=>{
    await compra.update(req.body, {
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Compra alterada com sucesso!"
        });
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Erro de conexão. Tente novamente."
        });
    });
});
app.get('/excluircompra/:id', async(req, res)=>{
    await compra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Compra excluída com sucesso!"
        });
    }).catch(function(erro){
        return req.status(400).json({
            error: true,
            message: "Erro de conexão. Tente novamente."
        });
    });
}); 

app.post('/produtos', async(req, res)=>{
    await produto.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Produto cadastrado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro de conexão. Tente novamente."
        })
    });
});
app.get('/listaprodutos', async(req, res)=>{
    await produto.findAll({
        raw: true
    }).then(function(produtos){
        res.json({produtos})
    });
});
app.put('/atualizaproduto', async(req, res)=>{
    await produto.update(req.body, {
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto alterado com sucesso!"
        });
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Erro de conexão. Tente novamente."
        });
    });
});
app.get('/excluirproduto/:id', async(req, res)=>{
    await produto.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto excluído com sucesso!"
        });
    }).catch(function(erro){
        return req.status(400).json({
            error: true,
            message: "Erro de conexão. Tente novamente."
        });
    });
}); 

app.post('/itenscompra', async(req, res)=>{
    await itemcompra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false, 
            message: "Item comprado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro de conexão. Tente novamente."
        })
    });
});
app.get('/listaitenscompra', async(req, res)=>{
    await itemcompra.findAll({
        raw: true
    }).then(function(itemcompra){
        res.json({itemcompra})
    });
});
app.put('/atualizaitenscompra', async(req, res)=>{
    await itemcompra.update(req.body, {
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item compra alterado com sucesso!"
        });
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Erro de conexão. Tente novamente."
        });
    });
});
app.get('/excluiritenscompra/:id', async(req, res)=>{
    await itemcompra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item compra excluído com sucesso!"
        });
    }).catch(function(erro){
        return req.status(400).json({
            error: true,
            message: "Erro de conexão. Tente novamente."
        });
    });
}); 

app.get('/listaservicos', async(req, res)=>{
    await servico.findAll({
        order: [['nome', 'DESC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});
app.get('/ofertaservicos', async(req,res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});
app.get('/servico/:id', async(req, res)=>{
    await servico.findByPk(req.params.id)
    .then(serv =>{
        return res.json({
            error: false,
            serv
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possível conectar!"
        });
    });
});
app.get('/todosclientes', async(req, res)=>{
    await cliente.findAll({
        raw: true
    }).then(function(clientes){
        res.json({clientes})
    });
});
app.get('/todositenspedidos', async(req, res)=>{
    await itempedido.findAll({
        raw: true
    }).then(function(itenspedido){
        res.json({itenspedido})
    });
});
app.put('/atualizaservico', async(req,res)=>{
    await servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            erro: false,
            message: "Serviço foi alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível obter conexão."
        });
    });
});
app.put('/atualizacliente', async(req, res)=>{
    await compra.update(ree.body, {
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            erro: false,
            message: "Cliente alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            erro: true,
            message: "Foi impossível obter conexão."
        });
    });
});
app.put('/atualizapedido', async(req, res)=>{
    await pedido.update(ree.body, {
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            erro: false,
            message: "Pedido alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            erro: true,
            message: "Foi impossível obter conexão."
        });
    });
});
app.put('/atualizaitenspedido', async(req, res)=>{
    await itempedido.update(ree.body, {
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            erro: false,
            message: "Cliente alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            erro: true,
            message: "Foi impossível obter conexão."
        });
    });
});

app.get('/pedidos/:id', async(req,res)=>{
    await pedido.findByPk(req.params.id, {include: [{all: true}]})
    .then(ped=>{
        return res.json({ped});
    });
});

app.put('/pedidos/:id/editaritem', async(req,res)=>{
    const item ={
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };
    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error : true, 
            message: 'Pedido não foi encontrado.'
        });
    };
    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        });
    };
    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId},
            {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            erro: false,
            message: "Pedido foi alterado com sucesso!",
            itens
        });
    }).catch(function(erro){
        return req.status(400).json({
            error: true,
            message: "Pedido não foi poissível alterar."
        });
    });
});

app.get('/excluircliente/:id', async(req,res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente excluído com sucesso!"
        });
    }).catch(function(erro){
        return req.status(400).json({
            error: true,
            message: "Erro ao excluir o cliente."
        });
    });
});
app.get('/excluirservico/:id', async(req,res)=>{
    await servico.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Servico excluído com sucesso!"
        });
    }).catch(function(erro){
        return req.status(400).json({
            error: true,
            message: "Erro ao se conectar."
        });
    });
});
app.get('/excluirpedido/:id', async(req,res)=>{
    await pedido.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido excluído com sucesso!"
        });
    }).catch(function(erro){
        return req.status(400).json({
            error: true,
            message: "Erro ao se conectar."
        });
    });
});
app.get('/excluiritenspedido/:id', async(req,res)=>{
    await itempedido.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item pedido excluído com sucesso!"
        });
    }).catch(function(erro){
        return req.status(400).json({
            error: true,
            message: "Erro ao se conectar."
        });
    });
});

let port = process.env.port || 3001;

app.listen(port, (req, res) => {
    console.log(`Servidor Ativo: http://localhost:3001`);
});