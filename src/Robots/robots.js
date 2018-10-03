import pandoraBox from "./error";

// https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)
export const integrate = (stringCode, trackingCodes, actions) => {
  pandoraBox.reset()
  console.log("fire");
  console.log(actions)
  const htmlCode = stringCode;
  const regex = regFor.url;
  // catch  all urls into array
  const catchUrls = htmlCode.match(regex);
  // prepare array with tracking codes obejcts
  const trackingsArray = createTrackingArray(trackingCodes);
  // clean urls form tracking codes remains and add actual tracking codes
  const addTrackingCodes = catchUrls.map(url =>
    modifyUrl(url)(createEndPoint(trackingsArray))
  );
  // chnage old urls to updated one with actual tracking codes
  const updatedContent = update(catchUrls, addTrackingCodes, htmlCode);

  //updated code with action from replaceActionsArray
  const finalCode = grabContent(updatedContent).then(addCode(actions));

  console.log(pandoraBox.get());
  return finalCode;
};

const createTrackingArray = trackings => {
  const arr = [];
  if (!!trackings.TID) {
    arr.push(trackings.TID);
  }

  if (!!trackings.CRM) {
    arr.push(trackings.CRM);
  }

  if (!!trackings.REC) {
    arr.push(trackings.REC);
  }
  // for (var key in state) {
  //   arr.push(state[key]);
  // }
  return arr;
};

// replace string parts from arrays
export const update = (find, replace, str, endIndex = 0) => {
  let newStr;
  for (let i = 0; i < find.length; i++) {
    const strIndex = str.indexOf(find[i], endIndex);
    endIndex = strIndex + find[i].length;
    // console.log(replace[i])
    str = str.slice(0, strIndex) + replace[i] + str.slice(endIndex);
  }
  return str;
};

// function that takes url and celan it form trackings
// than returns a function that takes a other function as a argument
// which takes celanedUrls as a argument
export const modifyUrl = url => {
  const cleanUrl = removeOldtrackings(url);
  return function(func) {
    return func(cleanUrl);
  };
};

// start - help functions - url builders
const removeOldtrackings = url => {
  const crmRegExp = regFor.crm;
  const oldCrm = url.match(crmRegExp);
  const cleanUrl = url.replace(crmRegExp, "");
  return cleanUrl;
};

//const checkIfCrm = crm => !!crm.includes("CRM");
const checkIfCrm = crm => {
  return !!crm.includes("CRM") || !!crm.includes("crm") ? true : false;
};

const cmpOrSrc = (url, tracking) => {
  if (checkIfCrm(tracking)) {
    const cmp = url.includes("CMP") ? "SRC=" : "CMP=";
    return cmp;
  }
};

const checkIfHeathrow = url => {
  const reg = /(\.heathrow\.|\.heathrowexpress\.)\w+/g;
  const heathrow = url.match(reg);
  return !!url.includes(heathrow);
};

const checkIfHeathrowExpress = url => {
  const reg = regFor.heathrowExpres;
  const heathrowExpres = url.match(reg);
  return !!url.includes(heathrowExpres);
};

// univeral
const checkIfDomain = (url, domain) => {
  const find = url.match(domain);
  return !!url.includes(find);
};

const moveHashToTheEnd = url => {
  const regHasah = regFor.hash;
  const hash = url.match(regHasah);
  return url.includes(hash) ? url.replace(regHasah, "") + hash : url;
};

const plus = (url, trackings) => {
  if (trackings.length) {
    return url.includes("?") ? "&" : "?";
  }
  return "";
};

// end - help functions - url builders
// function that adds all trackings to the main url
// and with help of url builders functions -
// modify tracknings and conectors in a suitbale way
export const createEndPoint = args => url => {
  const trackings = args;
  return trackings.reduce((prev, cur) => {
    // console.log('cur ',cur)
    cur = trackingsController(prev, cur);
    return moveHashToTheEnd(prev + plus(prev, cur) + cur);
  }, url);
};

// function that constrols, filters which tracking should be added to which domain,
// it shows the right way

// const trackingsController = (url, trackingAction) => {
//   const domain = trackingAction.domain;
//   const tracking = trackingAction.tracking;
//   switch(domain) {
//     case 'ALL' :
//       return checkIfCrm(tracking) ? cmpOrSrc(url) + tracking : tracking;
//       break;
//     case 'HEATHROW_&_HEATHROW_EXPRESS':
//       return checkIfHeathrow(url) ? tracking : '';
//       break;
//     case 'HEATHROW_EXPRESS':
//       return checkIfHeathrowExpress(url) ? tracking : '';
//       break;
//     default:
//       return tracking;
//   }
// }

