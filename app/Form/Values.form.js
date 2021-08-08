const User = {
    recnum: "",
    fstnme: "",
    lstnme: "",
    e_mail: "",
    cllphn: "",
    usrnme: "",
    passwd: ""
};

const NewClient = {
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
    mannum: 1010,
    clntyp: 1,
    status: 1,
    ntetxt: null,
    inactv: null,
    completed: 0, // INT    - COMPLETED
    done: 0,      // INT    - DONE
};

const Part = {
    description: "",
    unit: "",
    material: "",
    materialTax: "",
    labor: "",
    total: ""
}

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
    setting_material_walls_product: null,                   
    setting_material_floors: null,
    setting_material_floors_product: null,                  
    setting_material_walls_cust: null,      
    setting_material_floors_cust: null,   
    allotted_float: null,                                
    allotted_float_charge: null,                                            
    waterproof_method_shower_wall: null,                     
    waterproof_method_tub_wall: null,                     
    waterproof_method: null,
    waterproof_sova_constr: false,          
    backerboard_installer: null,
    punch_out_material: null,        
    shower_niche_pref: null,
    shower_niche_brand: null,
    shower_niche_std_size: null,
    corner_soap_dish_std: null,                           
    shower_seat_pref: null,
    shower_seat_constr: null,
    schulter_option: null,                              
    pony_wall: null,                                    
    schulter_pref: false,
    grout_joint_size_pref: null,
    grout_pref: null,
    grout_product: null,                                
    grout_upgrade: null,                                    
    subfloor_pref: null,
    subfloor_other: null,
    takeoff_resp: null,
    tile_return_walls: null,
    waste_pct: null,
    waste_pct_walls: null,                                    
    waste_pct_floors: null,                                    
    waste_pct_mosaics: null,                                    
    wall_tile_height: null,
    notes: null
};

const WoodProgram = {
    client_id: null,
    glue_pref: null,
    floor_trim_installer: null,
    floor_trim_style: null,
    second_story_hardie: null,
    transition_strips_std: false,
    hvac_req: false,
    takeoff_resp: null,
    waste_factor: null,
    notes: null
}

const CarpetProgram = {
    client_id: null,
    padding_brand_pref: null,
    carpet_brand_pref: null,
    takeoff_resp: null,
    waste_factor: null,
    notes: null
};

const CountertopProgram = {
    client_id: null,
    material_thickness_pref: null,
    material_thickness_other: null,
    edge_pref: null,
    edge_pref_other: null,
    waterfall_sides_std: false,
    faucet_holes: false,
    stove_range_specs: null,
    takeoff_resp: null,
    waste_factor: null,
    notes: null
};

const CabinetProgram = {
    client_id: null,
    color_pref: null,
    style_pref: null,
    soft_close_std: false,
    overlay: null,
    crown_pref: null,
    upper_cabinet_spec: null,
    vanity_height_spec: null,
    bid_type_pref: null,
    optioned_area_out: null,
    notes: null
};

