var request = require('request');
var rp = require('request-promise');
var winston = require('winston');
var fs = require('fs');
var uuid = require('node-uuid');
var {
    URL
} = require('url');
let file = '/home/jcoelho/\Área\ de\ Trabalho/recurrence_tokens.json';
const fileUrl = new URL(`file://${file}`);
// console.log('FilePath: ', file);
var token;
var config = {
    username: 'FC22110D-FEE6-4879-BE83-6F3691D8A16F',
    urlViewBoleto: 'https://pagamentoigmail.ig.com.br/Api/Boleto/{paymentToken}/PDF',
    urlGetToken: 'https://pagamentoigmail.ig.com.br/Token',
    code_auth: 'Basic aG9tb2xvZ2FjYW8gbmV4eGVyYSBpZyBib2xldG8sIGNyZWRpdG8gZSBkZWJpdG8=',
    urlGetRecurrence: 'https://pagamentoigmail.ig.com.br/Api/Recurrence/{recurrenceToken}',
    ip: '127.0.0.1',
    urlCreateBoleto: 'https://pagamentoigmail.ig.com.br/Api/Boleto',
    urlCreateOrder: 'https://pagamentoigmail.ig.com.br/Api/Order',
    urlCancelRecurrence: 'https://pagamentoigmail.ig.com.br/Api/Recurrence/{recurrenceToken}/Deactivate',
    urlActiveRecurrence: 'https://pagamentoigmail.ig.com.br/Api/Recurrence/{recurrenceToken}/Reactivate',
    password: 'DD4E53AD-1297-417F-B182-F6ADEE5B2235',
    urlPayment: 'https://pagamentoigmail.ig.com.br/Api/Card/{paymentToken}',
    javascript: 'easypay.recorrencia-dev.min.js',
    urlChangePlan: 'https://pagamentoigmail.ig.com.br/Api/Recurrence/{recurrenceToken}/Plan/{merchantPlanId}',
    urlPaymentBoleto: 'https://pagamentoigmail.ig.com.br/Api/Boleto/{paymentToken}',
    urlCheckoutCard: 'https://pagamentoigmail.ig.com.br/Checkout/ChangeCard/{recurrenceToken}/{type}/{headerDisplayName}',
    grantType: 'password',
    header: {
        'User-Agent': 'Mozilla/4.0',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    token: ''
}
//var obj = require(file);

const mongodb = require('mongodb');

main();

async function main() {
    const db = await mongodb.MongoClient.connect('mongodb://10.0.12.5:27017/igwebmailpremium');
    let filter = {gateway:"easypay","resource.status.description":"Autorizado"};
    
    const cursor = db.collection('notification_payment').find(filter).limit(10);
    
    let doc;
    while (doc = await cursor.next()) {
        let date = new Date(doc.date.split(" ")[0].split("/").reverse().join("-");

        console.log("\n\n date: ", date );
        console.log('\n\nnotification_payment: ', doc );
    }
}


/*
let linha;

fs.readFile(fileUrl, (err, content) => {

	if(err){
		console.log("ERROR: ", err);
	}

	content.forEach(async (valor, indice)=>{

		try {
			linha = JSON.parse(content);
		} catch(e){
			throw e;
		}
		
		console.log(`linha[${indice}]:`, linha[indice]);



		console.log('authorization: ', authorization);
		

		let authorization = await getAuthorization();


	});

});

*/
// var contents = fs.readFileSync(file);
// try {
//     obj = JSON.parse(contents);
// } catch (e) {
//     throw e;
// }
/*
obj.forEach(async function(value, index) {
	let recurrence = await disableRecurrence(value.recurrence_token);
	console.log(`recurrence_token[${index}][${value.recurrence_token}]: `, recurrence);
});
*/
async function disableRecurrence(recurrenceToken) {
    var self = this;
    var uri_gateway = config.urlCancelRecurrence.replace('{recurrenceToken}', recurrenceToken);
    var header = config.header;
    return new Promise((resolve, reject) => {
        if (!recurrenceToken) {
            reject('recurrenceToken vazio ou nulo');
        }
        return getAuthorization().then(autorization => {
            header.Authorization = 'bearer ' + autorization;
            header.RequestId = uuid.v4();
            return req(uri_gateway, header, 'PUT', null).then(recurrence => {
                winston.debug('[getRecurrence] success -  url[%s]', uri_gateway);
                return recurrence;
            });
        }).then(recurrence => {
            winston.debug('[getRecurrence]Recurrence: ', JSON.stringify(recurrence));
            resolve(recurrence);
        }).catch(error => {
            reject(error);
        });
    });
}
async function getAuthorization() {
    var self = this;
    var uri_gateway = config.urlGetToken;
    var data = 'Username=' + config.username + '&Password=' + config.password + '&grant_type=' + config.grantType;
    let horaAtual = new Date();
    if (config.token) {
        return Promise.resolve(config.token.access_token);
    }
    try {
        let result = await req(uri_gateway, config.header, 'POST', data);
        config.token = result;
        console.log('[getAuthorization] result: ', result);
        return Promise.resolve(result);
    } catch (err) {
        console.log('Error[getAuthorization]: ', err);
        return Promise.reject(err);
    }
};



async function req(url, header, method, data = null) {
    let self = this;
    method = method || 'GET';
    await rp({
        uri: url,
        method: method,
        headers: header,
        body: data || null
    }).then( (result) => {
        let statusCode = res && res.statusCode ? res.statusCode : null;
   
        if (method == 'PUT' && statusCode == 200) {
            body = {
                ok: 'OK'
            };
            return Promise.resolve(body);
        }
        try {
            let result = JSON.parse(body);
            console.log('\n\nresult[req]: ', result);
            winston.debug('\n\n[REQ](NEXXERA) - sucesso ao obter  responta [code=%s] - url[%s]', statusCode, url, method, data);
            return Promise.resolve(result);
        } catch (error) {
            winston.error('\n\n[REQ]erro na requisição: method[%s] - url[%s] - statusCode[%s] - error[%s] - data:', method, url, statusCode, err, data);
            return Promise.reject(error);
        }
    }).catch( err =>{
    	return err;
    });
}