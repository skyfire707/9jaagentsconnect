// Nigeria Complete Location Database
// All 36 States + FCT with cities and towns

const NigeriaLocations = {
    // Federal Capital Territory
    "fct": {
        name: "Federal Capital Territory",\        capital: "Abuja",
        cities: [
            { name: "Abuja", lat: 9.0765, lng: 7.3986, type: "capital" },
            { name: "Gwagwalada", lat: 8.9414, lng: 7.0917, type: "city" },
            { name: "Kuje", lat: 8.8833, lng: 7.2333, type: "city" },
            { name: "Bwari", lat: 9.2833, lng: 7.3833, type: "city" },
            { name: "Abaji", lat: 8.4667, lng: 6.9333, type: "town" },
            { name: "Kwali", lat: 8.6167, lng: 7.4333, type: "town" }
        ]
    },

    // South-West States
    "lagos": {
        name: "Lagos",
        capital: "Ikeja",
        cities: [
            { name: "Lagos Island", lat: 6.4549, lng: 3.4246, type: "city" },
            { name: "Ikeja", lat: 6.6018, lng: 3.3515, type: "capital" },
            { name: "Victoria Island", lat: 6.4281, lng: 3.4215, type: "city" },
            { name: "Lekki", lat: 6.4698, lng: 3.5852, type: "city" },
            { name: "Ikoyi", lat: 6.4500, lng: 3.4333, type: "city" },
            { name: "Yaba", lat: 6.5167, lng: 3.3833, type: "city" },
            { name: "Surulere", lat: 6.5000, lng: 3.3500, type: "city" },
            { name: "Ikorodu", lat: 6.6185, lng: 3.5076, type: "city" },
            { name: "Epe", lat: 6.5842, lng: 3.9834, type: "town" },
            { name: "Badagry", lat: 6.4167, lng: 2.8833, type: "town" },
            { name: "Ojo", lat: 6.4667, lng: 3.1833, type: "city" },
            { name: "Amuwo-Odofin", lat: 6.4333, lng: 3.3000, type: "city" },
            { name: "Apapa", lat: 6.4486, lng: 3.3592, type: "city" },
            { name: "Agege", lat: 6.6167, lng: 3.3333, type: "city" },
            { name: "Alimosho", lat: 6.6667, lng: 3.3000, type: "city" },
            { name: "Ifako-Ijaiye", lat: 6.6833, lng: 3.3333, type: "city" },
            { name: "Kosofe", lat: 6.6000, lng: 3.4000, type: "city" },
            { name: "Mushin", lat: 6.5333, lng: 3.3500, type: "city" },
            { name: "Oshodi-Isolo", lat: 6.5500, lng: 3.3500, type: "city" },
            { name: "Shomolu", lat: 6.5333, lng: 3.4000, type: "city" }
        ]
    },

    "ogun": {
        name: "Ogun",
        capital: "Abeokuta",
        cities: [
            { name: "Abeokuta", lat: 7.1608, lng: 3.3484, type: "capital" },
            { name: "Ijebu-Ode", lat: 6.8208, lng: 3.9208, type: "city" },
            { name: "Sagamu", lat: 6.8333, lng: 3.5667, type: "city" },
            { name: "Ilaro", lat: 6.8833, lng: 3.0167, type: "town" },
            { name: "Ota", lat: 6.7000, lng: 3.2333, type: "city" },
            { name: "Aiyetoro", lat: 6.6167, lng: 2.9333, type: "town" },
            { name: "Agbara", lat: 6.5667, lng: 3.0833, type: "town" },
            { name: "Ifo", lat: 6.8167, lng: 3.2000, type: "town" },
            { name: "Obafemi-Owode", lat: 7.0333, lng: 3.3500, type: "town" },
            { name: "Ijebu-Igbo", lat: 6.9833, lng: 3.9167, type: "town" },
            { name: "Ipokia", lat: 6.5333, lng: 2.7333, type: "town" },
            { name: "Yewa", lat: 7.0833, lng: 3.0000, type: "town" }
        ]
    },

    "oyo": {
        name: "Oyo",
        capital: "Ibadan",
        cities: [
            { name: "Ibadan", lat: 7.3775, lng: 3.9470, type: "capital" },
            { name: "Ogbomoso", lat: 8.1333, lng: 4.2500, type: "city" },
            { name: "Oyo", lat: 7.8500, lng: 3.9333, type: "city" },
            { name: "Saki", lat: 8.6667, lng: 3.3833, type: "town" },
            { name: "Iseyin", lat: 7.9667, lng: 3.6000, type: "town" },
            { name: "Eruwa", lat: 7.5333, lng: 3.4167, type: "town" },
            { name: "Kisi", lat: 9.0833, lng: 3.8500, type: "town" },
            { name: "Igbo-Ora", lat: 7.4333, lng: 3.2833, type: "town" },
            { name: "Lanlate", lat: 7.9167, lng: 3.5167, type: "town" },
            { name: "Igbeti", lat: 8.7500, lng: 3.4167, type: "town" },
            { name: "Sepeteri", lat: 8.8833, lng: 3.5167, type: "town" }
        ]
    },

    "osun": {
        name: "Osun",
        capital: "Osogbo",
        cities: [
            { name: "Osogbo", lat: 7.7711, lng: 4.5570, type: "capital" },
            { name: "Ile-Ife", lat: 7.4824, lng: 4.5603, type: "city" },
            { name: "Ilesa", lat: 7.6333, lng: 4.7500, type: "city" },
            { name: "Ede", lat: 7.7333, lng: 4.4333, type: "town" },
            { name: "Ikire", lat: 7.3667, lng: 4.3333, type: "town" },
            { name: "Iwo", lat: 7.6333, lng: 4.1833, type: "town" },
            { name: "Ejigbo", lat: 7.9000, lng: 4.3167, type: "town" },
            { name: "Gbongan", lat: 7.4667, lng: 4.3500, type: "town" },
            { name: "Ikirun", lat: 7.7833, lng: 4.6667, type: "town" },
            { name: "Ilobu", lat: 7.8333, lng: 4.6333, type: "town" },
            { name: "Okuku", lat: 7.7167, lng: 4.8667, type: "town" }
        ]
    },

    "ondo": {
        name: "Ondo",
        capital: "Akure",
        cities: [
            { name: "Akure", lat: 7.2507, lng: 5.2000, type: "capital" },
            { name: "Ondo City", lat: 7.1000, lng: 4.8333, type: "city" },
            { name: "Owo", lat: 7.2000, lng: 5.5833, type: "city" },
            { name: "Ikare", lat: 7.5167, lng: 5.7500, type: "city" },
            { name: "Okitipupa", lat: 6.5000, lng: 4.7833, type: "town" },
            { name: "Idanre", lat: 7.1167, lng: 5.1167, type: "town" },
            { name: "Irele", lat: 6.0833, lng: 4.8667, type: "town" },
            { name: "Igbokoda", lat: 6.3500, lng: 4.8333, type: "town" },
            { name: "Ilaje", lat: 6.2667, lng: 4.7667, type: "town" },
            { name: "Ese-Odo", lat: 6.0833, lng: 4.8000, type: "town" }
        ]
    },

    "ekiti": {
        name: "Ekiti",
        capital: "Ado-Ekiti",
        cities: [
            { name: "Ado-Ekiti", lat: 7.6129, lng: 5.2476, type: "capital" },
            { name: "Ikere", lat: 7.5000, lng: 5.2333, type: "city" },
            { name: "Oye", lat: 7.8000, lng: 5.3333, type: "town" },
            { name: "Ikole", lat: 7.7833, lng: 5.5167, type: "town" },
            { name: "Emure", lat: 7.4333, lng: 5.5333, type: "town" },
            { name: "Ise", lat: 7.4500, lng: 5.4167, type: "town" },
            { name: "Aramoko", lat: 7.7000, lng: 5.0500, type: "town" },
            { name: "Ilawe", lat: 7.6000, lng: 5.1000, type: "town" },
            { name: "Omuo", lat: 7.7667, lng: 5.7167, type: "town" }
        ]
    },

    // South-East States
    "anambra": {
        name: "Anambra",
        capital: "Awka",
        cities: [
            { name: "Awka", lat: 6.2124, lng: 7.0721, type: "capital" },
            { name: "Onitsha", lat: 6.1667, lng: 6.7833, type: "city" },
            { name: "Nnewi", lat: 6.0167, lng: 6.9167, type: "city" },
            { name: "Ekwulobia", lat: 6.0333, lng: 7.0833, type: "town" },
            { name: "Agulu", lat: 6.1167, lng: 7.0000, type: "town" },
            { name: "Ihiala", lat: 5.8500, lng: 6.8667, type: "town" },
            { name: "Ogbaru", lat: 6.1500, lng: 6.7000, type: "town" },
            { name: "Njikoka", lat: 6.1833, lng: 7.0167, type: "town" },
            { name: "Orumba", lat: 6.0833, lng: 7.2333, type: "town" },
            { name: "Oyi", lat: 6.2000, lng: 6.8500, type: "town" }
        ]
    },

    "enugu": {
        name: "Enugu",
        capital: "Enugu",
        cities: [
            { name: "Enugu", lat: 6.5244, lng: 7.5186, type: "capital" },
            { name: "Nsukka", lat: 6.8562, lng: 7.3958, type: "city" },
            { name: "Agbani", lat: 6.3000, lng: 7.5500, type: "town" },
            { name: "Awgu", lat: 6.0667, lng: 7.2667, type: "town" },
            { name: "Udi", lat: 6.8333, lng: 7.4167, type: "town" },
            { name: "Oji River", lat: 6.2500, lng: 7.2667, type: "town" },
            { name: "Ngwo", lat: 6.4667, lng: 7.4667, type: "town" },
            { name: "Ezeagu", lat: 6.6500, lng: 7.3500, type: "town" },
            { name: "Igbo-Etiti", lat: 6.6667, lng: 7.4500, type: "town" },
            { name: "Nkanu", lat: 6.4333, lng: 7.5667, type: "town" }
        ]
    },

    "imo": {
        name: "Imo",
        capital: "Owerri",
        cities: [
            { name: "Owerri", lat: 5.4836, lng: 7.0333, type: "capital" },
            { name: "Orlu", lat: 5.7833, lng: 7.0333, type: "city" },
            { name: "Okigwe", lat: 5.8333, lng: 7.3500, type: "city" },
            { name: "Mbaise", lat: 5.5167, lng: 7.0167, type: "town" },
            { name: "Mbano", lat: 5.6667, lng: 7.1000, type: "town" },
            { name: "Ehime", lat: 5.5833, lng: 7.3167, type: "town" },
            { name: "Ihitte/Uboma", lat: 5.8333, lng: 7.3000, type: "town" },
            { name: "Nkwerre", lat: 5.7500, lng: 7.1000, type: "town" },
            { name: "Ngor-Okpala", lat: 5.4167, lng: 7.1500, type: "town" },
            { name: "Obowo", lat: 5.5833, lng: 7.4167, type: "town" }
        ]
    },

    "abia": {
        name: "Abia",
        capital: "Umuahia",
        cities: [
            { name: "Umuahia", lat: 5.5249, lng: 7.4946, type: "capital" },
            { name: "Aba", lat: 5.1066, lng: 7.3667, type: "city" },
            { name: "Ohafia", lat: 5.6167, lng: 7.8333, type: "town" },
            { name: "Arochukwu", lat: 5.3833, lng: 7.9167, type: "town" },
            { name: "Bende", lat: 5.5667, lng: 7.6333, type: "town" },
            { name: "Ikwuano", lat: 5.4167, lng: 7.5667, type: "town" },
            { name: "Isiala-Ngwa", lat: 5.3833, lng: 7.5000, type: "town" },
            { name: "Isuikwuato", lat: 5.5333, lng: 7.4833, type: "town" },
            { name: "Obingwa", lat: 5.1500, lng: 7.4167, type: "town" },
            { name: "Osisioma", lat: 5.1667, lng: 7.3000, type: "town" }
        ]
    },

    "ebonyi": {
        name: "Ebonyi",
        capital: "Abakaliki",
        cities: [
            { name: "Abakaliki", lat: 6.3249, lng: 8.1137, type: "capital" },
            { name: "Afikpo", lat: 5.8833, lng: 7.9333, type: "city" },
            { name: "Onueke", lat: 6.2500, lng: 8.0167, type: "town" },
            { name: "Ishielu", lat: 6.4333, lng: 7.8333, type: "town" },
            { name: "Izzi", lat: 6.4667, lng: 8.4167, type: "town" },
            { name: "Ezza", lat: 6.2500, lng: 8.0833, type: "town" },
            { name: "Ikwo", lat: 6.0333, lng: 8.1333, type: "town" },
            { name: "Ohaukwu", lat: 6.6333, lng: 8.3333, type: "town" },
            { name: "Ivo", lat: 5.9167, lng: 7.7500, type: "town" }
        ]
    },

    // South-South States
    "rivers": {
        name: "Rivers",
        capital: "Port Harcourt",
        cities: [
            { name: "Port Harcourt", lat: 4.8156, lng: 7.0498, type: "capital" },
            { name: "Obio-Akpor", lat: 4.8667, lng: 7.0000, type: "city" },
            { name: "Okrika", lat: 4.7500, lng: 7.0833, type: "city" },
            { name: "Bonny", lat: 4.4500, lng: 7.1833, type: "town" },
            { name: "Eleme", lat: 4.9167, lng: 7.0833, type: "town" },
            { name: "Ikwerre", lat: 4.9333, lng: 6.9333, type: "town" },
            { name: "Oyigbo", lat: 4.8667, lng: 7.1167, type: "town" },
            { name: "Opobo", lat: 4.5167, lng: 7.2000, type: "town" },
            { name: "Degema", lat: 4.7667, lng: 6.7500, type: "town" },
            { name: "Emohua", lat: 4.9000, lng: 6.9167, type: "town" },
            { name: "Etche", lat: 5.0000, lng: 7.0833, type: "town" },
            { name: "Khana", lat: 4.6667, lng: 7.3333, type: "town" },
            { name: "Gokana", lat: 4.6500, lng: 7.2667, type: "town" },
            { name: "Tai", lat: 4.7500, lng: 7.2500, type: "town" },
            { name: "Bori", lat: 7.3833, lng: 10.0667, type: "town" }
        ]
    },

    "akwa_ibom": {
        name: "Akwa Ibom",
        capital: "Uyo",
        cities: [
            { name: "Uyo", lat: 5.0333, lng: 7.9167, type: "capital" },
            { name: "Eket", lat: 4.6500, lng: 7.9500, type: "city" },
            { name: "Ikot Ekpene", lat: 5.1833, lng: 7.7167, type: "city" },
            { name: "Oron", lat: 4.8167, lng: 8.2333, type: "town" },
            { name: "Abak", lat: 4.9833, lng: 7.7833, type: "town" },
            { name: "Itu", lat: 5.2000, lng: 7.9833, type: "town" },
            { name: "Nsit Ubium", lat: 4.7500, lng: 7.8000, type: "town" },
            { name: "Mkpat Enin", lat: 4.5833, lng: 7.7500, type: "town" },
            { name: "Etinan", lat: 4.8500, lng: 7.8500, type: "town" },
            { name: "Ikot Abasi", lat: 4.6000, lng: 7.6167, type: "town" },
            { name: "Onna", lat: 4.6500, lng: 7.7500, type: "town" },
            { name: "Okobo", lat: 4.8333, lng: 8.3333, type: "town" }
        ]
    },

    "cross_river": {
        name: "Cross River",
        capital: "Calabar",
        cities: [
            { name: "Calabar", lat: 4.9757, lng: 8.3417, type: "capital" },
            { name: "Ikom", lat: 5.9667, lng: 8.7167, type: "city" },
            { name: "Ogoja", lat: 6.6500, lng: 8.8000, type: "city" },
            { name: "Obudu", lat: 6.6667, lng: 9.1667, type: "town" },
            { name: "Akamkpa", lat: 5.3000, lng: 8.3500, type: "town" },
            { name: "Odukpani", lat: 5.1333, lng: 8.4000, type: "town" },
            { name: "Akpabuyo", lat: 4.9667, lng: 8.3333, type: "town" },
            { name: "Biase", lat: 5.2500, lng: 8.3333, type: "town" },
            { name: "Boki", lat: 6.5000, lng: 9.0833, type: "town" },
            { name: "Yakurr", lat: 5.8333, lng: 8.1667, type: "town" }
        ]
    },

    "delta": {
        name: "Delta",
        capital: "Asaba",
        cities: [
            { name: "Asaba", lat: 6.2000, lng: 6.7333, type: "capital" },
            { name: "Warri", lat: 5.5167, lng: 5.7500, type: "city" },
            { name: "Sapele", lat: 5.8833, lng: 5.6833, type: "city" },
            { name: "Ughelli", lat: 5.5000, lng: 6.0000, type: "city" },
            { name: "Ozoro", lat: 5.7500, lng: 6.2167, type: "town" },
            { name: "Agbor", lat: 6.2500, lng: 6.2000, type: "city" },
            { name: "Kwale", lat: 5.7000, lng: 6.4500, type: "town" },
            { name: "Burutu", lat: 5.3500, lng: 5.5167, type: "town" },
            { name: "Oleh", lat: 5.4500, lng: 6.2000, type: "town" },
            { name: "Patani", lat: 5.2000, lng: 6.1833, type: "town" },
            { name: "Bomadi", lat: 5.1000, lng: 5.5667, type: "town" },
            { name: "Issele-Uku", lat: 6.3167, lng: 6.4833, type: "town" }
        ]
    },

    "bayelsa": {
        name: "Bayelsa",
        capital: "Yenagoa",
        cities: [
            { name: "Yenagoa", lat: 4.9267, lng: 6.2676, type: "capital" },
            { name: "Brass", lat: 4.3167, lng: 6.2500, type: "town" },
            { name: "Nembe", lat: 4.4000, lng: 6.4000, type: "town" },
            { name: "Ogbia", lat: 4.6833, lng: 6.3000, type: "town" },
            { name: "Sagbama", lat: 5.1667, lng: 6.2000, type: "town" },
            { name: "Ekeremor", lat: 5.0667, lng: 5.7833, type: "town" },
            { name: "Southern Ijaw", lat: 4.4167, lng: 6.0833, type: "town" },
            { name: "Kolokuma", lat: 5.0833, lng: 6.3000, type: "town" }
        ]
    },

    "edo": {
        name: "Edo",
        capital: "Benin City",
        cities: [
            { name: "Benin City", lat: 6.3350, lng: 5.6275, type: "capital" },
            { name: "Auchi", lat: 7.0667, lng: 6.2667, type: "city" },
            { name: "Ekpoma", lat: 6.7500, lng: 6.1333, type: "town" },
            { name: "Igueben", lat: 6.6000, lng: 6.2500, type: "town" },
            { name: "Irrua", lat: 6.7333, lng: 6.2167, type: "town" },
            { name: "Uromi", lat: 6.7167, lng: 6.3333, type: "town" },
            { name: "Egor", lat: 6.4000, lng: 5.6000, type: "town" },
            { name: "Ovia", lat: 6.3000, lng: 5.7000, type: "town" },
            { name: "Orhionmwon", lat: 6.3333, lng: 5.8333, type: "town" },
            { name: "Owan", lat: 7.0833, lng: 6.0333, type: "town" }
        ]
    },

    // North-West States
    "kano": {
        name: "Kano",
        capital: "Kano",
        cities: [
            { name: "Kano", lat: 12.0022, lng: 8.5920, type: "capital" },
            { name: "Wudil", lat: 11.8000, lng: 8.8500, type: "city" },
            { name: "Fagge", lat: 12.0000, lng: 8.5333, type: "city" },
            { name: "Dala", lat: 12.0167, lng: 8.5333, type: "city" },
            { name: "Gwale", lat: 12.0167, lng: 8.5667, type: "city" },
            { name: "Nasarawa", lat: 12.0000, lng: 8.5333, type: "city" },
            { name: "Tarauni", lat: 12.0000, lng: 8.6000, type: "city" },
            { name: "Ungogo", lat: 12.0500, lng: 8.5333, type: "town" },
            { name: "Kumbotso", lat: 11.9000, lng: 8.5000, type: "town" },
            { name: "Dawakin Kudu", lat: 11.8333, lng: 8.6000, type: "town" },
            { name: "Minjibir", lat: 12.1833, lng: 8.7333, type: "town" },
            { name: "Gezawa", lat: 12.3333, lng: 8.8500, type: "town" }
        ]
    },

    "kaduna": {
        name: "Kaduna",
        capital: "Kaduna",
        cities: [
            { name: "Kaduna", lat: 10.5105, lng: 7.4165, type: "capital" },
            { name: "Zaria", lat: 11.0667, lng: 7.7000, type: "city" },
            { name: "Kafanchan", lat: 9.5833, lng: 8.3000, type: "city" },
            { name: "Saminaka", lat: 10.0500, lng: 8.7000, type: "town" },
            { name: "Kagoro", lat: 9.6000, lng: 8.3833, type: "town" },
            { name: "Giwa", lat: 11.0333, lng: 7.3667, type: "town" },
            { name: "Birnin Gwari", lat: 10.6667, lng: 6.3667, type: "town" },
            { name: "Ikara", lat: 11.1833, lng: 7.7167, type: "town" },
            { name: "Kudan", lat: 11.2333, lng: 7.4500, type: "town" },
            { name: "Makarfi", lat: 11.2167, lng: 7.3667, type: "town" },
            { name: "Soba", lat: 10.9833, lng: 8.0667, type: "town" },
            { name: "Lere", lat: 10.7833, lng: 8.5833, type: "town" }
        ]
    },

    "katsina": {
        name: "Katsina",
        capital: "Katsina",
        cities: [
            { name: "Katsina", lat: 12.9908, lng: 7.6017, type: "capital" },
            { name: "Daura", lat: 13.0333, lng: 8.3167, type: "city" },
            { name: "Funtua", lat: 11.5333, lng: 7.3167, type: "city" },
            { name: "Malumfashi", lat: 11.7833, lng: 7.6167, type: "town" },
            { name: "Dutsin-Ma", lat: 12.4667, lng: 7.5000, type: "town" },
            { name: "Mani", lat: 12.8500, lng: 7.3000, type: "town" },
            { name: "Mashi", lat: 13.2500, lng: 7.9500, type: "town" },
            { name: "Bakori", lat: 11.6667, lng: 7.4333, type: "town" },
            { name: "Zango", lat: 13.0667, lng: 8.5833, type: "town" },
            { name: "Baure", lat: 12.7833, lng: 8.7833, type: "town" },
            { name: "Danja", lat: 11.3667, lng: 7.5667, type: "town" }
        ]
    },

    "kebbi": {
        name: "Kebbi",
        capital: "Birnin Kebbi",
        cities: [
            { name: "Birnin Kebbi", lat: 12.4508, lng: 4.1994, type: "capital" },
            { name: "Argungu", lat: 12.7500, lng: 4.6167, type: "city" },
            { name: "Zuru", lat: 11.4333, lng: 5.2333, type: "city" },
            { name: "Yauri", lat: 10.8333, lng: 4.3833, type: "town" },
            { name: "Gwandu", lat: 12.5000, lng: 4.2500, type: "town" },
            { name: "Jega", lat: 12.2167, lng: 4.3833, type: "town" },
            { name: "Kalgo", lat: 11.6833, lng: 4.2000, type: "town" },
            { name: "Danko-Wasagu", lat: 11.5667, lng: 5.9667, type: "town" },
            { name: "Sakaba", lat: 11.0667, lng: 5.2333, type: "town" },
            { name: "Augie", lat: 12.8833, lng: 4.6000, type: "town" }
        ]
    },

    "sokoto": {
        name: "Sokoto",
        capital: "Sokoto",
        cities: [
            { name: "Sokoto", lat: 13.0059, lng: 5.2476, type: "capital" },
            { name: "Tambuwal", lat: 12.4000, lng: 4.6500, type: "city" },
            { name: "Wamako", lat: 13.0667, lng: 5.1333, type: "city" },
            { name: "Binji", lat: 13.2000, lng: 4.9000, type: "town" },
            { name: "Bodinga", lat: 13.0167, lng: 5.1667, type: "town" },
            { name: "Dange-Shuni", lat: 12.8667, lng: 5.1667, type: "town" },
            { name: "Goronyo", lat: 13.7000, lng: 5.7000, type: "town" },
            { name: "Gudu", lat: 13.1500, lng: 4.2333, type: "town" },
            { name: "Gwadabawa", lat: 13.3667, lng: 5.2333, type: "town" },
            { name: "Illela", lat: 13.7333, lng: 5.3000, type: "town" },
            { name: "Isa", lat: 13.2000, lng: 6.4000, type: "town" },
            { name: "Kebbe", lat: 12.1333, lng: 4.8333, type: "town" }
        ]
    },

    "zamfara": {
        name: "Zamfara",
        capital: "Gusau",
        cities: [
            { name: "Gusau", lat: 12.1702, lng: 6.6641, type: "capital" },
            { name: "Anka", lat: 12.1000, lng: 5.9167, type: "city" },
            { name: "Talata Mafara", lat: 12.5667, lng: 6.0500, type: "town" },
            { name: "Zurmi", lat: 12.8000, lng: 6.7833, type: "town" },
            { name: "Kaura Namoda", lat: 12.6000, lng: 6.5833, type: "town" },
            { name: "Maru", lat: 12.3333, lng: 6.4167, type: "town" },
            { name: "Bungudu", lat: 12.2667, lng: 6.5500, type: "town" },
            { name: "Bakura", lat: 12.7000, lng: 5.8667, type: "town" },
            { name: "Shinkafi", lat: 13.0833, lng: 6.5000, type: "town" },
            { name: "Maradun", lat: 12.5667, lng: 6.2500, type: "town" }
        ]
    },

    "jigawa": {
        name: "Jigawa",
        capital: "Dutse",
        cities: [
            { name: "Dutse", lat: 11.7592, lng: 9.3392, type: "capital" },
            { name: "Hadejia", lat: 12.4500, lng: 10.0500, type: "city" },
            { name: "Gumel", lat: 12.6667, lng: 9.7333, type: "city" },
            { name: "Kazaure", lat: 12.6500, lng: 8.4167, type: "town" },
            { name: "Ringim", lat: 12.1500, lng: 9.0167, type: "town" },
            { name: "Birnin Kudu", lat: 11.4333, lng: 9.4833, type: "town" },
            { name: "Gwaram", lat: 11.6667, lng: 9.8833, type: "town" },
            { name: "Jahun", lat: 11.7000, lng: 9.1167, type: "town" },
            { name: "Miga", lat: 11.7167, lng: 9.7167, type: "town" },
            { name: "Sule Tankarkar", lat: 12.5667, lng: 9.1333, type: "town" }
        ]
    },

    // North-East States
    "borno": {
        name: "Borno",
        capital: "Maiduguri",
        cities: [
            { name: "Maiduguri", lat: 11.8469, lng: 13.1571, type: "capital" },
            { name: "Biu", lat: 10.6167, lng: 12.2000, type: "city" },
            { name: "Monguno", lat: 12.6833, lng: 13.6167, type: "city" },
            { name: "Gwoza", lat: 11.0833, lng: 13.6833, type: "town" },
            { name: "Dikwa", lat: 12.0333, lng: 13.9167, type: "town" },
            { name: "Konduga", lat: 11.6500, lng: 13.4167, type: "town" },
            { name: "Kaga", lat: 11.4333, lng: 12.9833, type: "town" },
            { name: "Shani", lat: 10.2167, lng: 12.0500, type: "town" },
            { name: "Askira-Uba", lat: 10.6500, lng: 12.8667, type: "town" },
            { name: "Chibok", lat: 10.8667, lng: 12.8500, type: "town" },
            { name: "Damboa", lat: 11.1500, lng: 12.7500, type: "town" },
            { name: "Kukawa", lat: 12.9167, lng: 13.5667, type: "town" }
        ]
    },

    "yobe": {
        name: "Yobe",
        capital: "Damaturu",
        cities: [
            { name: "Damaturu", lat: 11.7470, lng: 11.9608, type: "capital" },
            { name: "Potiskum", lat: 11.7167, lng: 11.0833, type: "city" },
            { name: "Gashua", lat: 12.8667, lng: 11.0500, type: "city" },
            { name: "Nguru", lat: 12.8833, lng: 10.4500, type: "town" },
            { name: "Gujba", lat: 11.5000, lng: 11.9333, type: "town" },
            { name: "Fika", lat: 11.3000, lng: 11.0833, type: "town" },
            { name: "Bade", lat: 12.7833, lng: 10.3333, type: "town" },
            { name: "Machina", lat: 13.1333, lng: 10.0500, type: "town" },
            { name: "Nangere", lat: 11.8500, lng: 11.0667, type: "town" },
            { name: "Yunusari", lat: 13.0667, lng: 11.9333, type: "town" }
        ]
    },

    "bauchi": {
        name: "Bauchi",
        capital: "Bauchi",
        cities: [
            { name: "Bauchi", lat: 10.3103, lng: 9.8437, type: "capital" },
            { name: "Azare", lat: 11.6766, lng: 10.1949, type: "city" },
            { name: "Misau", lat: 11.3167, lng: 10.4667, type: "city" },
            { name: "Jama'are", lat: 11.6667, lng: 9.9333, type: "town" },
            { name: "Katagum", lat: 12.2833, lng: 10.3500, type: "town" },
            { name: "Ningi", lat: 11.0833, lng: 9.5667, type: "town" },
            { name: "Darazo", lat: 10.7500, lng: 10.4167, type: "town" },
            { name: "Gamawa", lat: 12.1333, lng: 10.5333, type: "town" },
            { name: "Alkaleri", lat: 10.2667, lng: 10.3333, type: "town" },
            { name: "Kirfi", lat: 10.4167, lng: 10.4000, type: "town" },
            { name: "Dass", lat: 10.0000, lng: 9.5333, type: "town" }
        ]
    },

    "gombe": {
        name: "Gombe",
        capital: "Gombe",
        cities: [
            { name: "Gombe", lat: 10.2897, lng: 11.1713, type: "capital" },
            { name: "Kumo", lat: 10.0500, lng: 11.2000, type: "city" },
            { name: "Billiri", lat: 9.8667, lng: 11.2167, type: "town" },
            { name: "Dukku", lat: 10.8333, lng: 10.7667, type: "town" },
            { name: "Yamaltu/Deba", lat: 10.3667, lng: 11.4000, type: "town" },
            { name: "Akko", lat: 10.2833, lng: 10.9667, type: "town" },
            { name: "Funakaye", lat: 10.4500, lng: 11.5167, type: "town" },
            { name: "Kwami", lat: 10.4000, lng: 11.2500, type: "town" },
            { name: "Nafada", lat: 11.0833, lng: 11.3333, type: "town" }
        ]
    },

    "adamawa": {
        name: "Adamawa",
        capital: "Yola",
        cities: [
            { name: "Yola", lat: 9.2000, lng: 12.4833, type: "capital" },
            { name: "Mubi", lat: 10.2676, lng: 13.4416, type: "city" },
            { name: "Numan", lat: 9.4667, lng: 12.0333, type: "city" },
            { name: "Jimeta", lat: 9.2833, lng: 12.4500, type: "city" },
            { name: "Ganye", lat: 8.4333, lng: 12.0667, type: "town" },
            { name: "Mayo-Belwa", lat: 9.0667, lng: 12.0667, type: "town" },
            { name: "Hong", lat: 10.2333, lng: 12.9167, type: "town" },
            { name: "Song", lat: 9.8333, lng: 12.6167, type: "town" },
            { name: "Michika", lat: 10.6167, lng: 13.3833, type: "town" },
            { name: "Madagali", lat: 10.8833, lng: 13.6333, type: "town" },
            { name: "Fufore", lat: 9.2167, lng: 12.7667, type: "town" },
            { name: "Guyuk", lat: 9.9167, lng: 12.0333, type: "town" }
        ]
    },

    "taraba": {
        name: "Taraba",
        capital: "Jalingo",
        cities: [
            { name: "Jalingo", lat: 8.9000, lng: 11.3667, type: "capital" },
            { name: "Wukari", lat: 7.8667, lng: 9.7833, type: "city" },
            { name: "Bali", lat: 7.8667, lng: 10.9667, type: "town" },
            { name: "Zing", lat: 8.9833, lng: 11.7333, type: "town" },
            { name: "Sardauna", lat: 6.9167, lng: 11.1833, type: "town" },
            { name: "Gassol", lat: 8.5333, lng: 10.4500, type: "town" },
            { name: "Takum", lat: 7.2667, lng: 9.9833, type: "town" },
            { name: "Donga", lat: 7.9333, lng: 10.7833, type: "town" },
            { name: "Kurmi", lat: 7.2333, lng: 10.6500, type: "town" },
            { name: "Ussa", lat: 7.1000, lng: 10.7667, type: "town" }
        ]
    },

    // North-Central States
    "niger": {
        name: "Niger",
        capital: "Minna",
        cities: [
            { name: "Minna", lat: 9.6139, lng: 6.5569, type: "capital" },
            { name: "Suleja", lat: 9.1808, lng: 7.1803, type: "city" },
            { name: "Bida", lat: 9.0833, lng: 6.0167, type: "city" },
            { name: "Kontagora", lat: 10.4000, lng: 5.4667, type: "city" },
            { name: "New Bussa", lat: 9.8667, lng: 4.5167, type: "town" },
            { name: "Agaie", lat: 9.0167, lng: 6.3167, type: "town" },
            { name: "Baro", lat: 8.6167, lng: 6.4167, type: "town" },
            { name: "Kagara", lat: 10.2000, lng: 6.3333, type: "town" },
            { name: "Lapai", lat: 9.0667, lng: 6.5667, type: "town" },
            { name: "Mashegu", lat: 10.3333, lng: 5.9167, type: "town" },
            { name: "Mokwa", lat: 9.2833, lng: 5.0667, type: "town" },
            { name: "Rijau", lat: 11.1500, lng: 5.2667, type: "town" }
        ]
    },

    "kwara": {
        name: "Kwara",
        capital: "Ilorin",
        cities: [
            { name: "Ilorin", lat: 8.4799, lng: 4.5418, type: "capital" },
            { name: "Offa", lat: 8.1500, lng: 4.7167, type: "city" },
            { name: "Jebba", lat: 9.1167, lng: 4.8333, type: "town" },
            { name: "Patigi", lat: 8.7333, lng: 5.7500, type: "town" },
            { name: "Lafiagi", lat: 8.8667, lng: 5.4167, type: "town" },
            { name: "Kaiama", lat: 9.6167, lng: 4.3667, type: "town" },
            { name: "Edu", lat: 8.9333, lng: 4.5000, type: "town" },
            { name: "Irepodun", lat: 8.5000, lng: 4.4833, type: "town" },
            { name: "Oke Ero", lat: 8.2500, lng: 5.2167, type: "town" },
            { name: "Oyun", lat: 8.0333, lng: 4.5500, type: "town" },
            { name: "Moro", lat: 8.6667, lng: 4.7333, type: "town" }
        ]
    },

    "kogi": {
        name: "Kogi",
        capital: "Lokoja",
        cities: [
            { name: "Lokoja", lat: 7.7969, lng: 6.7377, type: "capital" },
            { name: "Okene", lat: 7.5500, lng: 6.2333, type: "city" },
            { name: "Idah", lat: 7.1000, lng: 6.7333, type: "city" },
            { name: "Kabba", lat: 7.8333, lng: 6.0667, type: "city" },
            { name: "Anyigba", lat: 7.5000, lng: 7.1500, type: "town" },
            { name: "Ankpa", lat: 7.3667, lng: 7.6333, type: "town" },
            { name: "Dekina", lat: 7.7167, lng: 7.0333, type: "town" },
            { name: "Bassa", lat: 7.9500, lng: 7.0333, type: "town" },
            { name: "Ibaji", lat: 7.4167, lng: 6.8833, type: "town" },
            { name: "Mopa-Muro", lat: 8.1000, lng: 5.8500, type: "town" },
            { name: "Olamaboro", lat: 7.1833, lng: 7.1667, type: "town" },
            { name: "Yagba", lat: 8.1167, lng: 5.7000, type: "town" }
        ]
    },

    "benue": {
        name: "Benue",
        capital: "Makurdi",
        cities: [
            { name: "Makurdi", lat: 7.7333, lng: 8.5333, type: "capital" },
            { name: "Gboko", lat: 7.3167, lng: 8.9833, type: "city" },
            { name: "Otukpo", lat: 7.2000, lng: 8.1500, type: "city" },
            { name: "Katsina-Ala", lat: 7.1667, lng: 9.2833, type: "town" },
            { name: "Vandeikya", lat: 6.7833, lng: 9.0667, type: "town" },
            { name: "Zaki-Biam", lat: 7.5000, lng: 9.6167, type: "town" },
            { name: "Adikpo", lat: 6.8833, lng: 9.2000, type: "town" },
            { name: "Lessel", lat: 7.1333, lng: 8.9333, type: "town" },
            { name: "Aliade", lat: 7.2833, lng: 8.4667, type: "town" },
            { name: "Oju", lat: 6.8333, lng: 8.4167, type: "town" },
            { name: "Agatu", lat: 7.9667, lng: 8.0667, type: "town" },
            { name: "Apa", lat: 7.8333, lng: 8.0000, type: "town" }
        ]
    },

    "plateau": {
        name: "Plateau",
        capital: "Jos",
        cities: [
            { name: "Jos", lat: 9.8965, lng: 8.8583, type: "capital" },
            { name: "Bukuru", lat: 9.8000, lng: 8.8667, type: "city" },
            { name: "Barkin Ladi", lat: 9.5333, lng: 8.9000, type: "town" },
            { name: "Vom", lat: 9.7333, lng: 8.7833, type: "town" },
            { name: "Langtang", lat: 8.6333, lng: 9.8000, type: "town" },
            { name: "Pankshin", lat: 9.3333, lng: 9.4500, type: "town" },
            { name: "Shendam", lat: 8.8833, lng: 9.5333, type: "town" },
            { name: "Mangu", lat: 9.5167, lng: 9.0000, type: "town" },
            { name: "Riyom", lat: 9.5333, lng: 8.7667, type: "town" },
            { name: "Bassa", lat: 9.9000, lng: 8.7500, type: "town" },
            { name: "Kanke", lat: 9.4667, lng: 9.5000, type: "town" },
            { name: "Mikang", lat: 9.1000, lng: 9.6000, type: "town" }
        ]
    },

    "nasarawa": {
        name: "Nasarawa",
        capital: "Lafia",
        cities: [
            { name: "Lafia", lat: 8.5000, lng: 8.5167, type: "capital" },
            { name: "Keffi", lat: 8.8500, lng: 7.8667, type: "city" },
            { name: "Akwanga", lat: 8.9000, lng: 8.3833, type: "city" },
            { name: "Nasarawa", lat: 8.5333, lng: 7.7000, type: "town" },
            { name: "Karu", lat: 9.1833, lng: 7.9500, type: "town" },
            { name: "Doma", lat: 8.4000, lng: 8.3833, type: "town" },
            { name: "Obi", lat: 8.3667, lng: 8.7667, type: "town" },
            { name: "Kokona", lat: 8.8833, lng: 8.0167, type: "town" },
            { name: "Toto", lat: 8.2833, lng: 7.0833, type: "town" },
            { name: "Wamba", lat: 8.9333, lng: 8.6000, type: "town" }
        ]
    }
};

