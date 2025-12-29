// Données fictives pour les services diocésains
export const diocesanServicesData = [
  {
    name: "Pastorale Familiale",
    description: "La Pastorale Familiale accompagne les familles chrétiennes dans toutes les étapes de leur vie. Elle propose des formations pour les fiancés, des retraites pour couples, un accompagnement pour les familles en difficulté, et des sessions de formation pour les parents.",
    category: "Pastoral",
    coordinator: "Père Jean-Marie Nkoulou",
    coordinatorPhone: "+237 677 123 456",
    coordinatorEmail: "pastorale.famille@archidiocese-yaounde.org",
    address: "Archevêché de Yaoundé, BP 11628",
    schedule: "Lundi - Vendredi: 8h - 16h",
    slug: "pastorale-familiale",
    isActive: true
  },
  {
    name: "Commission Liturgique",
    description: "La Commission Liturgique veille à la qualité des célébrations dans l'archidiocèse. Elle forme les servants d'autel, les lecteurs, les chantres et assure l'accompagnement des paroisses pour les grandes fêtes liturgiques.",
    category: "Liturgie",
    coordinator: "Abbé Pierre Mendouga",
    coordinatorPhone: "+237 699 234 567",
    coordinatorEmail: "liturgie@archidiocese-yaounde.org",
    address: "Cathédrale Notre-Dame des Victoires",
    schedule: "Mardi - Samedi: 9h - 17h",
    slug: "commission-liturgique",
    isActive: true
  },
  {
    name: "Catéchèse Diocésaine",
    description: "Service responsable de la formation chrétienne à tous les âges. Organisation des parcours catéchétiques, formation des catéchistes, préparation aux sacrements (baptême, communion, confirmation).",
    category: "Formation",
    coordinator: "Sœur Marie-Claire Atangana",
    coordinatorPhone: "+237 655 345 678",
    coordinatorEmail: "catechese@archidiocese-yaounde.org",
    address: "Centre Catéchétique Diocésain, Mvolyé",
    schedule: "Lundi - Vendredi: 8h - 15h",
    slug: "catechese-diocesaine",
    isActive: true
  },
  {
    name: "Caritas Diocésaine",
    description: "Bras social de l'Église, Caritas Yaoundé œuvre pour la solidarité et l'entraide. Actions d'urgence, aide aux plus démunis, projets de développement, accompagnement des migrants et réfugiés.",
    category: "Social",
    coordinator: "Monsieur Paul Essomba",
    coordinatorPhone: "+237 690 456 789",
    coordinatorEmail: "caritas@archidiocese-yaounde.org",
    address: "Siège Caritas, Nlongkak",
    schedule: "Lundi - Vendredi: 7h30 - 15h30",
    slug: "caritas-diocesaine",
    isActive: true
  },
  {
    name: "Pastorale des Jeunes",
    description: "Animation et accompagnement de la jeunesse catholique. Mouvements de jeunes, JMJ, camps de formation, retraites spirituelles, insertion professionnelle des jeunes.",
    category: "Pastoral",
    coordinator: "Abbé Thomas Mvogo",
    coordinatorPhone: "+237 677 567 890",
    coordinatorEmail: "jeunes@archidiocese-yaounde.org",
    address: "Maison des Jeunes, Nsimeyong",
    schedule: "Tous les jours: 9h - 18h",
    slug: "pastorale-jeunes",
    isActive: true
  },
  {
    name: "Commission Justice et Paix",
    description: "Promotion de la justice sociale, de la paix et de la réconciliation. Formation à la doctrine sociale de l'Église, médiation dans les conflits, plaidoyer pour les droits humains.",
    category: "Social",
    coordinator: "Dr. Emmanuel Ngoumou",
    coordinatorPhone: "+237 699 678 901",
    coordinatorEmail: "justice.paix@archidiocese-yaounde.org",
    address: "Centre Jean XXIII, Mvolyé",
    schedule: "Lundi - Vendredi: 8h - 16h",
    slug: "justice-paix",
    isActive: true
  },
  {
    name: "Service des Vocations",
    description: "Accompagnement des jeunes dans leur discernement vocationnel. Retraites de discernement, journées des vocations, suivi des séminaristes et des postulants à la vie religieuse.",
    category: "Pastoral",
    coordinator: "Père François Owona",
    coordinatorPhone: "+237 655 789 012",
    coordinatorEmail: "vocations@archidiocese-yaounde.org",
    address: "Grand Séminaire de Nkolbisson",
    schedule: "Sur rendez-vous",
    slug: "service-vocations",
    isActive: true
  },
  {
    name: "Communication Diocésaine",
    description: "Service de communication et médias de l'archidiocèse. Gestion des réseaux sociaux, production audiovisuelle, relations presse, site web diocésain.",
    category: "Administratif",
    coordinator: "Madame Jeanne Abena",
    coordinatorPhone: "+237 690 890 123",
    coordinatorEmail: "communication@archidiocese-yaounde.org",
    address: "Archevêché de Yaoundé",
    schedule: "Lundi - Vendredi: 8h - 17h",
    slug: "communication-diocesaine",
    isActive: true
  }
];

