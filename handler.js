"use strict";

// AWS connection

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

// SNS Lambda funtion
exports.publish = (event, context, callback) => {
  // Create SNS service object
  const sns = new AWS.SNS();

  // Publish a simple message to the specified SNS topic
  const params = {
    Message: event.body.message,
    TopicArn: event.body.TopicArn,
  };
  sns.publish(params, (err, data) => {
    if (err) {
      console.log("Error", err);
      callback(err, null);
    } else {
      console.log("Success", data);
      callback(null, data);
    }
  });
};

// SNS subscribe Lambda function
exports.subscribe = (event, context, callback) => {
  const sns = new AWS.SNS();
  const params = {
    Protocol: "email",
    TopicArn: event.body.TopicArn,
    Endpoint: event.body.email,
  };
  sns.subscribe(params, (err, data) => {
    if (err) {
      console.log("Error", err);
      callback(err, null);
    } else {
      console.log("Success", data);
      callback(null, data);
    }
  });
};

// SNS unsubscribe Lambda function
exports.unsubscribe = (event, context, callback) => {
  const sns = new AWS.SNS();
  const params = {
    SubscriptionArn: event.body.subscriptionArn,
  };
  sns.unsubscribe(params, (err, data) => {
    if (err) {
      console.log("Error", err);
      callback(err, null);
    } else {
      console.log("Success", data);
      callback(null, data);
    }
  });
};

// SNS status Lambda function
exports.status = (event, context, callback) => {
  const sns = new AWS.SNS();
  const params = {
    SubscriptionArn: event.body.subscriptionArn,
  };
  sns.getSubscriptionAttributes(params, (err, data) => {
    if (err) {
      console.log("Error", err);
      callback(err, null);
    } else {
      console.log("Success", data);
      callback(null, data);
    }
  });
};
