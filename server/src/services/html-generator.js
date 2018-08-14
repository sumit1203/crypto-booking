const { web3 } = require('./web3');
const { BOOKING_STATUS } = require('../constants');
const confirmationBody = (event, secretCode) => {
  const confirmationHtml = `
  <!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <title></title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <style type="text/css">#outlook a { padding:0; }
        .ReadMsgBody { width:100%; }
        .ExternalClass { width:100%; }
        .ExternalClass * { line-height:100%; }
        body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
        table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
        img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
        p { display:block;margin:13px 0; }
      </style>
      <!--[if !mso]><!-->
      <style type="text/css">@media only screen and (max-width:480px) {
        @-ms-viewport { width:320px; }
        @viewport { width:320px; }
        }
      </style>
      <!--<![endif]--><!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]--><!--[if lte mso 11]>
      <style type="text/css">
        .outlook-group-fix { width:100% !important; }
      </style>
      <![endif]-->
      <style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
        }
      </style>
      <style type="text/css">@media only screen and (max-width:480px) {
        table.full-width-mobile { width: 100% !important; }
        td.full-width-mobile { width: auto !important; }
        }
      </style>
    </head>
    <body style="background-color:#fff;">
      <div style="background-color:#fff;">
        <!-- Company Header --><!--[if mso | IE]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
              <div style="Margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="" style="vertical-align:top;width:600px;" >
                              <![endif]-->
                              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                        <tbody>
                                          <tr>
                                            <td style="width:135px;"><img height="auto" src="https://booking.windingtree.com/img/logo--gradient_black-text.png" alt="Winding Tree logo" title="Winding Tree logo" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="135"></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <![endif]-->
        <p style="border-top:solid 4px #5F2987;font-size:1;margin:0px auto;width:100%;"></p>
        <!--[if mso | IE]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #5F2987;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" >
          <tr>
            <td style="height:0;line-height:0;"> &nbsp;</td>
          </tr>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
              <div style="Margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:30px;padding-top:35px;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="" style="vertical-align:top;width:600px;" >
                              <![endif]-->
                              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:19px;font-weight:bold;line-height:18px;text-align:left;color:#000000;">Your booking is ready!</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">Hey you, owner of ${event.returnValues.guest}, have a ${event.returnValues.roomType} for ${event.returnValues.nights} nights. The room is ${event.returnValues.room}.</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;font-weight:bold;line-height:18px;text-align:left;color:#000000;">SECRET CODE IS:</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">${secretCode}.</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">Keep it safe!</div>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
              <div style="background:#5F2987;background-color:#5F2987;Margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#5F2987;background-color:#5F2987;width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="" style="vertical-align:top;width:600px;" >
                              <![endif]-->
                              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:9px;line-height:18px;text-align:left;color:#ffffff;">Powered by Winding Tree</div>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <![endif]-->
      </div>
    </body>
  </html>


`;

  return confirmationHtml;
};

