const testHtmlBody = (name) => {
  const testHtml = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
<head>
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Actionable emails e.g. reset password</title>


<style type="text/css">
img {
max-width: 100%;
}
body {
-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;
}
body {
background-color: #f6f6f6;
}
@media only screen and (max-width: 640px) {
  body {
    padding: 0 !important;
  }
  h1 {
    font-weight: 800 !important; margin: 20px 0 5px !important;
  }
  h2 {
    font-weight: 800 !important; margin: 20px 0 5px !important;
  }
  h3 {
    font-weight: 800 !important; margin: 20px 0 5px !important;
  }
  h4 {
    font-weight: 800 !important; margin: 20px 0 5px !important;
  }
  h1 {
    font-size: 22px !important;
  }
  h2 {
    font-size: 18px !important;
  }
  h3 {
    font-size: 16px !important;
  }
  .container {
    padding: 0 !important; width: 100% !important;
  }
  .content {
    padding: 0 !important;
  }
  .content-wrap {
    padding: 10px !important;
  }
}
</style>
</head>

<body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
  <table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
  <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
      <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
      <td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
          <div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
              <table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff">
                  <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                      <td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                          <meta itemprop="name" content="Confirm Email" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />
                          <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                              <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                  <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                      This is a test email. Please ${name} dont report spam :).
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
            </table>
          </div>
      </td>
  </tr>
  </table>
</body>
</html>
`;

  return testHtml;
};

class ToPlainObjectTestClass {
  constructor () {
    this.name = 'some name';
    this._email = 'some@email.com';
  }
  get email () {
    return this._email;
  }
  save () {
  }
}

const validBooking = {
  guestEthAddress: '0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e',
  paymentAmount: 0.1,
  paymentType: 'eth',
  roomType: 'pure-cozy',
  personalInfo: {
    fullName: 'Some name',
    email: 'email@email.com',
    birthDate: '1987-12-17',
    phone: '+1111111111111',
  },
  from: 1,
  to: 4,
  guestCount: 1,
};
const validBookingWithEthPrice = {
  guestEthAddress: '0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e',
  paymentAmount: 0.1,
  paymentType: 'eth',
  paymentTx: '0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e234553',
  roomType: 'pure-cozy',
  personalInfo: {
    fullName: 'Some name',
    email: 'email@email.com',
    birthDate: '1987-12-17',
    phone: '+1111111111111',
  },
  from: 1,
  to: 4,
  ethPrice: 1,
  guestCount: 1,
};
const validBookingDB = {
  bookingHash: 'some public key',
  guestEthAddress: '0xe91036d59eAd8b654eE2F5b354245f6D7eD2487e',
  paymentAmount: 0.1,
  paymentType: 'eth',
  roomType: 'pure-cozy',
  encryptedPersonalInfo: '0x7b226e616d65223a22536f6d65206e616d65222c22656d61696c223a22656d61696c40656d61696c2e636f6d222c226269727468646179223a2231372f31322f31393837222c2270686f6e65223a222b3131313131313131313131227d',
  from: 1,
  to: 4,
  guestCount: 1,
};

const events = {
  BookingChanged: {
    transactionHash: '0x13c30cb0f5bc3d96c70bdced5f55cbe90286a20481d84fe998edd330ffe9893d',
    blockNumber: '123',
    returnValues: {
      roomType: 'pure-cozy',
      nights: [1, 2, 3, 4],
      room: '1',
      newGuest: '0x8A14027640DCE9C1DA9395b6D9D0c68c3EA3dF57',
      bookingHash: 'someHash',
    },
  },
  BookingDone: {
    transactionHash: '0x13c30cb0f5bc3d96c70bdced5f55cbe90286a20481d84fe998edd330ffe9893d',
    blockNumber: '123',
    returnValues: {
      roomType: 'pure-cozy',
      nights: [1, 2, 3, 4],
      room: '1',
      newGuest: '0x8A14027640DCE9C1DA9395b6D9D0c68c3EA3dF57',
      guest: 'someHash',
    },
  },
};

const toEmail = process.env.TO_EMAIL || 'example@windingtree.com';

module.exports = {
  testHtmlBody,
  validBooking,
  validBookingDB,
  validBookingWithEthPrice,
  ToPlainObjectTestClass,
  events,
  toEmail,
};
