const permissions = [

    'create role',
    'view any role',
    'view role',
    'update role',
    'remove role',

    'create user',
    'view any user',
    'view user',
    'update user',
    'remove user',

    'create ingredients',
    'view any ingredients',
    'view ingredients',
    'update ingredients',
    'remove ingredients',

    'create machinery',
    'view any machinery',
    'view machinery',
    'update machinery',
    'remove machinery',

    'create product',
    'view any product',
    'view product',
    'update product',
    'remove product',

    'create category',
    'view any category',
    'view category',
    'update category',
    'remove category',

    'create store',
    'view any store',
    'view store',
    'update store',
    'remove store',

    'create price',
    'view any price',
    'view price',
    'update price',
    'remove price',

    'create team',
    'view any team',
    'view team',
    'update team',
    'remove team',

]

const roles = {

    admin: [...permissions],

    user: [

        'view any ingredients',
        'view ingredients',

        'view any machinery',
        'view machinery',

        'view any product',
        'view product',

        'view any category',
        'view category',

        'view any store',
        'view store',

        'view any price',
        'view price',
    ],

    data_encoder: [

        'view any ingredients',
        'view ingredients',

        'view any machinery',
        'view machinery',

        'view any product',
        'view product',

        'view any category',
        'view category',

        'view any store',
        'view store',

        'create price',
        'view any price',
        'view price',
        'update price',
        'remove price',
    ],

    farmer: [

        'view any ingredients',
        'view ingredients',

        'view any machinery',
        'view machinery',

        'view any product',
        'view product',

        'view any category',
        'view category',

        'create store',
        'view store',
        'update store',
        'remove store',

        'view any price',
        'view price',

        'create team',
        'view any team',
        'view team',
        'update team',
        'remove team',
    ],

    product_trader: [

        'view any ingredients',
        'view ingredients',

        'view any machinery',
        'view machinery',

        'view any product',
        'view product',

        'view any category',
        'view category',

        'create store',
        'view store',
        'update store',
        'remove store',

        'view any price',
        'view price',
    ],

    tool_trader: [

        'view any ingredients',
        'view ingredients',

        'view any machinery',
        'view machinery',

        'view any product',
        'view product',

        'view any category',
        'view category',

        'create store',
        'view store',
        'update store',
        'remove store',

        'view any price',
        'view price',
    ],

    accessory_trader: [

        'view any ingredients',
        'view ingredients',

        'view any machinery',
        'view machinery',

        'view any product',
        'view product',

        'view any category',
        'view category',

        'create store',
        'view store',
        'update store',
        'remove store',

        'view any price',
        'view price',
    ]

}

const users = [{
        name: 'admin',
        password: 'superuser',
        roles: ['admin'],
        phone_no: +251900000000,
        location: {
            coordinates: [38.291473, 8.988429]
        }

    },
    {
        name: 'encoder',
        password: 'encoderuser',
        roles: ['data_encoder'],
        phone_no: +251911111111,
        location: {
            coordinates: [38.591473, 8.988429]
        }

    },
    {
        name: 'farmer',
        password: 'farmeruser',
        roles: ['farmer'],
        phone_no: +251922222222,
        location: {
            coordinates: [38.491473, 8.988429]
        }

    },
    {
        name: 'accessorytrader',
        password: 'accessorytraderuser',
        roles: ['accessory_trader'],
        phone_no: +251933333333,
        location: {
            coordinates: [38.701473, 8.988429]
        }

    },
    {
        name: 'producttrader',
        password: 'producttraderuser',
        roles: ['product_trader'],
        phone_no: +251944444444,
        location: {
            coordinates: [38.691473, 8.988429]
        }

    },
    {
        name: 'tooltrader',
        password: 'tooltraderuser',
        roles: ['tool_trader'],
        phone_no: +251955555555,
        location: {
            coordinates: [38.781473, 8.988429]
        }

    },
    {
        name: 'user',
        password: 'justuser',
        roles: ['user'],
        phone_no: +251966666666,
        location: {
            coordinates: [38.791473, 8.988429]
        }

    },

]

const machineries = [{
        name: "tractor"
    },
    {
        name: 'mewqiya'
    },
    {
        name: "mekesikesha"
    },
    {
        name: 'maresha'
    },
    {
        name: "megolgoya"
    },
    {
        name: 'mezriya'
    },
    {
        name: "chemical mercha"
    },
    {
        name: 'mebuatecha'
    }
]