// copy
// function that constrols, filters which tracking should be added to which domain,
// it shows the right way
const trackingsController = (url, trackingAction) => {
  const domain = trackingAction.domain;
  const tracking = trackingAction.tracking;
  switch (domain) {
    case "All":
      return checkIfDomain(tracking, regFor.pureCrm)
        ? cmpOrSrc(url, tracking) + tracking
        : tracking;
      break;
    case "Heathrow":
      return checkIfDomain(url, regFor.heathrow) ? tracking : "";
      break;
    case "HeathrowExpress":
      return checkIfDomain(url, regFor.heathrowExpres) ? tracking : "";
      break;
    default:
      return tracking;
  }
};

// tracking action generators - start
const addToAll = tracking => ({
  domain: "All",
  tracking
});

const addToHeathrow = tracking => ({
  domain: "Heathrow",
  tracking
});

const addToHex = tracking => ({
  domain: "HeathrowExpress",
  tracking
});
// tracking action generators - end

// array of actions, actions will be pushed to an array  - the trackingsArray - in aplications options panel
// const trackingsArray = [
//   addToHex("tid=cew&CMP=wd34&f43f$%"),
//   addToAll("CRM3337999"),
//   addToHeathrow("<%= recp=Id_recpipient %>")
// ];

// const reg exp obj
export const regFor = {
  pureCrm: /(CRM)/gi,
  crm: /\?+(SRC|CMP=CRM|CRM|CMP=+([1-10]))\w+/gi,
  img: /\"images\/|\('images\/|\("images\//gi,
  heathrow: /(\.heathrow\.|\.heathrowexpress)/g,
  heathrowExpres: /(\.heathrowexpress.)/g,
  url: /href="(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/gi,
  hash: /#([a-zA-z0-9\-_%](?!\?&))*/gi,
  tid: /tid=([-a-zA-Z0-9@:%._&=+\-^%]*)\w+/gi,
  recp: /recp=<%= targetData\.custId %>/g,
  backgroundRewards2016: /(?=<!-- Outlook2016)[\s\S]*(<?10 Background END -------------------------------- -->)/g,
  backgroundRewards2013: /(?=<!-- Outlook 2013)[\s\S]*(<?2007 Background End -------------------------------- -->)/g,
  divFooter: /(?=<div class="gmailfix" style="white-space:nowrap; font:15px courier;)[\s\S]*(<?<\/div>)/g,
  footer: /(?=<!-- TERMS)[\s\S]*(<?CONDITIONS END -->)/g,
  tableLayout: /(style="table-layout:fixed;"|table-layout:fixed;|style="table-layout:fixed"|table-layout:fixed)/g,
  unsub: /(<a href="#" _label="Unsubscribe_CTA")([\s\S]*?)(a> \|)|(<%@ include view='VIEW30' %>)/g
};

export const s = {
  social: "<!-- SOCIAL ICONS END -->",
  imgUrl: '"https://s3-eu-west-1.amazonaws.com/lhr-images/WR1551_',
  empty: "",
  unsub:
    '<a href="#" PETER _label="Unsubscribe_CTA" _category="T_G_HP" target="_blank" style="color:#ffffff; text-decoration:underline"><span style="color:#ffffff">Unsubscribe</span></a> |'
};

// ADD CONST PART OF CODE - HR, HEX, WIFI, LHR
// addingCodes experiment
// add str as a parametr

const favicon = () => ({
  todo: "ADD",
  error: "favicon error",
  location: "<head>",
  code:
    '\n <link rel="Shortcut Icon" type="image/x-icon" href="https://s3-eu-west-1.amazonaws.com/lhr-images/LHR_favico.png"/>'
});

const gmailFix = () => ({
  todo: "ADD",
  error: "gmailFix error",
  location: "</style>",
  code:
    "\n<style> \n .gmailfix {\n  display:none;\n  display:none !important; \n} \n</style>"
});

const metaDetection = () => ({
  todo: "ADD",
  error: "metaDetection error",
  location:
    '<meta name="format-detection" content="telephone=no"/>\n<meta name="format-detection" content="date=no"/>',
  code: '\n<meta name="format-detection" content="address=no" />'
});

const backgroundRewards2013 = () => ({
  todo: "REPLACE",
  error: "backgroundRewards2013 error",
  location: regFor.backgroundRewards2013,
  code:
    '<!-- Outlook 2016,Win10, 2013,2010,2007 Background START -------------------------------- -->\n<!--[if gte mso 9]>\n<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">\n<v:fill type="tile" src="https://s3-eu-west-1.amazonaws.com/havasheliaww/rewards_bg.jpg" color="#e4e4e4"/>\n</v:background>\n<![endif]-->\n<!-- Outlook 2016,Win10, 2013,2010,2007 Background END --------------------------------  -->'
});

const backgroundRewards2016 = () => ({
  todo: "REPLACE",
  error: "backgroundRewards2016 error",
  location: regFor.backgroundRewards2016,
  code: " "
});

const footerMay = () => ({
  todo: "REPLACE",
  error: "footerMay error",
  location: regFor.divFooter,
  code:
    '<%@ include view="FooterMay17" %>\n<%@ include view="LiveRampTrackingPixel" %>'
});

const moveFooter = () => ({
  todo: "MOVE",
  error: "moveFooter error",
  location: s.social,
  code: regFor.footer
});

const adWRtoImgs = () => ({
  todo: "REPLACE",
  error: "adWRtoImgs error",
  location: regFor.img,
  code: s.imgUrl
});

const removeTableLayoutFixed = () => ({
  todo: "REPLACE",
  error: "removeTableLayoutFixed error",
  location: regFor.tableLayout,
  code: s.empty
});

const unsub = () => ({
  todo: "REPLACE",
  error: "unsub error",
  location: regFor.unsub,
  code: s.unsub
});

const replaceActionsArray = [
  favicon(),
  gmailFix(),
  metaDetection(),
  backgroundRewards2013(),
  backgroundRewards2016(),
  footerMay(),
  adWRtoImgs(),
  moveFooter(),
  removeTableLayoutFixed(),
  unsub(s.unsub)
];

const findAndReplaceWith = (find, replaceWith, str, error) => {
  console.log("findAndReplaceWith ", find, replaceWith);
  // if (!str.match(find)) {
  //   console.log(str.match(find));
  //   pandoraBox.add(error)
  //   console.log(error);
  //   return str;
  // }
  return str.replace(find, replaceWith);
};

const findAndMove = (moveTo, findRegExp, str, error) => {
  console.log(findRegExp);
  console.log(str.match(findRegExp));
  if (!str.match(findRegExp)) {
    pandoraBox.add(error)
    console.log(error);
    return str;
  } else {
    const find = str.match(findRegExp)[0];

    const length = moveTo.length;
    const indexFind = str.indexOf(find);
    const newStr = str.slice(0, indexFind) + str.slice(indexFind + find.length);
    const indexMoveTo = newStr.indexOf(moveTo);
    return `${newStr.slice(0, indexMoveTo + length)}\n\n${find}${newStr.slice(
      indexMoveTo + length
    )}`;
  }
};

const addToPlace = (find, moveTo, str, error) => {
  const lengthfind = find.length;
  const lengthmoveTo = moveTo.length;
  const indexFind = str.indexOf(find);
  const indexMoveTo = str.indexOf(moveTo);
  return (
    str.slice(0, indexFind + lengthfind) +
    moveTo +
    str.slice(indexFind + lengthfind)
  );
};

const addCode = actions => content => {
  let string = content;
  for (let i = 0; i < actions.length; i++) {
    string = reducer(actions[i], string);
  }

  return string;
};

// reducer build
const reducer = (action, state) => {
  switch (action.todo) {
    case "MOVE":
      return findAndMove(action.location, action.code, state, action.error);

    case "ADD":
      return addToPlace(action.location, action.code, state, action.error);

    case "REPLACE":
      return findAndReplaceWith(
        action.location,
        action.code,
        state,
        action.error
      );
    default:
      return state;
  }
};

const plusCode = (where, code) => where + code;

const grabContent = str => {
  return {
    then(func) {
      return (str = func(str));
    }
  };
};

// EXPERIMENT
// const grabContent = str => {
//   return {
//     then(func) {
//       str = func(str);
//       console.log(this);
//       return this;
//     },
//   };
// };

// make conection between checkboxes and replaceActionsArray
// make radio buttons dictate default state of checboxexs that are checked