const instructionsBody = (paymentType, txs, bookingHash, bookingIndex) => {
  const instructionsHtml = `
  <!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <title></title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <style type="text/css">#outlook a { padding:0; }
        .ReadMsgBody { width:100%; }
        .ExternalClass { width:100%; }
        .ExternalClass * { line-height:100%; }
        body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
        table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
        img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
        p { display:block;margin:13px 0; }
      </style>
      <!--[if !mso]><!-->
      <style type="text/css">@media only screen and (max-width:480px) {
        @-ms-viewport { width:320px; }
        @viewport { width:320px; }
        }
      </style>
      <!--<![endif]--><!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]--><!--[if lte mso 11]>
      <style type="text/css">
        .outlook-group-fix { width:100% !important; }
      </style>
      <![endif]-->
      <style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
        }
      </style>
      <style type="text/css">@media only screen and (max-width:480px) {
        table.full-width-mobile { width: 100% !important; }
        td.full-width-mobile { width: auto !important; }
        }
      </style>
    </head>
    <body style="background-color:#fff;">
      <div style="background-color:#fff;">
        <!-- Company Header --><!--[if mso | IE]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
              <div style="Margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="" style="vertical-align:top;width:600px;" >
                              <![endif]-->
                              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                        <tbody>
                                          <tr>
                                            <td style="width:135px;"><img height="auto" src="https://booking.windingtree.com/img/logo--gradient_black-text.png" alt="Winding Tree logo" title="Winding Tree logo" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="135"></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <![endif]-->
        <p style="border-top:solid 4px #5F2987;font-size:1;margin:0px auto;width:100%;"></p>
        <!--[if mso | IE]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #5F2987;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" >
          <tr>
            <td style="height:0;line-height:0;"> &nbsp;</td>
          </tr>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
              <div style="Margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:35px;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="" style="vertical-align:top;width:600px;" >
                              <![endif]-->
                              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:19px;font-weight:bold;line-height:18px;text-align:left;color:#000000;">Your booking information</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">Please take note of the information below.</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;font-weight:bold;line-height:18px;text-align:left;color:#000000;">Booking Hash:</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">${bookingHash}</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;font-weight:bold;line-height:18px;text-align:left;color:#000000;">Booking Index:</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">${bookingIndex}</div>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
              <div style="Margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="" style="vertical-align:top;width:600px;" >
                              <![endif]-->
                              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tr>
                                    <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <p style="border-top:solid 1px #ddd;font-size:1;margin:0px auto;width:100%;"></p>
                                      <!--[if mso | IE]>
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #ddd;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" >
                                        <tr>
                                          <td style="height:0;line-height:0;"> &nbsp;</td>
                                        </tr>
                                      </table>
                                      <![endif]-->
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;padding-top:30px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:19px;font-weight:bold;line-height:18px;text-align:left;color:#000000;">Payment instructions</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">To pay for your room, please send this transaction${txs[0].length > 0 && 's in order'} during the following 30 minutes.</div>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        ${_helperGetTxHTML(txs, paymentType)}
        <![endif]-->
      </div>
    </body>
  </html>

`;

  return instructionsHtml;
};

const bookingChangeBody = (event, secretCode) => {
  const bookingChangeHtml = `
  <!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <title></title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <style type="text/css">#outlook a { padding:0; }
        .ReadMsgBody { width:100%; }
        .ExternalClass { width:100%; }
        .ExternalClass * { line-height:100%; }
        body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
        table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
        img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
        p { display:block;margin:13px 0; }
      </style>
      <!--[if !mso]><!-->
      <style type="text/css">@media only screen and (max-width:480px) {
        @-ms-viewport { width:320px; }
        @viewport { width:320px; }
        }
      </style>
      <!--<![endif]--><!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]--><!--[if lte mso 11]>
      <style type="text/css">
        .outlook-group-fix { width:100% !important; }
      </style>
      <![endif]-->
      <style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
        }
      </style>
      <style type="text/css">@media only screen and (max-width:480px) {
        table.full-width-mobile { width: 100% !important; }
        td.full-width-mobile { width: auto !important; }
        }
      </style>
    </head>
    <body style="background-color:#fff;">
      <div style="background-color:#fff;">
        <!-- Company Header --><!--[if mso | IE]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
              <div style="Margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="" style="vertical-align:top;width:600px;" >
                              <![endif]-->
                              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                        <tbody>
                                          <tr>
                                            <td style="width:135px;"><img height="auto" src="https://booking.windingtree.com/img/logo--gradient_black-text.png" alt="Winding Tree logo" title="Winding Tree logo" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="135"></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <![endif]-->
        <p style="border-top:solid 4px #5F2987;font-size:1;margin:0px auto;width:100%;"></p>
        <!--[if mso | IE]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #5F2987;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" >
          <tr>
            <td style="height:0;line-height:0;"> &nbsp;</td>
          </tr>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
              <div style="Margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:30px;padding-top:35px;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="" style="vertical-align:top;width:600px;" >
                              <![endif]-->
                              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:19px;font-weight:bold;line-height:18px;text-align:left;color:#000000;">Booking updated</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">Your booking has changed to ${event.returnValues.newGuest}.</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;font-weight:bold;line-height:18px;text-align:left;color:#000000;">This is your new code:</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">${secretCode}</div>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
              <div style="background:#5F2987;background-color:#5F2987;Margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#5F2987;background-color:#5F2987;width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="" style="vertical-align:top;width:600px;" >
                              <![endif]-->
                              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:9px;line-height:18px;text-align:left;color:#ffffff;">Powered by Winding Tree</div>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <![endif]-->
      </div>
    </body>
  </html>
`;

  return bookingChangeHtml;
};

