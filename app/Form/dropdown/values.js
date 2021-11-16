let territories = [
    { label: "Austin", value: "Austin" },
    { label: "Dallas", value: "Dallas" },
    { label: "Houston", value: "Houston" },
    { label: "San Antonio", value: "San Antonio" }
];

let states = [
    { label:"TX", value:"TX" },
    { label:"AL", value:"AL" },
    { label:"AK", value:"AK" },
    { label:"AZ", value:"AZ" },
    { label:"AR", value:"AR" },
    { label:"CA", value:"CA" },
    { label:"CO", value:"CO" },
    { label:"CT", value:"CT" },
    { label:"DE", value:"DE" },
    { label:"FL", value:"FL" },
    { label:"GA", value:"GA" },
    { label:"HI", value:"HI" },
    { label:"ID", value:"ID" },
    { label:"IL", value:"IL" },
    { label:"IN", value:"IN" },
    { label:"IA", value:"IA" },
    { label:"KS", value:"KS" },
    { label:"KY", value:"KY" },
    { label:"LA", value:"LA" },
    { label:"ME", value:"ME" },
    { label:"MD", value:"MD" },
    { label:"MA", value:"MA" },
    { label:"MI", value:"MI" },
    { label:"MN", value:"MN" },
    { label:"MS", value:"MS" },
    { label:"MO", value:"MO" },
    { label:"MT", value:"MT" },
    { label:"NE", value:"NE" },
    { label:"NV", value:"NV" },
    { label:"NH", value:"NH" },
    { label:"NJ", value:"NJ" },
    { label:"NM", value:"NM" },
    { label:"NY", value:"NY" },
    { label:"NC", value:"NC" },
    { label:"ND", value:"ND" },
    { label:"OH", value:"OH" },
    { label:"OK", value:"OK" },
    { label:"OR", value:"OR" },
    { label:"PA", value:"PA" },
    { label:"RI", value:"RI" },
    { label:"SC", value:"SC" },
    { label:"SD", value:"SD" },
    { label:"TN", value:"TN" },
    { label:"TX", value:"TX" },
    { label:"UT", value:"UT" },
    { label:"VT", value:"VT" },
    { label:"VA", value:"VA" },
    { label:"WA", value:"WA" },
    { label:"WV", value:"WV" },
    { label:"WI", value:"WI" },
    { label:"WY", value:"WY" },
];

let yesOrNo = [
    { label: "", value: null },
    { label: "Yes", value: 1 },
    { label: "No", value: 0 }
];

let paymentFrequency = [
    { label: "", value: null },
    { label: "Weekly", value: "Weekly" },
    { label: "Bi-Weekly (Twice a Month)", value: "Bi-Weekly" }
];

let paymentType = [
    { label: "", value: null },
    { label: "Credit-Card", value: "Credit-Card" },
    { label: "Direct Deposit", value: "Direct Deposit" },
    { label: "Check", value: "Check" }
];

let jobReleaseChoices = [
    { label: "", value: null },
    { label: "Email", value: "Email" },
    { label: "Vendor Portal", value: "Vendor Portal" },
];  

let units = [
    { label: "SqFt", value: "SqFt" },
    { label: "Each", value: "Ea" },
    { label: "Linear Ft", value: "Linear Ft" },
    { label: "SqYd", value: "SqYd" },
    { label: "Bag", value: "Bag"}
];