// Données fictives pour les aumôneries
export const chaplainiciesData = [
  {
    name: "Aumônerie des Hôpitaux",
    description: "Présence spirituelle et sacramentelle auprès des malades dans les hôpitaux de Yaoundé. Visite des malades, administration des sacrements, accompagnement des familles endeuillées.",
    type: "Hôpital",
    chaplain: "Père Michel Belinga",
    chaplainPhone: "+237 677 111 222",
    chaplainEmail: "aumonerie.hopitaux@archidiocese-yaounde.org",
    address: "Hôpital Central de Yaoundé",
    massSchedule: "Dimanche 9h - Chapelle de l'hôpital",
    slug: "aumonerie-hopitaux",
    isActive: true
  },
  {
    name: "Aumônerie des Prisons",
    description: "Accompagnement spirituel des détenus et de leurs familles. Célébrations eucharistiques, entretiens individuels, aide à la réinsertion sociale.",
    type: "Prison",
    chaplain: "Père Joseph Ndongo",
    chaplainPhone: "+237 699 222 333",
    chaplainEmail: "aumonerie.prisons@archidiocese-yaounde.org",
    address: "Prison Centrale de Kondengui",
    massSchedule: "Mercredi 10h et Dimanche 8h",
    slug: "aumonerie-prisons",
    isActive: true
  },
  {
    name: "Aumônerie Militaire",
    description: "Service pastoral auprès des forces de défense et de sécurité. Accompagnement des militaires et de leurs familles, célébrations dans les casernes.",
    type: "Militaire",
    chaplain: "Colonel-Abbé Pierre Essomba",
    chaplainPhone: "+237 655 333 444",
    chaplainEmail: "aumonerie.militaire@archidiocese-yaounde.org",
    address: "État-Major des Armées",
    massSchedule: "Dimanche 7h30 - Chapelle militaire",
    slug: "aumonerie-militaire",
    isActive: true
  },
  {
    name: "Aumônerie des Lycées et Collèges",
    description: "Animation pastorale dans les établissements scolaires catholiques et publics. Catéchèse, préparation aux sacrements, accompagnement des jeunes.",
    type: "Scolaire",
    chaplain: "Abbé Martin Fouda",
    chaplainPhone: "+237 690 444 555",
    chaplainEmail: "aumonerie.scolaire@archidiocese-yaounde.org",
    address: "Collège Vogt, Yaoundé",
    massSchedule: "Variable selon les établissements",
    slug: "aumonerie-lycees-colleges",
    isActive: true
  },
  {
    name: "Aumônerie des Personnes Handicapées",
    description: "Accueil et accompagnement pastoral des personnes vivant avec un handicap. Célébrations adaptées, activités inclusives, soutien aux familles.",
    type: "Social",
    chaplain: "Sœur Béatrice Mbassi",
    chaplainPhone: "+237 677 555 666",
    chaplainEmail: "aumonerie.handicap@archidiocese-yaounde.org",
    address: "Centre d'Accueil Emmaüs, Yaoundé",
    massSchedule: "Samedi 15h",
    slug: "aumonerie-personnes-handicapees",
    isActive: true
  }
];