function bookingCanceledBody (secretCode) {
  const bookingChangeHtml = `
  <!DOCTYPE html>
  <!-- saved from url=(0056)file:///Users/beogip/Github/crypto-booking-app/test.html -->
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
     <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        <!--[if !mso]><!-- -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <style type="text/css">#outlook a { padding:0; }
           .ReadMsgBody { width:100%; }
           .ExternalClass { width:100%; }
           .ExternalClass * { line-height:100%; }
           body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
           table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
           img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
           p { display:block;margin:13px 0; }
        </style>
        <!--[if !mso]><!-->
        <style type="text/css">@media only screen and (max-width:480px) {
           @-ms-viewport { width:320px; }
           @viewport { width:320px; }
           }
        </style>
        <!--<![endif]--><!--[if mso]>
        <xml>
           <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
        </xml>
        <![endif]--><!--[if lte mso 11]>
        <style type="text/css">
           .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
        <style type="text/css">@media only screen and (min-width:480px) {
           .mj-column-per-100 { width:100% !important; max-width: 100%; }
           }
        </style>
        <style type="text/css">@media only screen and (max-width:480px) {
           table.full-width-mobile { width: 100% !important; }
           td.full-width-mobile { width: auto !important; }
           }
        </style>
     </head>
     <body style="background-color:#fff;">
        <div style="background-color:#fff;">
           <!-- Company Header --><!--[if mso | IE]>
           <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
              <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                    <![endif]-->
                    <div style="Margin:0px auto;max-width:600px;">
                       <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                          <tbody>
                             <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                   <!--[if mso | IE]>
                                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                      <tr>
                                         <td class="" style="vertical-align:top;width:600px;" >
                                            <![endif]-->
                                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                  <tbody>
                                                     <tr>
                                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                           <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                              <tbody>
                                                                 <tr>
                                                                    <td style="width:135px;"><img height="auto" src="https://booking.windingtree.com/img/logo--gradient_black-text.png" alt="Winding Tree logo" title="Winding Tree logo" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="135"></td>
                                                                 </tr>
                                                              </tbody>
                                                           </table>
                                                        </td>
                                                     </tr>
                                                  </tbody>
                                               </table>
                                            </div>
                                            <!--[if mso | IE]>
                                         </td>
                                      </tr>
                                   </table>
                                   <![endif]-->
                                </td>
                             </tr>
                          </tbody>
                       </table>
                    </div>
                    <!--[if mso | IE]>
                 </td>
              </tr>
           </table>
           <![endif]-->
           <p style="border-top:solid 4px #5F2987;font-size:1;margin:0px auto;width:100%;"></p>
           <!--[if mso | IE]>
           <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #5F2987;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" >
              <tr>
                 <td style="height:0;line-height:0;"> &nbsp;
                 </td>
              </tr>
           </table>
           <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
              <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                    <![endif]-->
                    <div style="Margin:0px auto;max-width:600px;">
                       <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                          <tbody>
                             <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:30px;padding-top:35px;text-align:center;vertical-align:top;">
                                   <!--[if mso | IE]>
                                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                      <tr>
                                         <td class="" style="vertical-align:top;width:600px;" >
                                            <![endif]-->
                                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                  <tbody>
                                                     <tr>
                                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                           <div style="font-family:Raleway, Helvetica, Arial;font-size:19px;font-weight:bold;line-height:18px;text-align:left;color:#000000;">Booking canceled</div>
                                                        </td>
                                                     </tr>
                                                     <tr>
                                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                           <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">Your booking with code ${secretCode} has been canceled.</div>
                                                        </td>
                                                     </tr>
                                                  </tbody>
                                               </table>
                                            </div>
                                            <!--[if mso | IE]>
                                         </td>
                                      </tr>
                                   </table>
                                   <![endif]-->
                                </td>
                             </tr>
                          </tbody>
                       </table>
                    </div>
                    <!--[if mso | IE]>
                 </td>
              </tr>
           </table>
           <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
              <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                    <![endif]-->
                    <div style="background:#5F2987;background-color:#5F2987;Margin:0px auto;max-width:600px;">
                       <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#5F2987;background-color:#5F2987;width:100%;">
                          <tbody>
                             <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                   <!--[if mso | IE]>
                                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                      <tr>
                                         <td class="" style="vertical-align:top;width:600px;" >
                                            <![endif]-->
                                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                  <tbody>
                                                     <tr>
                                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                           <div style="font-family:Raleway, Helvetica, Arial;font-size:9px;line-height:18px;text-align:left;color:#ffffff;">Powered by Winding Tree</div>
                                                        </td>
                                                     </tr>
                                                  </tbody>
                                               </table>
                                            </div>
                                            <!--[if mso | IE]>
                                         </td>
                                      </tr>
                                   </table>
                                   <![endif]-->
                                </td>
                             </tr>
                          </tbody>
                       </table>
                    </div>
                    <!--[if mso | IE]>
                 </td>
              </tr>
           </table>
           <![endif]-->
        </div>
     </body>
  </html>
`;

  return bookingChangeHtml;
};

