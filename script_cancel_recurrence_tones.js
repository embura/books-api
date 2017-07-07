const request = require('request');
const rp = require('request-promise');
const winston = require('winston');
const fs = require('fs');
const uuid = require('node-uuid');
const { URL } = require('url');
const mongodb = require('mongodb');

const file = '/home/jcoelho/\Área\ de\ Trabalho/recurrence_tokens.json';
const fileUrl = new URL(`file://${file}`);
// winston.info('FilePath: ', file);
let token;
const config = {
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
    Accept: 'application/json',
  },
  token: '',
};

winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'canceledRecurence.log' }),

  ],
});


// semPagamento();

// canceledRecurence()

comPagamento();

async function semPagamento() {
  const dbEmailPremium = await mongodb.MongoClient.connect('mongodb://10.0.12.5:27017/igwebmailpremium');
  const dbLocal = await mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/igwebmailpremium');

  const filterSubscription = {
    payment_authorized: true,
    firstPurchase: { $exists: false },
    code_subscription_vulcano: { $exists: false },
    date_activation: { $exists: false },
    gateway: 'easypay',
    status: { $ne: 'CANCELED' },
    code_plan: { $ne: '99' },
  };

  let count = 0;
  const cursorSubscription = dbEmailPremium.collection('subscription').find(filterSubscription);

    // recurrence_cancelled

  let subscription;
  while (subscription = await cursorSubscription.next()) {
    count++;

    const filterNotificationPayment = {
      gateway: 'easypay',
      'resource.status.description': 'Autorizado',
      'resource.subscription_code': subscription.code_subscription,
    };

    const resultNotificationPayment = await dbEmailPremium.collection('notification_payment').findOne(filterNotificationPayment);

    if (resultNotificationPayment) continue;

        // let recurrenceCancelled = dbLocal.collection('recurrence_cancelled').insert();

    const optionGetSubscriptionEasypay = {
      uri: `https://www.easyforpay.com.br/ig/v1/recorrencia/assinaturas/${subscription.code_subscription}`,
      method: 'GET',
      headers: {
        Authorization: 'Custom UGVGNTcvMmZ2VDhKc2J1aFN4THRPUT09OmZMYWdvbi9xb1IxaHByUmljcWt5dUE9PQ==',
        'Content-Type': 'application/json',
      },
      json: true,
    };

    const subscriptionEasypay = await rp(optionGetSubscriptionEasypay);
    winston.info('\n subscriptionEasypay: ', subscriptionEasypay);

    if (subscriptionEasypay.payment_status.code !== 1) continue;

    subscriptionEasypay.creation_date.month = subscriptionEasypay.creation_date.month < 10 ? `0${subscriptionEasypay.creation_date.month}` : subscriptionEasypay.creation_date.month;
    subscriptionEasypay.creation_date.day = subscriptionEasypay.creation_date.day < 10 ? `0${subscriptionEasypay.creation_date.day}` : subscriptionEasypay.creation_date.day;

    let datePayment = `${subscriptionEasypay.creation_date.year}-${subscriptionEasypay.creation_date.month}-${subscriptionEasypay.creation_date.day}`;
    datePayment += ` ${subscriptionEasypay.creation_date.hour}:${subscriptionEasypay.creation_date.minute}:${subscriptionEasypay.creation_date.second}`;

    const dataSendPost = {
      event: 'payment.status_updated',
      date: datePayment,
      env: 'homolog.easypay',
      resource: {
        id: 111111,
        amount: subscriptionEasypay.amount,
        subscription_code: subscriptionEasypay.code,
        payment_url: {
          url: '',
          type: {
            code: 1,
            description: 'Autenticacao',
          },
        },
        status: {
          code: subscriptionEasypay.payment_status.code,
          description: subscriptionEasypay.payment_status.description,
        },
      },
      gateway: 'easypay',
    };

    const optionPostAssinaturaEmailPremium = {
      uri: 'http://localhost:4000/notification/easypay',
      method: 'POST',
      headers: {
        Authorization: 'UGVGNTcvMmZ2VDhKc2J1aFN4THRPUT09OmZMYWdvbi9xb1IxaHByUmljcWt5dUE9PQ==',
        'Content-Type': 'application/json',
      },
      body: dataSendPost,
      json: true,
    };

    winston.info('\n optionPostAssinaturaEmailPremium: ', optionPostAssinaturaEmailPremium);

    const sendNotification = await rp(optionPostAssinaturaEmailPremium);
    winston.info('sendNotification: ', subscription.code_subscription, JSON.stringify(sendNotification));
  }

  dbEmailPremium.close();
}