let levels = [
    { label: "BASE", value: "BASE"},
    { label: "0", value: "0" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" },
    { label: "21", value: "21" },
    { label: "22", value: "22" },
    { label: "23", value: "23" },
    { label: "24", value: "24" },
    { label: "25", value: "25" },
];

let cabinets = {
    bidTypes: [
        { label: "Whole House", value: "Whole House" },
        { label: "Specific Rooms", value: "Specific Rooms" },
    ]
};

let carpet = {
    carpetPad: [
        { label: "Mohawk", value: "Mohawk" },
        { label: "Other", value: "Other" },
    ],
    takeoffResp: [
        { label: "Builder", value: "Builder" },
        { label: "MC Surfaces", value: "MC Surfaces" },
    ]
};

let countertops = {
    materialThickness: [
        { label: "3cm", value: "3cm" },
        { label: "2cm", value: "2cm" },
        { label: "1.6cm", value: "1.6cm" },
        { label: "1.2cm", value: "1.2cm" },
        { label: "Both", value: "Both" },
        { label: "Other", value: "Other" },
    ],
    edges: [
        { label: "Straight/Square", value: "Straight/Square" },
        { label: "Bullnose", value: "Bullnose" },
        { label: "Ogee", value: "Ogee" },
        { label: "Waterfall", value: "Waterfall" },
    ],
    standardOrOption: [
        { label: "Standard", value: "Standard" },
        { label: "Option", value: "Option" },
    ],
    takeoffResp: [
        { label: "Builder", value: "Builder" },
        { label: "MC Surfaces", value: "MC Surfaces" },
    ]
};

let wood = {
    glueProducts: [
        { label: "Mapei Ultra Bond 980", value: "Mapei Ultra Bond 980" },
        { label: "Other", value: "Other" },
    ],
    stainOrPrimed: [
        { label: "Pre-Primed", value: "Pre-Primed" },
        { label: "MC Surfaces Stain", value: "MC Surfaces Stain" },
    ],
    subfloorConstruction: [
        { label: "None", value: "None" },
        { label: "Hardiebacker for Wood", value: "Hardiebacker for Wood" },
    ]
};

let tile = {
    settingMaterial: [
        { label: "No Preference", value: "No Preference" },
        { label: "Custom", value: "Custom" },
        { label: "Mapei", value: "Mapei" },
        { label: "Texrite", value: "Texrite" },
    ],
    waterproofMethod: [
        { label: "Fiberglass", value: "Fiberglass" },
        { label: "Plumber Provided Rubber Liner", value: "Plumber Provided Rubber Liner" },
        { label: "Membrane (Waterstop Only)", value: "Membrane (Waterstop Only)" },
        { label: "Kerdi", value: "Kerdi" },
        { label: "Hardie", value: "Hardie" },
        { label: "Waterstop", value: "Waterstop" },
    ],
    showerFloorWaterproof: [
        { label: "Fiberglass", value: "Fiberglass" },
        { label: "Plumber Provided Rubber Liner", value: "Plumber Provided Rubber Liner" },
        { label: "Membrane (Waterstop Only)", value: "Membrane (Waterstop Only)" },
        { label: "Kerdi", value: "Kerdi" },
        { label: "Hardie", value: "Hardie" },
        { label: "Waterstop", value: "Waterstop" },
        { label: "Quickrete", value: "Quickrete" },
    ],
    punchOutMaterial: [
        { label: "No Preference", value: "Fiberglass" },
        { label: "Siliconized Grout Match", value: "Siliconized Grout Match" },
    ],
    showerNiche: [
        { label: "Preformed/Molded", value: "Preformed/Molded" },
        { label: "Framed w/ Waterproofing", value: "Framed w/ Waterproofing" },
    ],
    showerNicheFraming: [
        { label: "MC Surfaces (chargeable)", value: "MC Surfaces (chargeable)" },
        { label: "MC Surfaces (not chargeable)", value: "MC Surfaces (not chargeable)" },
        { label: "Builder", value: "Builder" },
    ],
    cornerSoapDishes: [
        { label: "Standard w/o Niche", value: "Standard w/o Niche" },
        { label: "Standard w/ Niche (extra charge)", value: "Standard w/ Niche (extra charge)" },
        { label: "Builder", value: "Builder" },
    ],
    showerSeat: [
        { label: "MC Surfaces (cinderblock)", value: "MC Surfaces (cinderblock)" },
        { label: "MC Surfaces (other)", value: "MC Surfaces (other)" },
        { label: "Builder", value: "Builder" },
    ],
    metalEdge: [
        { label: "Standard", value: "Standard" },
        { label: "Optional", value: "Optional" },
    ],
    groutJointSize: [
        { label: "3/16\"", value: "3/16\"" },
        { label: "1/8\"", value: "1/8\"" },
    ],
    groutBrand: [
        { label: "No Preference", value: "No Preference" },
        { label: "Custom", value: "Custom" },
        { label: "Mapei", value: "Mapei" },
        { label: "Texrite", value: "Texrite" },
    ],
    subfloorPractice: [
        { label: "1/4\" Hardie", value: "1/4\" Hardie" },
        { label: "Ditra", value: "Ditra" },
        { label: "Mudbuild", value: "Mudbuild" },
        { label: "Mapeguard", value: "Mapeguard" },
    ],
    takeoffResp: [
        { label: "Builder", value: "Builder" },
        { label: "MC Surfaces", value: "MC Surfaces" },
    ]
};

export {
    cabinets,
    carpet,
    countertops,
    jobReleaseChoices,
    levels,
    paymentFrequency,
    paymentType,
    states,
    territories,
    tile,
    units,
    wood,
    yesOrNo,
};