const informationBody = ({ roomType, from, to, personalInfo, status, remaindingMinues }) => {
  let bookingDetails;
  switch (status) {
  case BOOKING_STATUS.canceled:
    bookingDetails = 'you booking has been canceled and you have received a 50% refund.';
    break;
  case BOOKING_STATUS.approved:
    bookingDetails = `we just receive the payment of your booking and it has been approved, you room is a <b>${roomType}</b> from <b>${from}</b> to <b>${to}</b>`;
    break;
  case BOOKING_STATUS.pending:
    bookingDetails = `we are still wating the payment of your booking for a room <b>${roomType}</b> from <b>${from}</b> to <b>${to}</b>, you have ${remaindingMinues} minutes to execute your payment, if you ran out of time simply request a new offer`;
    break;
  }

  const confirmationHtml = `
  <!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <title></title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <style type="text/css">#outlook a { padding:0; }
        .ReadMsgBody { width:100%; }
        .ExternalClass { width:100%; }
        .ExternalClass * { line-height:100%; }
        body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
        table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
        img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
        p { display:block;margin:13px 0; }
      </style>
      <!--[if !mso]><!-->
      <style type="text/css">@media only screen and (max-width:480px) {
        @-ms-viewport { width:320px; }
        @viewport { width:320px; }
        }
      </style>
      <!--<![endif]--><!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]--><!--[if lte mso 11]>
      <style type="text/css">
        .outlook-group-fix { width:100% !important; }
      </style>
      <![endif]-->
      <style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
        }
      </style>
      <style type="text/css">@media only screen and (max-width:480px) {
        table.full-width-mobile { width: 100% !important; }
        td.full-width-mobile { width: auto !important; }
        }
      </style>
    </head>
    <body style="background-color:#fff;">
      <div style="background-color:#fff;">
        <!-- Company Header --><!--[if mso | IE]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
              <div style="Margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="" style="vertical-align:top;width:600px;" >
                              <![endif]-->
                              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                        <tbody>
                                          <tr>
                                            <td style="width:135px;"><img height="auto" src="https://booking.windingtree.com/img/logo--gradient_black-text.png" alt="Winding Tree logo" title="Winding Tree logo" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="135"></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <![endif]-->
        <p style="border-top:solid 4px #5F2987;font-size:1;margin:0px auto;width:100%;"></p>
        <!--[if mso | IE]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #5F2987;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px" >
          <tr>
            <td style="height:0;line-height:0;"> &nbsp;</td>
          </tr>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
              <div style="Margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:30px;padding-top:35px;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="" style="vertical-align:top;width:600px;" >
                              <![endif]-->
                              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:19px;font-weight:bold;line-height:18px;text-align:left;color:#000000;">Your booking is ready!</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">Hello <b>${personalInfo.fullName}</b>. ${bookingDetails}</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">Enjoy your stay!</div>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
              <div style="background:#5F2987;background-color:#5F2987;Margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#5F2987;background-color:#5F2987;width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="" style="vertical-align:top;width:600px;" >
                              <![endif]-->
                              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Raleway, Helvetica, Arial;font-size:9px;line-height:18px;text-align:left;color:#ffffff;">Powered by Winding Tree</div>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <![endif]-->
      </div>
    </body>
  </html>
`;

  return confirmationHtml;
};