async function comPagamento() {
  const db = await mongodb.MongoClient.connect('mongodb://10.0.12.5:27017/igwebmailpremium');

  const filterSubscription = {
    payment_authorized: true,
    firstPurchase: { $exists: false },
    code_subscription_vulcano: { $exists: false },
    date_activation: { $exists: false },
    gateway: 'easypay',
    status: { $ne: 'CANCELED' },
    code_plan: { $ne: '99' },
  };

  let count = 0;
  const cursorSubscription = db.collection('subscription').find(filterSubscription);
  let subscription;

  while (subscription = await cursorSubscription.next()) {
    count++;

    const filterNotificationPayment = {
      gateway: 'easypay',
      'resource.status.description': 'Autorizado',
      'resource.subscription_code': subscription.code_subscription,
    };
    const resultNotificationPayment = await db.collection('notification_payment').findOne(filterNotificationPayment);

    if (!resultNotificationPayment) continue;


    const optionGetSubscriptionEasypay = {
      uri: `https://www.easyforpay.com.br/ig/v1/recorrencia/assinaturas/${subscription.code_subscription}`,
      method: 'GET',
      headers: {
        Authorization: 'Custom UGVGNTcvMmZ2VDhKc2J1aFN4THRPUT09OmZMYWdvbi9xb1IxaHByUmljcWt5dUE9PQ==',
        'Content-Type': 'application/json',
      },
      json: true,
    };

    const subscriptionEasypay = await rp(optionGetSubscriptionEasypay);

    winston.info('\n subscriptionEasypay: ', subscriptionEasypay);

    if (subscriptionEasypay.payment_status.code !== 1) continue;

    subscriptionEasypay.creation_date.month = subscriptionEasypay.creation_date.month < 10 ? `0${subscriptionEasypay.creation_date.month}` : subscriptionEasypay.creation_date.month;
    subscriptionEasypay.creation_date.day = subscriptionEasypay.creation_date.day < 10 ? `0${subscriptionEasypay.creation_date.day}` : subscriptionEasypay.creation_date.day;


    winston.info('\n {subscriptionEasypay.creation_date: ', subscriptionEasypay.creation_date);

    let datePayment = `${subscriptionEasypay.creation_date.year}-${subscriptionEasypay.creation_date.month}-${subscriptionEasypay.creation_date.day}`;
    datePayment += ` ${subscriptionEasypay.creation_date.hour}:${subscriptionEasypay.creation_date.minute}:${subscriptionEasypay.creation_date.second}`;

    delete resultNotificationPayment._id;

    const dataSendPost = resultNotificationPayment;

    if (!dataSendPost.resource.id) {
      winston.info('Mensagem não enviada', dataSendPost);
      continue;
    }

    const optionPostAssinaturaEmailPremium = {
      uri: 'http://localhost:4000/notification/easypay',
      method: 'POST',
      headers: {
        Authorization: 'UGVGNTcvMmZ2VDhKc2J1aFN4THRPUT09OmZMYWdvbi9xb1IxaHByUmljcWt5dUE9PQ==',
        'Content-Type': 'application/json',
      },
      body: dataSendPost,
      json: true,
    };


    winston.info('\n optionPostAssinaturaEmailPremium: ', optionPostAssinaturaEmailPremium);


    const sendNotification = await rp(optionPostAssinaturaEmailPremium);
    winston.info('sendNotification: ', subscription.code_subscription, JSON.stringify(sendNotification));
        // winston.info1('sendNotification: ', subscription.code_subscription ,JSON.stringify(sendNotification));
  }

  db.close();
}

async function canceledRecurence() {
  const dbEmailPremium = await mongodb.MongoClient.connect('mongodb://10.0.12.5:27017/igwebmailpremium');
  const dbLocal = await mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/igwebmailpremium');

  let count = await dbLocal.collection('recurrence_cancelled').count();
  const cursorSubscription = dbEmailPremium.collection('subscription').find({ gateway: 'nexxera' });

  let subscription;

  try {
    while (subscription = await cursorSubscription.next()) {
      count++;
      delete subscription._id;

      winston.info(`\ncount: ${count}`);

      const cursorCancelledSubscriptionFind = dbLocal.collection('recurrence_cancelled').find({ code_subscription: subscription.code_subscription }).skip(count);
      const cursorCancelledSubscriptionNext = await cursorCancelledSubscriptionFind.next();

      if (cursorCancelledSubscriptionNext) continue;

      subscription.canceled = {
        canceled: true,
        date: new Date(),
      };

      const cursorCancelledSubscriptionInsert = await dbLocal.collection('recurrence_cancelled').insert(subscription);

      if (!subscription.recurrence_token) continue;

      const recurrenceCancelled = await disableRecurrence(subscription.recurrence_token);

      if (recurrenceCancelled.ok == 'OK') {
        winston.info(`subscription:[${subscription.code_subscription}] - disableRecurrence[${JSON.stringify(recurrenceCancelled)}]`);
      } else {
        return Promise.reject(recurrenceCancelled);
      }
    }
  } catch (err) {
    winston.info('Error: ', err);
    canceledRecurence();
  }
}

async function transfer() {
  const dbLocal = await mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/igwebmailpremium');
  const cursorCancelledSubscription = await dbLocal.collection('cancelled_subscription').find();
  let cancelledSubscription;

  while (cancelledSubscription = await cursorCancelledSubscription.next()) {
    delete cancelledSubscription.id;
    const cursorCancelledSubscription = await dbLocal.collection('recurrence_cancelled').insert(cancelledSubscription);
    winston.info('cursorCancelledSubscription: ', cursorCancelledSubscription.result.ok);
  }
}

async function disableRecurrence(recurrenceToken) {
  const self = this;
  const uri_gateway = config.urlCancelRecurrence.replace('{recurrenceToken}', recurrenceToken);
  const header = config.header;

  const autorization = await getAuthorization();
  header.Authorization = `bearer ${autorization}`;
  header.RequestId = uuid.v4();

  return await req(uri_gateway, header, 'PUT', null).then(cancelRecurrence => cancelRecurrence);
}

async function getAuthorization() {
  const uri_gateway = config.urlGetToken;
  const data = `Username=${config.username}&Password=${config.password}&grant_type=${config.grantType}`;

  if (config.token) {
    return Promise.resolve(config.token.access_token);
  }

  return await req(uri_gateway, config.header, 'POST', data).then((authorization) => {
    config.token = authorization;
    return authorization.access_token;
  });
}

async function req(url, header, method, data = null) {
  method = method || 'GET';
  return await rp({ uri: url, method, headers: header, body: data }).then((response, body, err) => {
    if (method == 'PUT') {
      return { ok: 'OK' };
    }

    try {
      responseJson = JSON.parse(response);
    } catch (e) {
      throw e;
    }

    return responseJson;
  });
}