const categories = [{
        name: 'fruits',
        type: 'product'
    },
    {
        name: 'ceral',
        type: 'product'
    },
    {
        name: 'ye qibat ehil',
        type: 'product'
    },
    {
        name: 'vegitable',
        type: 'product'
    },
    {
        name: 'qimema qimem',
        type: 'product'
    },
    {
        name: 'ye ageda sebiloch',
        type: 'product'
    },
    {
        name: 'aneqaqi tekiloch',
        type: 'product'
    },
    {
        name: 'ye qum ensisa',
        type: 'product'
    },
    {
        name: 'doro',
        type: 'product'
    },
    {
        name: 'asa',
        type: 'product'
    },
    {
        name: 'diary products',
        type: 'product'
    },
    {
        name: 'ye den wutet',
        type: 'product'
    },
    {
        name: 'flower',
        type: 'product'
    },
    {
        name: 'mar',
        type: 'product'
    },
    {
        name: 'feritlizer',
        type: 'ingredient'
    },
    {
        name: 'mirt zer',
        type: 'ingredient'
    },
    {
        name: 'meno',
        type: 'ingredient'
    },
    {
        name: 'qefo',
        type: 'ingredient'
    }
]

const farming_ingredient = [{
        name: "Yuriya",
        category: ['feritlizer']
    },
    {
        name: "Dap",
        category: ['feritlizer']
    },
    {
        name: "Nitrogen",
        category: ['ferilizer']
    },
    {
        name: "Phosphic",
        category: ['feritlizer']
    },
    {
        name: "Potassium",
        category: ['feritlizer']
    },
    {
        name: "Natural",
        category: ['feritlizer']
    },
    {
        name: "ye atkilt",
        category: ['mirt zer']
    },
    {
        name: "ye beqolo",
        category: ['mirt zer']
    },
    {
        name: "ye qimema qimem",
        category: ['mirt zer']
    },
    {
        name: 'ye ensisat meno',
        category: ['meno']
    },
    {
        name: 'zemenawi qefo',
        category: ['qefo']
    }
]

