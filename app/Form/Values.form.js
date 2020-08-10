const User = {
  recnum: "",
  fstnme: "",
  lstnme: "",
  e_mail: "",
  cllphn: "",
  usrnme: "",
  passwd: ""
};

const Client = {
  shtnme: "",
  clnnme: "",
  grting: null,
  addrs1: "",
  addrs2: "",
  ctynme: "",
  state_: "",
  zipcde: "",
  bilad1: "",
  bilad2: "",
  bilcty: "",
  bilste: "",
  bilzip: "",
  shpad1: "",
  shpad2: "",
  shpcty: "",
  shpste: "",
  shpzip: "",
  usrdf1: null,
  usrdf2: null,
  usrdf3: null,
  usrdf4: null,
  usrdf5: null,
  usrdf6: null,
  usrdf7: null,
  usrdf8: null,
  usrdf9: null,
  contct: null,
  contc2: null,
  contc3: null,
  cntds1: null,
  cntds2: null,
  cntds3: null,
  phnnum: null,
  phn002: null,
  phn003: null,
  phnext: null,
  phext2: null,
  phext3: null,
  faxnum: null,
  fax002: null,
  fax003: null,
  cllphn: null,
  cell02: null,
  cell03: null,
  pagnum: null,
  pagr02: null,
  pagr03: null,
  e_mail: null,
  email2: null,
  email3: null,
  dtercv: null,
  empnum: null,
  mannum: 1010,
  taxdst: null,
  lstctc: null,
  cllbck: null,
  lstmal: null,
  lstdte: null,
  pchdte: null,
  refdte: null,
  prdnum: null,
  dscrte: null,
  duetrm: null,
  finrte: null,
  ledsrc: null,
  clntyp: 1,
  status: 1,
  mallst: null,
  region: null,
  cmpsze: null,
  srvcon: null,
  srvexp: null,
  clndsc: null,
  begbal: null,
  endbal: null,
  maploc: null,
  crsstr: null,
  bilbas: null,
  pchnum: null,
  exmnum: null,
  crdnum: null,
  expdte: null,
  crdnme: null,
  crdtyp: null,
  ntetxt: null,
  catxex: null,
  pstexm: null,
  inactv: null,
  stmeml: null,
  // FROM HERE ON NEED TO BE CREATED
  pmtfrq: null, // STRING - PAYMENT FREQUENCY
  atopay: null, // BOOL   - AUTO PAY
  invsbm: null, // STRING - HOW TO SUBMIT INVOICES
  pmttyp: null, // STRING - PAYMENT TYPE
  pmtprt: null, // STRING - PAYMENT PORTAL
  pmturl: null, // STRING - PAYMENT PORTAL URL
  posreq: null, // BOOL   - POS 
  invpos: null, // BOOL   - POs REQUIRED FOR INVOICE SUBMITTAL
  pohndl: null, // STRING - PO ERROR HANDLING
  aprvls: null, // BOOL   - APPROVALS REQUIRED
  vndprt: null, // STRING - VENDOR PORTAL
  completed: 0, // INT    - COMPLETED
  done: 0,      // INT    - DONE
  strtdt: null, // STRING - EXPECTED START DATE
  invema: null, // STRING - INVOICE SUBMIT EMAIL ADDRESS
  invadr: null, // STRING - INVOICE ADDRESS
  invcty: null, // STRING - INVOICE CITY
  invste: null, // STRING - INVOICE STATE
  invzip: null, // STRING - INVOICE ZIP
};

const Part = {
  id: null,
  prtnme: "",
  prtunt: "SQFT",
  binnum: "",
  alpnum: "",
  msdsnm: "",
  mannme: "",
  mannum: "",
  usrdf1: "",
  usrdf2: "",
  cstcde: null,
  csttyp: null,
  prttsk: null,
  prtcls: null,
  dftloc: null,
  lstupd: null,
  reordr: null,
  minord: null,
  pkgqty: null,
  prtwgt: null,
  avgcst: null,
  prtcst: null,
  labunt: null,
  prtbil: null,
  qtyohn: null,
  stkitm: 1,
  serinv: null,
  mrkupr: null,
  labnum: null,
  ntetxt: "",
  prtspc: "",
  imgfle: "",
  srvprt: null,
  oemdur: null,
  reqivt: null,
  sbjpst: null,
  inactv: null,
  clntid: null,
  tblnme: "",
  prgrm_: null
};

const Contact1 = {
  contct: "",
  cntds1: "",
  phnnum: "",
  phnext: "",
  faxnum: "",
  cllphn: "",
  pagnum: "",
  e_mail: ""
};

const Contact2 = {
  contc2: "",
  cntds2: "",
  phn002: "",
  phext2: "",
  fax002: "",
  cell02: "",
  pagr02: "",
  email2: ""
};

const Contact3 = {
  contc3: "",
  cntds3: "",
  phn003: "",
  phext3: "",
  fax003: "",
  cell03: "",
  pagr03: "",
  email3: ""
};

const email = {
  to: "",
  from: "",
  subject: "",
  message: ""
};

export { 
  User, 
  Client,
  Contact1,
  Contact2,
  Contact3,
  Part,
  email
};
