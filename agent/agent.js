import axios from "axios";

export const SendEmail = (to_name = null, to_email = null, message = null) => {
  var data = JSON.stringify({
    personalizations: [
      {
        to: [
          {
            email: to_email,
            name: to_name,
          },
        ],
        subject: "Grocery App Notification!",
      },
    ],
    content: [
      {
        type: "text/plain",
        value: `Hii! ${to_name}, Thanks for using grocery app. ${message}`,
      },
    ],
    from: {
      email: "iamkarantalwar@gmail.com",
      name: "Grocery App",
    },
    reply_to: {
      email: "iamkarantalwar@gmail.com",
      name: "Grocery App",
    },
  });

  var config = {
    method: "post",
    url: "https://api.sendgrid.com/v3/mail/send",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer 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",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      /*alert(JSON.stringify(response.data));*/
    })
    .catch(function (error) {
      alert(error);
    });
};