// Helper functions
const LocationHelpers = {
    // Get all states
    getAllStates() {
        return Object.entries(NigeriaLocations).map(([key, data]) => ({
            id: key,
            name: data.name,
            capital: data.capital
        }));
    },

    // Get cities in a state
    getStateCities(stateKey) {
        const state = NigeriaLocations[stateKey];
        return state ? state.cities : [];
    },

    // Search locations
    searchLocations(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();
        
        Object.entries(NigeriaLocations).forEach(([stateKey, stateData]) => {
            // Check state name
            if (stateData.name.toLowerCase().includes(lowerQuery)) {
                results.push({
                    type: 'state',
                    name: stateData.name,
                    key: stateKey
                });
            }
            
            // Check cities
            stateData.cities.forEach(city => {
                if (city.name.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        type: 'city',
                        name: city.name,
                        state: stateData.name,
                        stateKey: stateKey,
                        lat: city.lat,
                        lng: city.lng
                    });
                }
            });
        });
        
        return results;
    },

    // Get location by coordinates
    getNearestCity(lat, lng) {
        let nearest = null;
        let minDistance = Infinity;
        
        Object.values(NigeriaLocations).forEach(state => {
            state.cities.forEach(city => {
                const distance = this.calculateDistance(lat, lng, city.lat, city.lng);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = { ...city, state: state.name };
                }
            });
        });
        
        return nearest;
    },

    // Calculate distance between coordinates (Haversine formula)
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRad(lat2 - lat1);
        const dLng = this.toRad(lng2 - lng1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    },

    toRad(deg) {
        return deg * Math.PI / 180;
    },

    // Get popular cities for featured locations
    getPopularCities() {
        return [
            { name: "Lagos", state: "lagos", count: 2847 },
            { name: "Abuja", state: "fct", count: 1923 },
            { name: "Port Harcourt", state: "rivers", count: 1456 },
            { name: "Ibadan", state: "oyo", count: 1234 },
            { name: "Kano", state: "kano", count: 987 },
            { name: "Enugu", state: "enugu", count: 876 },
            { name: "Benin City", state: "edo", count: 765 },
            { name: "Uyo", state: "akwa_ibom", count: 654 },
            { name: "Calabar", state: "cross_river", count: 543 },
            { name: "Kaduna", state: "kaduna", count: 432 }
        ];
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NigeriaLocations, LocationHelpers };
}
