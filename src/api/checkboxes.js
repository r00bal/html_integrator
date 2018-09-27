import { regFor, s } from "./regExp.js";

export const checkboxes = [
  {
    name: "Add HR & LHR favicon",
    value: "LHRfavicon",
    todo: "ADD",
    error: "favicon error",
    location: "<head>",
    default: "HR",
    code: s.faviconHR
  },

  {
    name: "Add footerMay",
    value: "footerMay",
    todo: "REPLACE",
    error: "footerMay error",
    location: regFor.divFooter,
    default: "ALL",
    code: s.footerMay
  },
  {
    name: "Remove 'Table-layout:fixed'",
    value: "removeTableLayoutFixed",
    todo: "REPLACE",
    error: "removeTableLayoutFixed error",
    location: regFor.tableLayout,
    default: "no",
    code: s.empty
  },
  {
    name: "Add gmail fix",
    value: "gmailFix",
    todo: "ADD",
    error: "gmailFix error",
    location: "</style>",
    default: "ALL",
    code: s.gmailFix
  },
  {
    name: "Ad WR_ prefix to IMG",
    value: "addWR",
    todo: "REPLACE",
    error: "adWRtoImgs error",
    location: regFor.img,
    default: "ALL",
    code: s.imgUrl
  },
  {
    name: "HEX favicon",
    value: "HEXfavicon",
    todo: "ADD",
    error: "HEX favicon error",
    location: "<head>",
    code:
      '<link rel="Shortcut Icon" type="image/x-icon" href="https://s3-eu-west-1.amazonaws.com/lhr-images/HEX_favico.png" />',
    default: "HEX"
  },
  {
    name: "Add metaDetection",
    value: "metaDetection",
    todo: "ADD",
    error: "metaDetection error",
    location:
      '<meta name="format-detection" content="telephone=no"/>\n<meta name="format-detection" content="date=no"/>',
    code: '\n<meta name="format-detection" content="address=no" />',
    default: "ALL"
  },
  {
    name: "remove backgroundReward 2013",
    value: "backgroundRewards2013",
    todo: "REPLACE",
    error: "backgroundRewards2013 error",
    location: regFor.backgroundRewards2013,
    code:
      '<!-- Outlook 2016,Win10, 2013,2010,2007 Background START -------------------------------- -->\n<!--[if gte mso 9]>\n<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">\n<v:fill type="tile" src="https://s3-eu-west-1.amazonaws.com/havasheliaww/rewards_bg.jpg" color="#e4e4e4"/>\n</v:background>\n<![endif]-->\n<!-- Outlook 2016,Win10, 2013,2010,2007 Background END --------------------------------  -->',
    default: "HR"
  },
  {
    name: "Add backgroundRewards2016",
    value: "backgroundRewards2016",
    todo: "REPLACE",
    error: "backgroundRewards2016 error",
    location: "regFor.backgroundRewards2016",
    code: " ",
    default: "HR"
  },
  {
    name: "Add HEX Random Pixel",
    value: "AddHEXRandomPixel",
    todo: "REPLACE",
    error: "error AddHEXRandomPixel",
    location: " </body>",
    code:
      '<%@ include view="FooterMay17" %> \n  <% var randomNumber = Math.floor((Math.random() * 1000000) + 1); %> \n <img src="https://ad.doubleclick.net/ddm/activity/src=3793307;type=hexemail;cat=hex-e0;u13=WR1680;u14=ALLB;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=<%= targetData.individual_id %>;num=<%= randomNumber %>?" width="1" height="1" alt="iCr"/> \n  </body>',
    default: "HEX"
  },
  {
    name: "Add HEX unsub",
    value: "unsubHEX",
    todo: "REPLACE",
    error: "unsub HEX error",
    location: "<%@ include view='VIEW30' %>",
    code: "<%@ include view='VIEW111' %>",
    default: "HEX"
  },
  {
    name: "Add HR unsub",
    value: "unsubHR",
    todo: "REPLACE",
    error: "unsub HR error",
    location:
      '<a href="#" _label="Unsubscribe_CTA" _category="T_G_HP" target="_blank" style="color:#ffffff; text-decoration:underline"><span style="color:#ffffff">Unsubscribe</span></a> |',
    code:
      '<a href="https://rewards.heathrow.com/web/lhr/unsubscribe?cardNumber=<%= targetData.customer_no %>&hash=<%= targetData.staff_type %>&CMP=CRM1234567" _label="unsubscribe" target="_blank" style="color:#FFF"><span style="color:#ffffff; text-decoration:underline">Unsubscribe</span></a> |',
    default: "HR"
  },
  {
    name: "Add LHR unsub",
    value: "unsubLHR",
    todo: "REPLACE",
    error: "unsub LHR error",
    location:
      '<a href="#" _label="Unsubscribe_CTA" _category="T_G_HP" target="_blank" style="color:#ffffff; text-decoration:underline"> <span style="color:#ffffff">Unsubscribe</span></a> |',
    code: "<%@ include view='VIEW21' %>",
    default: "LHR"
  },
  {
    name: "Move Footer to main Wrapper",
    value: "moveFooter",
    todo: "MOVE",
    error: "moveFooter error",
    location: s.social,
    code: regFor.footer,
    default: ["HR", "LHR"]
  },
  {
    name: "Add dataHref to foter Rewards address",
    value: "dataHrefHR",
    todo: "REPLACE",
    error: "dataHrefHR error",
    location: "01991017",
    code:
      '<a href="#date12345" style="color:#898989; text-decoration:none; cursor:default;">01991017</a>',
    default: ["HR", "LHR"]
  },
  {
    name: "Add dataHref to foter HEX address",
    value: "dataHrefHEX",
    todo: "REPLACE",
    error: "dataHrefHEX error",
    location: "03145133",
    code:
      '<a href="#date12345" style="color:#000000; text-decoration:none; cursor:default;">01991017</a>',
    default: ["HEX"]
  },
  {
    name: "Add HR & LHR MirrorPageUrl",
    value: "HR&LHRMirrorPageUrl",
    todo: "REPLACE",
    error: "LHRMirrorPageUrl error",
    location:
      'Email not displaying correctly? <a href="#" target="_blank" style="color: #ffffff;">View online</a>',
    code:
      '<%  if ( document.mode != "mirror" && document.mode != "forward" ) { %> Email not displaying properly? Please <a href="<%@ include view=\'MirrorPageUrl\' %>" _label="web-view-link" target="_blank" style="color:#555555; text-decoration:underline; font-weight:normal;">click here</a>. <% } %>',
    default: ["HR", "LHR"]
  },
  {
    name: "Add HEX MirrorPageUrl",
    value: "HEXMirrorPageUrl",
    todo: "REPLACE",
    error: "HEX MirrorPageUrl error",
    location:
      '<th class="hide" width="100%" style="font-weight: normal; padding-top:15px; padding-bottom:15px; font-family:Arial, Helvetica, sans-serif; font-size:11px; line-height:100%; color:#333333; text-align: right;">Email not displaying properly?<br>Please <a href="#" _label="view-in-browser" style="color:#333333"><span style="color:#333333; text-decoration:underline">click here</span></a>.</th>',
    code:
      '<th  width="100%" style="font-weight: normal; padding-top:15px; padding-bottom:15px; font-family:Arial, Helvetica, sans-serif; font-size:11px; line-height:100%; color:#333333; text-align: right;"> <%  if ( document.mode != "mirror" & document.mode != "forward" ) { %> Email not displaying properly? Please <a href="<%@ include view=\'MirrorPageUrl\' %>" _label="web-view-link" target="_blank" style="color:#000001; text-decoration:underline; font-weight:normal;">click here</a>.<% } %></th>',
    default: ["HEX"]
  }
];
