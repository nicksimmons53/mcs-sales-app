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
    atopay: false, // BOOL   - AUTO PAY
    invsbm: null, // STRING - HOW TO SUBMIT INVOICES
    pmttyp: null, // STRING - PAYMENT TYPE
    pmtprt: false, // BOOLEAN - PAYMENT PORTAL
    pmturl: null, // STRING - PAYMENT PORTAL URL
    posreq: false, // BOOL   - POS 
    invpos: false, // BOOL   - POs REQUIRED FOR INVOICE SUBMITTAL
    pohndl: false, // STRING - PO CORRECTION HANDLING
    pohnem: null, // STRING - PO CORRECTION HANDLING EMAIL
    aprvls: false, // BOOL   - APPROVALS REQUIRED
    vndprt: null, // STRING - VENDOR PORTAL
    completed: 0, // INT    - COMPLETED
    done: 0,      // INT    - DONE
    strtdt: null, // STRING - EXPECTED START DATE
    invema: null, // STRING - INVOICE SUBMIT EMAIL ADDRESS
    invadr: null, // STRING - INVOICE ADDRESS
    invcty: null, // STRING - INVOICE CITY
    invste: null, // STRING - INVOICE STATE
    invzip: null, // STRING - INVOICE ZIP
    jobrls: null, // STRING - HOW ARE JOBS RELEASED
    jobema: null, // STRING - EMAIL ADDRESS FOR JOB RELEASE ADDRESS
    vndusr: null, // STRING - VENDOR PORTAL USERNAME
    vndpss: null, // STRING - VENDOR PORTAL PASSWORD
    homest: null, // STRING - ESTIMATED NUMBER OF HOMES
    accema: null, // STRING - ACCOUNTING CONTACT EMAIL
    accphn: null, // STRING - ACCOUNTING CONTACT PHONE
    accnam: null, // STRING - ACCOUNTING CONTACT NAME
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

const Contact = {
    id: "",
    clientId: "",
    name: "",
    title: "",
    phone: "",
    email: ""
};

const email = {
    to: "",
    from: "",
    subject: "",
    message: ""
};

const TileProgram = {
    setting_material: null,
    waterproof_method: null,
    waterproof_sova_constr: false,
    backboard_installer: false,
    silicon_pref: null,
    colored_caulk: null,
    shower_niche_pref: null,
    corner_soap_dish: false,
    shower_seat_pref: null,
    schulter_pref: false,
    grout_joint_size_pref: null,
    grout_pref: null,
    grout_brand: null,
    subfloor_pref: null,
    subfloor_other: null,
    takeoff_resp: null,
    waste_pct: null,
    wall_tile_height: null,
    tile_return_walls: false,
    notes: null
};

const FieldInfo = {
    paymentFrequency: "Please indicate how often payment is expected by selecting, weekly, bi-weekly, or monthly.",
    autopay: "Please mark if payment is automatically sent when PO/Work is submitted/complete. If yes, then \"How to submit invoices?\", \"Are PO's Required for Invoice Submittal?\", and \"Approvals Required?\" do not need to be answered.",
    invoiceSubmit: "Please indicate how invoices are sent by selecting email, mail, or drop off and fill in additional information.",
    paymentType: "Please indicate how payment will be made by selecting credit card, check, or direct deposit.",
    paymentPortal: "If there is a portal for payment, please enter the website below.",
    poRequired: "Are PO’s required for installations?",
    poInvoice: "Is it required for PO’s to be submitted with invoices for payment?",
    approvalsReq: "Are approvals required to be submitted with the invoices for payment if there is not a PO?",
    jobsReleased: "How do expeditors receive job requests?",
    poCorrection: "Does the client allow for PO Corrections? If yes, please enter the email for correction submittal.",
    expFiles: "Attach Community Standards or Building Forms. No Plans."
};

export { 
    User, 
    Client,
    Contact1,
    Contact2,
    Contact3,
    Part,
    email,
    FieldInfo,
    TileProgram
};
