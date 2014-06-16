#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs = require('fs');
var cors = require('cors');
var http = require('http');
var app = new express();
var general = require('./api/general');
var libro = require('./api/libro');
var usuario = require('./api/usuario');

app.use(cors());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.urlencoded());


app.get('/',general.index);
app.post('/login',general.login);
app.post('/addUsuario',general.addUsuario);
app.post('/addBook',usuario.addBook);
app.post('/addComment',usuario.addComment);
app.post('/liberateBook',usuario.liberateBook);
app.post('/catchBook',usuario.catchBook);
app.get('/getCatchBooks',usuario.getCatchBooks);
app.get('/getFreeBooks',libro.getFreeBooks);
app.get('/getBooks',libro.getBooks);
app.get('/getInfoBook',libro.getInfoBook);
app.get('/getCommentsBook',libro.getCommentsBook);
app.get('/getReadsBook',libro.getReadsBook);
app.get('/getCategorias',libro.getCategorias);

ipaddress = process.env.OPENSHIFT_NODEJS_IP;
port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen(port, ipaddress);