// Données fictives pour les universités et grandes écoles
export const universitiesData = [
  {
    name: "Aumônerie de l'Université de Yaoundé I",
    description: "Présence de l'Église auprès des étudiants de l'Université de Yaoundé I. Messes, groupes de prière, formations, accompagnement spirituel et insertion professionnelle.",
    type: "Université",
    chaplain: "Père André Manga",
    chaplainPhone: "+237 699 666 777",
    chaplainEmail: "aumonerie.uy1@archidiocese-yaounde.org",
    address: "Campus de Ngoa-Ekellé",
    massSchedule: "Mardi 12h15, Dimanche 10h",
    activities: "Chorale universitaire, groupe biblique, retraites, conférences",
    slug: "universite-yaounde-1",
    isActive: true
  },
  {
    name: "Aumônerie de l'Université de Yaoundé II",
    description: "Accompagnement pastoral des étudiants de Yaoundé II - Soa. Vie de prière, formation humaine et spirituelle, engagement social.",
    type: "Université",
    chaplain: "Père Luc Onana",
    chaplainPhone: "+237 655 777 888",
    chaplainEmail: "aumonerie.uy2@archidiocese-yaounde.org",
    address: "Campus de Soa",
    massSchedule: "Jeudi 12h, Dimanche 9h",
    activities: "Groupe charismatique, service social, animation liturgique",
    slug: "universite-yaounde-2",
    isActive: true
  },
  {
    name: "Aumônerie de l'École Polytechnique",
    description: "Vie chrétienne au sein de l'École Nationale Supérieure Polytechnique. Accompagnement des futurs ingénieurs dans leur foi et leur éthique professionnelle.",
    type: "Grande École",
    chaplain: "Père Ignace Mbarga",
    chaplainPhone: "+237 690 888 999",
    chaplainEmail: "aumonerie.polytechnique@archidiocese-yaounde.org",
    address: "Campus Polytechnique, Yaoundé",
    massSchedule: "Vendredi 12h30",
    activities: "Éthique et foi, conférences scientifiques et foi, solidarité",
    slug: "ecole-polytechnique",
    isActive: true
  },
  {
    name: "Aumônerie de l'ESSEC",
    description: "Présence pastorale à l'École Supérieure des Sciences Économiques et Commerciales. Formation intégrale des futurs cadres d'entreprise.",
    type: "Grande École",
    chaplain: "Abbé Patrice Nkodo",
    chaplainPhone: "+237 677 999 000",
    chaplainEmail: "aumonerie.essec@archidiocese-yaounde.org",
    address: "Campus ESSEC, Douala (antenne Yaoundé)",
    massSchedule: "Mercredi 13h",
    activities: "Éthique des affaires, leadership chrétien, entrepreneuriat social",
    slug: "essec",
    isActive: true
  },
  {
    name: "Aumônerie de l'Université Catholique d'Afrique Centrale",
    description: "Animation spirituelle de l'UCAC. Intégration de la foi et de la raison dans la formation universitaire catholique.",
    type: "Université Catholique",
    chaplain: "Père Barthélémy Ndi Okala",
    chaplainPhone: "+237 699 000 111",
    chaplainEmail: "aumonerie@ucac-icy.net",
    address: "Campus UCAC, Nkolbisson",
    massSchedule: "Quotidienne 12h, Dimanche 9h30",
    activities: "Vie spirituelle intégrée, service communautaire, dialogue interreligieux",
    slug: "ucac",
    isActive: true
  },
  {
    name: "Aumônerie de l'ENSP",
    description: "Accompagnement des étudiants en médecine et sciences de la santé. Formation à l'éthique médicale et à la pastorale de la santé.",
    type: "Grande École",
    chaplain: "Père Emmanuel Tsala",
    chaplainPhone: "+237 655 111 222",
    chaplainEmail: "aumonerie.ensp@archidiocese-yaounde.org",
    address: "Faculté de Médecine, Yaoundé",
    massSchedule: "Lundi 12h30",
    activities: "Bioéthique, pastorale de la santé, accompagnement des malades",
    slug: "ensp",
    isActive: true
  }
];

