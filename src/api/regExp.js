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
  imgUrl: '"https://s3-eu-west-1.amazonaws.com/lhr-images/',
  empty: " ",
  unsub:
    '<a href="#" _label="Unsubscribe_CTA" _category="T_G_HP" target="_blank" style="color:#ffffff; text-decoration:underline"><span style="color:#ffffff">Unsubscribe</span></a> |',
  faviconHR:
    '\n <link rel="Shortcut Icon" type="image/x-icon" href="https://s3-eu-west-1.amazonaws.com/lhr-images/LHR_favico.png"/>',
  footerMay: '<%@ include view="FooterMay17" %>',
  gmailFix:
    "\n<style> \n .gmailfix {\n  display:none;\n  display:none !important; \n} \n</style>"
};