const products = [{
        name: "Orange",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Banana",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Avocado",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Papaya",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Mango",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Lemon",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Watermelon",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Apple",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Jack fruit",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Wine",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Cock",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Zotin",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Prim",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Strawberry",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Gishta",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Roman",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Tiringo",

        category: 'fruits',
        weather: ['winter']
    },
    {
        name: "Baqela",
        category: 'ceral',
        weather: ['summer']
    },
    {
        name: "Ater",
        category: 'ceral',
        weather: ['summer']
    },
    {
        name: "Akuri ater",
        category: 'ceral',
        weather: ['summer']
    },
    {
        name: "Shimbira",
        category: 'ceral',
        weather: ['summer']
    },
    {
        name: "Misir",
        category: 'ceral',
        weather: ['summer']
    },
    {
        name: "Guaya",
        category: 'ceral',
        weather: ['summer']
    },
    {
        name: "Pinto bean",
        category: 'ceral',
        weather: ['summer']
    },
    {
        name: "Pijon bean",
        category: 'ceral',
        weather: ['summer']
    },
    {
        name: "Boloqe",
        category: 'ceral',
        weather: ['summer']
    },
    {
        name: "Gibto",
        category: 'ceral',
        weather: ['summer']
    },
    {
        name: "Masho",
        category: 'ceral',
        weather: ['summer']
    },
    {
        name: "Selit",
        category: 'ye qibat ehil',
        weather: ['authumn']
    },
    {
        name: "Nug",
        category: 'ye qibat ehil',
        weather: ['authumn']
    },
    {
        name: "Telba",
        category: 'ye qibat ehil',
        weather: ['authumn']
    },
    {
        name: "Lewz",
        category: 'ye qibat ehil',
        weather: ['authumn']
    },
    {
        name: "Suf",
        category: 'ye qibat ehil',
        weather: ['authumn']
    },
    {
        name: "Gomenzer",
        category: 'ye qibat ehil',
        weather: ['authumn']
    },
    {
        name: "Ye duba fre",
        category: 'ye qibat ehil',
        weather: ['authumn']
    },
    {
        name: "Ye gulo fre",
        category: 'ye qibat ehil',
        weather: ['authumn']
    },
    {
        name: "Potato",
        category: 'vegitable',
        weather: ['spring']
    },
    {
        name: "Tomato",
        category: 'vegitable',
        weather: ['spring']
    },
    {
        name: "Onion",
        category: 'vegitable',
        weather: ['spring']
    },
    {
        name: "Garlic",
        category: 'vegitable',
        weather: ['spring']
    },
    {
        name: "Cabbage",
        category: 'vegitable',
        weather: ['spring']
    },
    {
        name: "Carrot",
        category: 'vegitable',
        weather: ['spring']
    },
    {
        name: "Qey sir",
        category: 'vegitable',
        weather: ['spring']
    },
    {
        name: "Mushroom",
        category: 'vegitable',
        weather: ['spring']
    },
    {
        name: "Qosta",
        category: 'vegitable',
        weather: ['spring']
    },
    {
        name: "Salad",
        category: 'vegitable',
        weather: ['spring']
    },
    {
        name: "Pepper",
        category: 'vegitable',
        weather: ['spring']
    },
    {
        name: "Berbere",
        category: 'qimema qimem'
    },
    {
        name: "Zinjibil",
        category: 'qimema qimem'
    },
    {
        name: "Erid",
        category: 'qimema qimem'
    },
    {
        name: "Tikur azmud",
        category: 'qimema qimem'
    },
    {
        name: "Korerima",
        category: 'qimema qimem'
    },
    {
        name: "Abish",
        category: 'qimema qimem'
    },
    {
        name: "Dimbilal",
        category: 'qimema qimem'
    },
    {
        name: "Beqolo",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Teff",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Gebs",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Aja",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Sinde",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Dagusa",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Rice",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Cotton",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Qacha",
        category: 'ye ageda sebiloch'
    },
    {
        name: "Coffee",
        category: 'aneqaqi tekiloch'
    },
    {
        name: "Tea",
        category: 'aneqaqi tekiloch'
    },
    {
        name: "Chat",
        category: 'aneqaqi tekiloch'
    },
    {
        name: "Tobacco",
        category: 'aneqaqi tekiloch'
    },
    {
        name: "Goat",
        category: 'ye qum ensisa'
    },
    {
        name: "Sheep",
        category: 'ye qum ensisa'
    },
    {
        name: "Ox",
        category: 'ye qum ensisa'
    },
    {
        name: "Cow",
        category: 'ye qum ensisa'
    },
    {
        name: "Camel",
        category: 'ye qum ensisa'
    },
    {
        name: "Pig",
        category: 'ye qum ensisa'
    },
    {
        name: "Horse",
        category: 'ye qum ensisa'
    },
    {
        name: "Donkey",
        category: 'ye qum ensisa'
    },
    {
        name: "Mule",
        category: 'ye qum ensisa'
    },
    {
        name: "Set doro",
        category: 'doro'
    },
    {
        name: "Awra doro",
        category: 'doro'
    },
    {
        name: "Asa",
        category: 'asa'
    },
    {
        name: "Milk",
        category: 'diary products'
    },
    {
        name: "Butter",
        category: 'diary products'
    },
    {
        name: "Yoghurt",
        category: 'diary products'
    },
    {
        name: "Aguat",
        category: 'diary products'
    },
    {
        name: "Cheese",
        category: 'diary products'
    },
    {
        name: "Quami",
        category: 'ye den wutet'
    },
    {
        name: "Weraj",
        category: 'ye den wutet'
    },
    {
        name: "Mager",
        category: 'ye den wutet'
    },
    {
        name: "Qerkeha",
        category: 'ye den wutet'
    },
    {
        name: "Rose",
        category: 'flower'
    },
    {
        name: "Hareg",
        category: 'flower'
    },
    {
        name: "Amrilix",
        category: 'flower'
    },
    {
        name: "Tulips",
        category: 'flower'
    },
    {
        name: "Kosame",
        category: 'flower'
    },
    {
        name: "Welela",
        category: 'mar'
    },
    {
        name: "Sefef",
        category: 'mar'
    },
    {
        name: "Sem",
        category: 'mar'
    },

]

module.exports = {
    permissions,
    roles,
    users,
    machineries,
    categories,
    farming_ingredient,
    products
}