// Données fictives pour les instituts religieux
export const religiousInstitutesData = [
  {
    name: "Sœurs du Saint-Cœur de Marie",
    description: "Congrégation féminine fondée au Cameroun, dédiée à l'éducation et à la promotion de la femme. Présentes dans plusieurs paroisses et écoles de l'archidiocèse.",
    type: "Congrégation",
    gender: "female",
    superior: "Mère Marie-Thérèse Abomo",
    superiorPhone: "+237 677 222 333",
    superiorEmail: "sscm@religious-institutes.org",
    address: "Maison Mère, Mvolyé",
    foundedYear: 1950,
    numberOfMembers: 120,
    charism: "Éducation et promotion humaine",
    slug: "soeurs-saint-coeur-marie",
    isActive: true
  },
  {
    name: "Pères Spiritains",
    description: "Congrégation du Saint-Esprit (Spiritains), présente au Cameroun depuis 1890. Engagement missionnaire, éducation, paroisses.",
    type: "Congrégation",
    gender: "male",
    superior: "Père Provincial Jacques Mvondo",
    superiorPhone: "+237 699 333 444",
    superiorEmail: "spiritains.cameroun@cssp.org",
    address: "Provincialat, Yaoundé",
    foundedYear: 1890,
    numberOfMembers: 85,
    charism: "Mission ad gentes, éducation",
    slug: "peres-spiritains",
    isActive: true
  },
  {
    name: "Bénédictines du Mont Fébé",
    description: "Monastère de vie contemplative. Les sœurs vivent selon la Règle de Saint Benoît, dans la prière et le travail (Ora et Labora).",
    type: "Monastère",
    gender: "female",
    superior: "Mère Abbesse Scholastique Ngo Nkoth",
    superiorPhone: "+237 655 444 555",
    superiorEmail: "benedictines.febe@monastery.org",
    address: "Monastère du Mont Fébé",
    foundedYear: 1965,
    numberOfMembers: 25,
    charism: "Vie contemplative, liturgie des heures",
    slug: "benedictines-mont-febe",
    isActive: true
  },
  {
    name: "Frères des Écoles Chrétiennes",
    description: "Institut lasallien dédié à l'éducation chrétienne des jeunes, spécialement les plus pauvres. Gestion de plusieurs établissements scolaires.",
    type: "Congrégation",
    gender: "male",
    superior: "Frère Visiteur Jean-Claude Ndzie",
    superiorPhone: "+237 690 555 666",
    superiorEmail: "lasalliens.cameroun@lasalle.org",
    address: "District d'Afrique Centrale, Yaoundé",
    foundedYear: 1948,
    numberOfMembers: 45,
    charism: "Éducation chrétienne des jeunes",
    slug: "freres-ecoles-chretiennes",
    isActive: true
  },
  {
    name: "Missionnaires de la Charité",
    description: "Congrégation fondée par Mère Teresa, au service des plus pauvres parmi les pauvres. Accueil des personnes de la rue, malades du SIDA, orphelins.",
    type: "Congrégation",
    gender: "female",
    superior: "Sœur Maria Gratia",
    superiorPhone: "+237 677 666 777",
    superiorEmail: "mc.yaounde@motherteresa.org",
    address: "Maison de la Charité, Mokolo",
    foundedYear: 1985,
    numberOfMembers: 18,
    charism: "Service des plus pauvres",
    slug: "missionnaires-charite",
    isActive: true
  },
  {
    name: "Pères Jésuites",
    description: "Compagnie de Jésus, présente dans l'éducation supérieure, les retraites spirituelles et la recherche intellectuelle.",
    type: "Ordre",
    gender: "male",
    superior: "Père Provincial Simon Abega",
    superiorPhone: "+237 699 777 888",
    superiorEmail: "jesuites.aoc@jesuits.org",
    address: "Résidence Saint-Pierre Canisius, Yaoundé",
    foundedYear: 1961,
    numberOfMembers: 35,
    charism: "Éducation, exercices spirituels, apostolat intellectuel",
    slug: "peres-jesuites",
    isActive: true
  },
  {
    name: "Sœurs de Notre-Dame du Perpétuel Secours",
    description: "Congrégation engagée dans l'éducation et les œuvres sociales. Présence dans les écoles maternelles et primaires.",
    type: "Congrégation",
    gender: "female",
    superior: "Sœur Générale Christine Biloa",
    superiorPhone: "+237 655 888 999",
    superiorEmail: "ndps.cameroun@perpetualsuccour.org",
    address: "Maison Provinciale, Nsimeyong",
    foundedYear: 1958,
    numberOfMembers: 65,
    charism: "Éducation et œuvres sociales",
    slug: "soeurs-notre-dame-perpetuel-secours",
    isActive: true
  },
  {
    name: "Pères Pallottins",
    description: "Société de l'Apostolat Catholique, engagée dans la mission paroissiale et l'animation des laïcs.",
    type: "Société",
    gender: "male",
    superior: "Père Recteur Vincent Ongolo",
    superiorPhone: "+237 690 999 000",
    superiorEmail: "pallottins.cameroun@sac.org",
    address: "Maison Pallottine, Yaoundé",
    foundedYear: 1972,
    numberOfMembers: 28,
    charism: "Animation de l'apostolat des laïcs",
    slug: "peres-pallottins",
    isActive: true
  }
];