function _helperGetTxHTML (txs, paymentType) {
  let returnHtml = '';
  for (const tx of txs) {
    const amountHtml = paymentType === 'lif' ? '' : `
      <tr>
        <td align="left" style="font-size:0px;padding:10px 20px;padding-bottom:0;word-break:break-word;">
          <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;font-weight:bold;line-height:18px;text-align:left;color:#000000;">Send:</div>
        </td>
      </tr>
      <tr>
        <td align="left" style="font-size:0px;padding:0 20px;word-break:break-word;">
          <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">${web3.utils.fromWei(tx.value.toString())} ${paymentType.toUpperCase()}</div>
        </td>
      </tr>`;
    returnHtml += `
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
      <tr>
        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
          <![endif]-->
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="Margin:0px auto;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:35px;padding-left:25px;padding-right:25px;padding-top:10px;text-align:center;vertical-align:top;">
                          <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td class="" style="vertical-align:top;width:550px;" >
                                <![endif]-->
                                <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                  <table background="#F2F2F2" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="background-color:#F2F2F2;border-radius:5px;vertical-align:top;padding:8px 0;">
                                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                            ${amountHtml}
                                            <tr>
                                              <td align="left" style="font-size:0px;padding:10px 20px;padding-bottom:0;word-break:break-word;">
                                                <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;font-weight:bold;line-height:18px;text-align:left;color:#000000;">To:</div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td align="left" style="font-size:0px;padding:0 20px;word-break:break-word;">
                                                <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">${tx.to}</div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td align="left" style="font-size:0px;padding:15px 20px;padding-bottom:0;word-break:break-word;">
                                                <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;font-weight:bold;line-height:18px;text-align:left;color:#000000;">With this data:</div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td align="left" style="font-size:0px;padding:0 20px 10px 20px;word-break:break-word;">
                                                <div style="font-family:Raleway, Helvetica, Arial;font-size:14px;line-height:18px;text-align:left;color:#434343;">${tx.data}</div>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <!--[if mso | IE]>
                              </td>
                            </tr>
                          </table>
                          <![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]>
              </td>
            </tr>
          </table>
          <!--[if mso | IE]>
        </td>
      </tr>
    </table>`;
  }
  return returnHtml;
}
module.exports = {
  confirmationBody,
  instructionsBody,
  bookingChangeBody,
  informationBody,
  bookingCanceledBody,
};