const ClientInfo = {
    client_id: null,
    client_status: null,
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

const WoodFieldInfo = {
    preferredGlue: "Mapei 9-80 is our standard; Contains moisture barrier and a warranty program",
    floorTrimInstaller: "Ideally 1/4\" round or Shoe Mold will not need to be installed, the floor will be fitted directly under the floorboards. However, it may be the builders standard practice to include 1/4\" round or shoe molding.",
    secondStorySubfloor: "Hardie is optional, technically wood flooring can be glued down to sub floor but might be standard practice for different builders.",
    transitionStrips: "We typically do not include T-Molding but can be standard practice for some builders.",
    hvacRequirement: "It is best standard practice for HVAC to be installed and running properly before wood flooring is delivered to the property. If the builder does not require HVAC they sign release."
};

const CarpetProgramInfo = {
    floorTrimInstaller: "Ideally 1/4\" round or Shoe Mold will not need to be installed, the floor will be fitted directly under the floorboards. However, it may be the builders standard practice to include 1/4\" round or shoe molding."
};

const TilePricing = {
    tables: [
        {
            name: "Floor Tile",
            headers: ["Description", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
            rows: {
                1: {
                    description: "",
                    unit: "",
                    material: "",
                    materialTax: "",
                    labor: "",
                    total: ""
                }
            }
        }
    ],
};

let levels = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
    { label: "11", value: 11 },
    { label: "12", value: 12 },
    { label: "13", value: 13 },
    { label: "14", value: 14 },
    { label: "15", value: 15 },
    { label: "16", value: 16 },
    { label: "17", value: 17 },
    { label: "18", value: 18 },
    { label: "19", value: 19 },
    { label: "20", value: 20 },
    { label: "21", value: 21 },
    { label: "22", value: 22 },
    { label: "23", value: 23 },
    { label: "24", value: 24 },
    { label: "25", value: 25 },
    { label: "26", value: 26 },
    { label: "27", value: 27 },
    { label: "28", value: 28 },
    { label: "29", value: 29 },
    { label: "30", value: 30 },
    { label: "31", value: 31 },
    { label: "32", value: 32 },
    { label: "33", value: 33 },
    { label: "34", value: 34 },
    { label: "35", value: 35 },
    { label: "36", value: 36 },
    { label: "37", value: 37 },
    { label: "38", value: 38 },
    { label: "39", value: 39 },
    { label: "40", value: 40 },
    { label: "41", value: 41 },
    { label: "42", value: 42 },
    { label: "43", value: 43 },
    { label: "44", value: 44 },
    { label: "45", value: 45 },
    { label: "46", value: 46 },
    { label: "47", value: 47 },
    { label: "48", value: 48 },
    { label: "49", value: 49 },
    { label: "50", value: 50 },
    { label: "A", value: "A"},
    { label: "B", value: "B"},
    { label: "C", value: "C"},
    { label: "D", value: "D"},
    { label: "E", value: "E"},
    { label: "F", value: "F"},
    { label: "G", value: "G"},
    { label: "H", value: "H"},
    { label: "I", value: "I"},
    { label: "J", value: "J"},
    { label: "K", value: "K"},
    { label: "L", value: "L"},
    { label: "M", value: "M"},
    { label: "N", value: "N"},
    { label: "O", value: "O"},
    { label: "P", value: "P"},
    { label: "Q", value: "Q"},
    { label: "R", value: "R"},
    { label: "S", value: "S"},
    { label: "T", value: "T"},
    { label: "U", value: "U"},
    { label: "V", value: "V"},
    { label: "W", value: "W"},
    { label: "X", value: "X"},
    { label: "Y", value: "Y"},
    { label: "Z", value: "Z"},
];

let countertopColors = [
    { label: "Absolute Black", value: "Absolute Black" },
    { label: "Allure", value: "Allure" },
    { label: "Antarctica", value: "Antarctica" },
    { label: "Atlantico", value: "Atlantico" },
    { label: "Bianco Calacatta", value: "Bianco Calacatta" },
    { label: "Black Forest", value: "Black Forest" },
    { label: "Black Mist Honed", value: "Black Mist Honed" },
    { label: "Black Mist Polished", value: "Black Mist Polished" },
    { label: "Black Pearl", value: "Black Pearl" },
    { label: "Blanco City", value: "Blanco City" },
    { label: "Blanco Galia", value: "Blanco Galia" },
    { label: "Blanco Maple", value: "Blanco Maple" },
    { label: "Blanco Orion", value: "Blanco Orion" },
    { label: "Blanco Perla", value: "Blanco Perla" },
    { label: "Butterfly Beige", value: "Butterfly Beige" },
    { label: "Calacatta Gyotto", value: "Calacatta Gyotto" },
    { label: "Caramel Cream", value: "Caramel Cream" },
    { label: "Cartier", value: "Cartier" },
    { label: "Cemento Suede", value: "Cemento Suede" },
    { label: "Charcoal Soapstone", value: "Charcoal Soapstone" },
    { label: "Classic Cream", value: "Classic Cream" },
    { label: "Colonial White", value: "Colonial White" },
    { label: "Copper Canyon", value: "Copper Canyon" },
    { label: "Coral Clay", value: "Coral Clay" },
    { label: "Crema Bordeaux", value: "Crema Bordeaux" },
    { label: "Crema Marfil", value: "Crema Marfil" },
    { label: "Cygnus", value: "Cygnus" },
    { label: "Delicatus White", value: "Delicatus White" },
    { label: "Desert Silver", value: "Desert Silver" },
    { label: "Diamond Bianco", value: "Diamond Bianco" },
    { label: "Emerald Pearl", value: "Emerald Pearl" },
    { label: "Eternal Calacatta Gold", value: "Eternal Calacatta Gold" },
    { label: "Eternal Serena", value: "Eternal Serena" },
    { label: "Giallo Arctic", value: "Giallo Arctic" },
    { label: "Golden Paradise", value: "Golden Paradise" },
    { label: "Grey Expo", value: "Grey Expo" },
    { label: "Helix", value: "Helix" },
    { label: "Himalaya White", value: "Himalaya White" },
    { label: "Iconic White", value: "Iconic White" },
    { label: "Key West Gold", value: "Key West Gold" },
    { label: "Lena", value: "Lena" },
    { label: "Lusso", value: "Lusso" },
    { label: "Lyra", value: "Lyra" },
    { label: "Madreperola", value: "Madreperola" },
    { label: "Marengo", value: "Marengo" },
    { label: "Marquina", value: "Marquina" },
    { label: "Mauloa Grey", value: "Mauloa Grey" },
    { label: "Miami White", value: "Miami White" },
    { label: "Moon White", value: "Moon White" },
    { label: "New Caledonia", value: "New Caledonia" },
    { label: "New Venetian Gold", value: "New Venetian Gold" },
    { label: "Noka", value: "Noka" },
    { label: "Ocean Jasper", value: "Ocean Jasper" },
    { label: "Original Treasure", value: "Original Treasure" },
    { label: "Pearl Jasmine", value: "Pearl Jasmine" },
    { label: "Pietra", value: "Pietra" },
    { label: "Rocky Mountain", value: "Rocky Mountain" },
    { label: "Royal Reef", value: "Royal Reef" },
    { label: "San Leon", value: "San Leon" },
    { label: "Sapphire Brown", value: "Sapphire Brown" },
    { label: "Sapphire Grey", value: "Sapphire Grey" },
    { label: "Silken Pearl", value: "Silken Pearl" },
    { label: "Silver Pearl", value: "Silver Pearl" },
    { label: "Splendid", value: "Splendid" },
    { label: "Statuario", value: "Statuario" },
    { label: "Summit White", value: "Summit White" },
    { label: "Taj Mahal", value: "Taj Mahal" },
    { label: "Tan Brown", value: "Tan Brown" },
    { label: "Taupe Gray", value: "Taupe Gray" },
    { label: "Thunder White", value: "Thunder White" },
    { label: "Tibet White", value: "Tibet White" },
    { label: "Tulum", value: "Tulum" },
    { label: "Typhoon Bordeaux", value: "Typhoon Bordeaux" },
    { label: "Tropical Brown", value: "Tropical Brown" },
    { label: "Uba Tuba", value: "Uba Tuba" },
    { label: "Urban Frost", value: "Urban Frost" },
    { label: "Valle Nevado", value: "Valle Nevado" },
    { label: "Verde Butterfly", value: "Verde Butterfly" },
    { label: "Viscont White", value: "Viscont White" },
    { label: "Yukon", value: "Yukon" },
];

let countertopTypes = [
    { label: "", value: "" },
    { label: "Granite 2cm", value: "Granite 2cm" },
    { label: "Granite 3cm", value: "Granite 3cm" },
    { label: "Quartz 2cm", value: "Quartz 2cm" },
    { label: "Quartz 3cm", value: "Quartz 3cm" },
    { label: "Porcelain 1.2cm", value: "Porcelain 1.2cm" }
];

let units = [
    { label: "", value: "" },
    { label: "SqFt", value: "sqft" },
    { label: "Each", value: "each" },
    { label: "Linear Foot", value: "linear" },
    { label: "SqYd", value: "sqyd" },
    { label: "Per Bag", value: "per bag"}
];

let edges = [
    { label: "3cm Straight", value: "3cm Straight" },
    { label: "3cm Bullnose", value: "3cm Bullnose" },
    { label: "3cm Waterfall", value: "3cm Waterfall" },
    { label: "3cm Ogee", value: "3cm Ogee" },
];

let patterns = [
    { label: "Diagonal", value: "Diagonal" },
    { label: "Offset", value: "Offset" },
    { label: "Herringbone", value: "Herringbone" },
    { label: "Versailles", value: "Versailles" },
    { label: "Border", value: "Border" },
    { label: "1 Accents - Per SqFt Of Accent Area", value: "1 Accents - Per SqFt Of Accent Area" },
    { label: "2 Accents - Per SqFt Of Accent Area", value: "2 Accents - Per SqFt Of Accent Area" },
    { label: "3 Accents - Per SqFt Of Accent Area", value: "3 Accents - Per SqFt Of Accent Area" },
    { label: "4 Accents - Per SqFt Of Accent Area", value: "4 Accents - Per SqFt Of Accent Area" },
]

export { 
    User, 
    NewClient,
    Contact,
    Part,
    email,
    FieldInfo,
    TileProgram,
    WoodProgram,
    CarpetProgram,
    CountertopProgram,
    CabinetProgram,
    ClientInfo,
    TileFieldInfo,
    WoodFieldInfo,
    CarpetProgramInfo,
    TilePricing,
    levels,
    units,
    countertopTypes,
    countertopColors,
    edges,
    patterns
};
