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
    cllphn: null,
    cell02: null,
    cell03: null,
    e_mail: null,
    email2: null,
    email3: null,
    dtercv: null,
    empnum: null,
    mannum: 1010,
    lstctc: null,
    clntyp: 1,
    status: 1,
    region: null,
    cmpsze: null,
    ntetxt: null,
    inactv: null,
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

const Contact = {
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
    client_id: null,
    setting_material_walls: null,
    setting_material_floors: null,
    setting_material_walls_cust: null,      //
    setting_material_floors_cust: null,     //
    waterproof_method: null,
    waterproof_sova_constr: false,          //
    backerboard_installer: false,             
    silicon_pref: null,                     
    colored_caulk: null,                    //
    shower_niche_pref: null,
    shower_niche_brand: null,
    shower_niche_std_size: null,
    corner_soap_dish: false,
    shower_seat_pref: null,
    shower_seat_constr: null,
    schulter_pref: false,
    grout_joint_size_pref: null,
    grout_pref: null,
    grout_brand: null,
    subfloor_pref: null,
    subfloor_other: null,
    tile_return_walls: false,
    takeoff_resp: null,
    waste_pct: null,
    wall_tile_height: null,
    notes: null
};

const ClientInfo = {
    client_id: null,
    payment_freq: null,
    autopay: false,
    invoice_submit: null,
    invoice_email: null,
    invoice_addr: null,
    invoice_city: null,
    invoice_state: null,
    invoice_zip: null,
    payment_type: null,
    payment_portal: false,
    payment_url: null,
    po_required: false,
    invoice_req_pos: false,
    approvals_req: false,
    acc_cont_name: null,
    acc_cont_phn: null,
    acc_cont_ema: null,
    vendor_portal: null,
    vnd_portal_user: null,
    vnd_portal_pswd: null,
    job_release: null,
    job_email: null,
    po_handling: false,
    po_hndl_email: null,
    exp_start_date: null,
    est_num_homes: null
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

const TileFieldInfo = {
    settingMaterial: "Texrite preferred for floors. Custom preferred for walls.",
    sovaConstruction: "Does Sova need to be contacted for installation?",
    showerNiche: "If using preformed/preframed niches, please specify brand & standard size.",
    groutJoint: "3/16\" is typical, especially for longer tile."
};

export { 
    User, 
    Client,
    Contact,
    Part,
    email,
    FieldInfo,
    TileProgram,
    ClientInfo,
    TileFieldInfo
};
