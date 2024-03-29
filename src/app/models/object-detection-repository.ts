export class ObjectDetectionRepository {
  allItems: { [key: string]: string[] } = {
    iron: [
      'iron',
      'irony',
      'ferrous',
      'old nails',
      'broken tools',
      'worn-out pipes',
      'discarded appliances',
      'scrap metal',
      'rusty chains',
      'damaged car parts',
      'used screws',
      'metal brackets',
      'stove',
      'stovepipe',
      'stove pipe',
      'iron pipe',
      'metal',
    ],
    steel: [
      'scrap steel beams',
      'discarded steel cables',
      'old steel pipes',
      'worn-out steel sheets',
      'defective steel tools',
      'used steel wires',
      'damaged steel structures',
      'scrap steel containers',
      'obsolete steel equipment',
      'twisted steel bars',
      'abandoned steel frames',
      'rusty steel parts',
      'scrapped steel machinery',
      'discarded steel drums',
      'unusable steel furniture',
      'broken steel rails',
    ],
    copper: [
      'scrap copper wire',
      'discarded copper pipes',
      'used copper cables',
      'worn-out copper sheets',
      'damaged copper coils',
      'scrapped copper radiators',
      'old copper plumbing fixtures',
      'copper electrical components',
      'defective copper tools',
      'scrap copper tubing',
      'unusable copper cookware',
      'broken copper circuit boards',
      'twisted copper wires',
      'copper roofing materials',
      'scrapped copper motors',
      'discarded copper connectors',
    ],
    aluminum: [
      'scrap aluminum cans',
      'discarded aluminum foil',
      'used aluminum siding',
      'worn-out aluminum sheets',
      'damaged aluminum frames',
      'scrapped aluminum wires',
      'old aluminum window frames',
      'aluminum automotive parts',
      'defective aluminum cookware',
      'scrap aluminum tubing',
      'unusable aluminum doors',
      'broken aluminum gutters',
      'twisted aluminum wires',
      'aluminum roofing materials',
      'scrapped aluminum radiators',
      'discarded aluminum pipes',
      'fork',
      'spoon',
      'pan',
      'foil',
    ],
    tin: [
      'scrap tin cans',
      'discarded tin containers',
      'used tin-coated steel',
      'worn-out tin roofing materials',
      'damaged tin solder',
      'scrapped tin-plated items',
      'old tin food packaging',
      'tin-based alloys',
      'defective tin cookware',
      'scrap tin wiring',
      'unusable tin containers',
      'broken tin seals',
      'twisted tin wires',
      'tin-plated electronics',
      'scrapped tin signs',
      'discarded tin foil',
    ],

    tin_can: [
      'tin',
      'tin box',
      'tinbox',
      'trash',
      'bin',
      'preserves',
      'can',
      'coke',
      'cola',
      'can of cola',
      'can of fanta',
      'fanta',
      'cola',
      'tomato paste',
      'paste',
    ],

    cable: ['wire', 'socket', 'outlet', 'plug', 'jack', 'cable'],
    zink: ['zink', 'spelter'],
    lead: ['lead'],
    chrome: ['chrome', 'chrome cheetah'],

    book_magazine_newspaper: [
      'book',
      'book shop',
      'bookshop',
      'magazine',
      'journal',
      'news',
      'newspaper',
      'notebook',
      'books',
      'magazines',
      'newspapers',
      'notebooks',
      'printer paper',
      'cardboard boxes',
      'envelopes',
      'paper bags',
      'paper towels',
      'tissue paper',
      'wrapping paper',
      'paper plates',
      'paper cups',
      'paper napkins',
      'cereal boxes',
      'envelope',
      'paper',
      'towel',
      'poster',
      'folder',
      'greeting card',
    ],

    pasteBoard: [
      'pasteboard',
      'paperboard',
      'cardboard',
      'paste board',
      'paper board',
      ' card board',
      'puzzles',
      'puzzle',
      'mailer',
      'picture frame',
      'shoeboxes',
      'shoe box',
      'shoebox',
    ],

    drink: ['glass bottle', 'glass drink', 'soda'],

    mirror_window: [
      'glass',
      'mirror',
      'mirrors',
      'window',
      'windows',
      'reflector',
      'looking-glass',
      'looking glass',
    ],
    pet_carboy: [
      'water bottle',
      'water',
      'bottle',
      'carboy',
      'bottle water',
      'plastic water',
      'plastic',
      'pet',
      'pet water bottle',
      'plastic soda bottle',
      'plastic milk jug',
      'plastic juice bottle',
      'plastic sports drink bottle',
      'plastic condiment bottle',
      'plastic shampoo bottle',
      'plastic detergent bottle',
      'plastic cleaning product bottle',
      'plastic yogurt container',
      'plastic deli container',
      'plastic takeout container',
      'plastic food packaging',
      'plastic lids and caps',
      'plastic straws',
      'plastic utensil',
      'plastic bag',
      'plastic clamshell',
      'plastic blister packaging',
      'plastic hanger',
      'plastic storage bin',
      'plastic flower pot',
      'plastic toys',
      'plastic pet food container',
      'bucket',
      'Aquarius',
    ],
    nylon: ['nylon', 'plastic', 'nylon bag', 'plastic bag', 'sack', 'sack bag'],
    car_tire: [
      'tyre',
      'lastik',
      'car lastic',
      'wheel',
      'vehicle tire',
      'car tire',
      'car',
    ],
    toy: [
      'toy',
      'figure',
      'toys',
      'doll',
      'teddy bear',
      'sport',
      'dumbell',
      'dumbells',
      'action figures',
      'dolls',
      'stuffed animals',
      'board games',
      'puzzles',
      'building blocks',
      'toy cars',
      'model airplanes',
      'teddy bears',
      'educational toys',
      'art supplies',
      'play kitchen sets',
      'toy robots',
      'plush toys',
      'musical instruments for kids',
      'remote control cars',
      'tricycles',
      'bicycles',
      'skateboards',
      'video games',
      'sports equipment for kids',
      'toy tool sets',
      'outdoor play equipment',
      'pool toys',
      'sandbox toys',
    ],
    whiteGoodsCategory: [
      'washing machine',
      'dishwasher',
      'refrigerator',
      'oven',
      'microwave oven',
      'cooktop',
      'range hood',
      'freezer',
      'air conditioner',
      'clothes dryer',
      'water heater',
      'trash compactor',
      'wine cooler',
      'vacuum cleaner',
      'blender',
      'toaster',
      'coffee maker',
      'food processor',
      'juicer',
      'mixer',
      'bread maker',
      'steam iron',
      'air purifier',
      'washer',
    ],

    machineEquipment: [
      'lathe machine',
      'welding machine',
      'drill',
      'crane',
      'milling machine',
      'hydraulic press',
      'cnc router',
      'robotic arm',
      'laser cutting machine',
      'casting machine',
    ],

    chromeNickelElectronic: [
      'chrome plating machine',
      'nickel alloy material',
      'electronic circuit board',
      'stainless steel device',
      'chrome-plated accessories',
      'nickel wire',
      'electronic components',
      'magnetic sensor',
      'electronic circuit board soldering gun',
      'nickel-plated screw',
      'LED display',
      'magnetic disk',
      'chrome-plated keychain',
      'nickel-plated connector',
    ],

    computerTabletPhone: [
      `screen`,
      'laptop computer',
      'desktop computer',
      'tablet',
      'smartphone',
      'graphic design monitor',
      'keyboard and mouse set',
      'wireless headphones',
      'portable charger',
      'tablet case',
      'phone stand',
      'external hard drive',
      'bluetooth speaker',
      'camera tripod',
      'high-performance gaming computer',
      'thin and light laptop',
      'smartphone camera lens',
      'graphic tablet',
      'ultrabook',
      'smartwatch',
      'monitor',
      'keyboard',
      'mouse',
      'speaker',
      'phone',
      'telephone',
      'pc',
      'computer',
      'loudspeaker',
    ],

    smallHomeAppliances: [
      'iron',
      'blender',
      'toaster',
      'microwave oven',
      'drip coffee maker',
      'electric kettle',
      'food processor',
      'tea maker',
      'pour-over kettle',
      'hand blender',
      'bread toaster',
      'coffee grinder',
      'smart kitchen scale',
      'mini steam iron',
      'electric kettle',
      'waffle maker',
      'pour-over coffee maker',
      'mixer',
      'sandwich maker',
      'electric knife',
      'hot air fryer',
    ],

    otherElectronicAppliances: [
      'smart watch',
      'smart glasses',
      'bluetooth headphones',
      'portable charger',
      'digital camera',
      'e-reader',
      'game console',
      'smart speaker',
      'wireless headphones',
      'smart TV',
      'virtual reality headset',
      'GPS device',
      'smart home systems',
      'electric toothbrush',
      'smart thermostat',
      'entertainment system',
      'electronic kids toys',
      'smart fridge',
      'drone',
      'smart plug',
      'personal fitness tracker',
      'smart home security camera',
      'USB fan',
      'electric shaver',
      'smart smoke alarm',
      'robot vacuum',
    ],

    clothes: [
      't-shirt',
      'sweater',
      'pants',
      'shirt',
      'dress',
      'jacket',
      'blouse',
      'tracksuit',
      'skirt',
      'coat',
      'shorts',
      'shirt',
      'blazer',
      'sweatshirt',
      'socks',
      'shoes',
      'hat',
      'sunglasses',
      'wallet',
      'tank top',
      'pajama set',
      'shawl',
      'bag',
      'jeans',
      'beanie',
      'belt',
      'beach dress',
      'jacket',
      'tuxedo',
      'swimsuit',
      'sock set',
      'shirt dress',
      'sneakers',
      'leather jacket',
      'sweatpants',
      'casual dress',
      'reading glasses',
      'wrap dress',
      'sequin jacket',
      'patterned pants',
    ],

    houseware: [
      'rug',
      'curtain',
      'bedding',
      'bedspread',
      'pillowcase',
      'tablecloth',
      'blanket',
      'bedding set',
      'kitchen towel',
      'bath mat',
      'decorative pillows',
      'curtain hooks',
      'polka dot bedding set',
      'living room rug',
      'wall clock',
      'picture frame',
      'mirror',
      'vase',
      'flower pot',
      'candle holder',
      'kitchen curtain',
      'duvet',
      'duvet cover',
      'dining table cloth',
      'double bedding set',
      'wall art',
      'decorative cushions',
      'shower curtain',
      'handwoven carpet',
      'kitchen apron',
      'wall shelves',
      'framed family photo',
      'makeup table mirror',
      'laundry basket',
      'antique lamp',
      'bookshelf',
      'sofa cover',
      'decorative wall stickers',
      'electric candles',
    ],

    compositeProducts: [
      'carbon ceramic material',
      'fiber reinforced plastic',
      'glass fiber reinforced concrete',
      'carbon fiber panels',
      'wood plastic composite',
      'carbon fiber bicycle frame',
      'composite coating materials',
      'epoxy resin',
      'aramid fiber reinforced materials',
      'carbon fiber sports equipment',
      'composite marine materials',
      'polymer matrix composite materials',
      'carbon fiber automotive parts',
      'laminate glass fiber reinforced plastic',
      'metal matrix composite materials',
      'structural composite panels',
      'composite reinforcement systems',
      'carbon fiber drone bodies',
      'high-performance composite materials',
      'composite construction materials',
      'carbon fiber plumbing pipes',
      'vehicle interior composite materials',
      'aircraft composite parts',
      'carbon fiber yacht materials',
      'composite sports equipment',
      'laminate carbon-fiber reinforced materials',
      'thermoplastic composite materials',
    ],

    powerSources: [
      'electric generator',
      'uninterruptible power supply (UPS)',
      'battery pack',
      'solar power charger',
      'battery',
      'power cable',
      'energy storage systems',
      'backup battery',
      'inverter',
      'power bank',
      'hydrogen fuel cell',
      'generator fuel (gasoline, diesel, natural gas)',
      'solar cell panel',
      'electric outlet',
      'voltage regulator',
      'power switch',
      'power adapter',
      'electric vehicle charger',
      'power distribution box',
      'underground power cable',
      'wind turbine generator',
      'power station',
      'portable power inverter',
      'electric meter',
      'power transformer',
      'power-saving outlet',
      'circuit breaker',
      'power control panel',
      'electric meters',
      'power management system',
    ],
    woodDust: ['wood dust', 'dust'],

    palette: [
      'palette',
      'pallet',
      'pallete',
      'crate',
      'casing',
      'case',
      'wooden case',
    ],
    wardrobeAndDresserItems: [
      'wardrobe',
      'cabinet',
      'dresser',
      'closet',
      'bedroom wardrobe',
      'kitchen cabinet',
      'drawer cabinet',
      'double-door cabinet',
      'single-door cabinet',
      'kids room wardrobe',
      'hallway cabinet',
      'clothes rack',
      'shoe rack',
      'console',
      'display cabinet',
      'nightstand',
      'chest of drawers',
      'TV stand',
      'bookshelf',
      'bathroom cabinet',
      'baby cabinet',
      'work desk',
      'computer desk',
      'vanity',
      'dressing table',
      'dining chair',
      'sofa',
      'couch',
      'bed',
      'coffee table',
      'bookcase',
      'shelving unit',
      'wooden cabinet',
      'metal cabinet',
      'plastic cabinet',
    ],

    woodenHomeItems: [
      'dining table',
      'table',
      'chair',
      'cabinet',
      'bed frame',
      'coffee table',
      'bookshelf',
      'TV stand',
      'shelf',
      'frame',
      'table lamp',
      'kitchen table',
      'kitchen chair',
      'stool',
      'side table',
      'tablecloth',
      'nightstand',
      'headboard',
      'wardrobe',
      'mirror frame',
      'wall shelf',
      'chandelier',
      'floor lamp',
      'pot lids',
      'plates',
      'bowls',
      'cutting board',
      'cutlery set',
      'teapot',
      'laundry basket',
      'toy box',
      'baby crib',
      'desk',
      'filing cabinet',
      'bar stool',
      'end table',
      'dresser',
      'vanity',
      'coat rack',
      'hanging shelves',
      'plant stand',
      'picture frame',
      'utensils',
      'tray',
      'hangers',
      'clock',
      'bench',
      'sofa',
      'hutch',
      'sideboard',
      'wine rack',
      'coasters',
      'studio couch',
      'day bed',
    ],

    organicWasteItems: [
      'fruit peels',
      'vegetable scraps',
      'coffee grounds',
      'tea leaves',
      'food waste',
      'garden waste',
      'leaves',
      'branches',
      'plant waste',
      'food leftovers',
      'bread crumbs',
      'eggshells',
      'grass clippings',
      'organic materials',
      'organic fertilizer',
      'paper towels',
      'napkins',
      'vegetable oils',
      'food scraps',
      'non-dairy whey',
      'organic waste bag',
      'liquid food waste',
      'fresh fruits and vegetables',
      'raw vegetables',
      'whey',
      'home compost',
      'organic recycling',
      'tea leaf remnants',
      'potato peels',
      'citrus peels',
      'natural fiber cloths',
      'dairy-free beverage remnants',
      'organic detergent remnants',
      'coffee filter',
      'eggshells',
      'honey remnants',
      'charcoal-free molasses remnants',
      'peanut shell',
      'cumin husks',
    ],
  };

  getAllItemsObjectDetectionRep() {
    return this.allItems;
  }
}
