(function () {
  const detailedRoutes = {
    R102: {
      AM: {
        title: 'AM Route (6:00 AM - 10:00 AM)',
        stops: [
          'Toril District Hall',
          'Toril Proper',
          'Sirawan',
          'Daliao',
          'Bago Aplaya',
          'Sasa',
          'Panacan Church',
          'Panacan Market',
          'Bangoy Junction',
          'Roxas Avenue',
          'Rizal Street',
          'CM Recto',
          'Uyanguren',
          'Bolton Cor Quirino',
          'Ponciano',
          'Monteverde',
          'GE Torres (Sandawa)'
        ]
      },
      PM: {
        title: 'PM Route (4:00 PM - 9:00 PM)',
        stops: [
          'GE Torres (Sandawa)',
          'Monteverde',
          'Ponciano',
          'Bolton Cor Quirino',
          'Uyanguren',
          'CM Recto',
          'Rizal Street',
          'Roxas Avenue',
          'Bangoy Junction',
          'Panacan Market',
          'Panacan Church',
          'Sasa',
          'Bago Aplaya',
          'Daliao',
          'Sirawan',
          'Toril Proper',
          'Toril District Hall'
        ]
      }
    },
    R103: {
      AM: {
        title: 'AM Route (6:00 AM - 10:00 AM)',
        stops: [
          'Toril District Hall',
          'Toril Public Market',
          'Sirawan',
          'Daliao',
          'Bago Aplaya',
          'Sasa',
          'Panacan',
          'Bangoy',
          'Red Cross Roxas'
        ]
      },
      PM: {
        title: 'PM Route (4:00 PM - 9:00 PM)',
        stops: [
          'Red Cross Roxas',
          'Bangoy',
          'Panacan',
          'Sasa',
          'Bago Aplaya',
          'Daliao',
          'Sirawan',
          'Toril Public Market',
          'Toril District Hall'
        ]
      }
    },
    R402: {
      AM: {
        title: 'AM Route (6:00 AM - 10:00 AM)',
        stops: [
          'Mintal Palengke',
          'Mintal Proper',
          'Catalunan Grande',
          'Catalunan Pequeno',
          'Tigatto',
          'GSIS Matina',
          'Matina Pangi',
          'Ecoland',
          'Bankerohan',
          'CM Recto',
          'Uyanguren',
          'Bolton Cor Quirino',
          'Ponciano',
          'Monteverde',
          'GE Torres (Sandawa)'
        ]
      },
      PM: {
        title: 'PM Route (4:00 PM - 9:00 PM)',
        stops: [
          'GE Torres (Sandawa)',
          'Monteverde',
          'Ponciano',
          'Bolton Cor Quirino',
          'Uyanguren',
          'CM Recto',
          'Bankerohan',
          'Ecoland',
          'Matina Pangi',
          'GSIS Matina',
          'Tigatto',
          'Catalunan Pequeno',
          'Catalunan Grande',
          'Mintal Proper',
          'Mintal Palengke'
        ]
      }
    },
    R403: {
      AM: {
        title: 'AM Route (6:00 AM - 10:00 AM)',
        stops: [
          'Mintal Palengke',
          'Mintal Proper',
          'Catalunan Grande',
          'Catalunan Pequeno',
          'Tigatto',
          'GSIS Matina',
          'Matina Pangi',
          'Ecoland',
          'Bankerohan',
          'Rizal Street',
          'CM Recto',
          'Uyanguren',
          'Bolton Bridge',
          'Quirino Avenue',
          'Ponciano',
          'C. Bangoy',
          'Davao Light'
        ]
      },
      PM: {
        title: 'PM Route (4:00 PM - 9:00 PM)',
        stops: [
          'Davao Light',
          'C. Bangoy',
          'Ponciano',
          'Quirino Avenue',
          'Bolton Bridge',
          'Uyanguren',
          'CM Recto',
          'Rizal Street',
          'Bankerohan',
          'Ecoland',
          'Matina Pangi',
          'GSIS Matina',
          'Tigatto',
          'Catalunan Pequeno',
          'Catalunan Grande',
          'Mintal Proper',
          'Mintal Palengke'
        ]
      }
    },
    R503: {
      AM: {
        title: 'AM Route (6:00 AM - 10:00 AM)',
        stops: [
          'Hope Ave. Bangkal',
          'Bangkal Proper',
          'Ma-a',
          'Shrine Hills',
          'Matina Crossing',
          'Ecoland',
          'Bankerohan',
          'Rizal Street',
          'CM Recto',
          'Uyanguren',
          'Bolton Bridge',
          'Quirino Avenue',
          'C. Bangoy',
          'Davao Light'
        ]
      },
      PM: {
        title: 'PM Route (4:00 PM - 9:00 PM)',
        stops: [
          'Davao Light',
          'C. Bangoy',
          'Quirino Avenue',
          'Bolton Bridge',
          'Uyanguren',
          'CM Recto',
          'Rizal Street',
          'Bankerohan',
          'Ecoland',
          'Matina Crossing',
          'Shrine Hills',
          'Ma-a',
          'Bangkal Proper',
          'Hope Ave. Bangkal'
        ]
      }
    },
    R603: {
      AM: {
        title: 'AM Route (6:00 AM - 10:00 AM)',
        stops: [
          'Citymall Northtown',
          'Buhangin Proper',
          'Agdao',
          'Panacan',
          'Quirino Avenue',
          'Bolton Bridge',
          'Uyanguren',
          'CM Recto',
          'Red Cross Roxas'
        ]
      },
      PM: {
        title: 'PM Route (4:00 PM - 9:00 PM)',
        stops: [
          'Red Cross Roxas',
          'CM Recto',
          'Uyanguren',
          'Bolton Bridge',
          'Quirino Avenue',
          'Panacan',
          'Agdao',
          'Buhangin Proper',
          'Citymall Northtown'
        ]
      }
    },
    R763: {
      AM: {
        title: 'AM Route (6:00 AM - 10:00 AM)',
        stops: [
          'Panacan Depot',
          'Panacan Church',
          'Buhangin Proper',
          'Agdao Market',
          'Bankerohan',
          'Rizal Street',
          'CM Recto',
          'Uyanguren',
          'Bolton Bridge',
          'Quirino Avenue',
          'Ponciano',
          'C. Bangoy',
          'Red Cross Roxas'
        ]
      },
      PM: {
        title: 'PM Route (4:00 PM - 9:00 PM)',
        stops: [
          'Red Cross Roxas',
          'C. Bangoy',
          'Ponciano',
          'Quirino Avenue',
          'Bolton Bridge',
          'Uyanguren',
          'CM Recto',
          'Rizal Street',
          'Bankerohan',
          'Agdao Market',
          'Buhangin Proper',
          'Panacan Church',
          'Panacan Depot'
        ]
      }
    },
    R783: {
      AM: {
        title: 'AM Route (6:00 AM - 10:00 AM)',
        stops: [
          'Panacan Depot',
          'R. Castillo',
          'Angliongto Ave',
          'Lanang',
          'JP Laurel',
          'Bajada',
          'Bankerohan',
          'Rizal Street',
          'CM Recto',
          'Uyanguren',
          'Bolton Bridge',
          'Quirino Avenue',
          'Ponciano',
          'C. Bangoy',
          'Red Cross Roxas'
        ]
      },
      PM: {
        title: 'PM Route (4:00 PM - 9:00 PM)',
        stops: [
          'Red Cross Roxas',
          'C. Bangoy',
          'Ponciano',
          'Quirino Avenue',
          'Bolton Bridge',
          'Uyanguren',
          'CM Recto',
          'Rizal Street',
          'Bankerohan',
          'Bajada',
          'JP Laurel',
          'Lanang',
          'Angliongto Ave',
          'R. Castillo',
          'Panacan Depot'
        ]
      }
    },
    R793: {
      AM: {
        title: 'AM Route (6:00 AM - 10:00 AM)',
        stops: [
          'NCCC Panacan',
          'R. Castillo',
          'Panacan Proper',
          'McArthur Highway',
          'Agdao',
          'Buhangin',
          'Bankerohan',
          'Rizal Street',
          'CM Recto',
          'Uyanguren',
          'Bolton Bridge',
          'Quirino Avenue',
          'Ponciano',
          'C. Bangoy',
          'Obrero',
          'Red Cross Roxas'
        ]
      },
      PM: {
        title: 'PM Route (4:00 PM - 9:00 PM)',
        stops: [
          'Red Cross Roxas',
          'Obrero',
          'C. Bangoy',
          'Ponciano',
          'Quirino Avenue',
          'Bolton Bridge',
          'Uyanguren',
          'CM Recto',
          'Rizal Street',
          'Bankerohan',
          'Buhangin',
          'Agdao',
          'McArthur Highway',
          'Panacan Proper',
          'R. Castillo',
          'NCCC Panacan'
        ]
      }
    }
  };

  const stopCoordinates = {
    R102: {
      'Toril District Hall': [7.0152, 125.4968],
      'Toril Proper': [7.0223, 125.5047],
      'Sirawan': [7.032, 125.518],
      'Daliao': [7.041, 125.535],
      'Bago Aplaya': [7.0495, 125.5565],
      'Sasa': [7.108, 125.639],
      'Panacan Church': [7.1692, 125.6608],
      'Panacan Market': [7.1737, 125.666],
      'Bangoy Junction': [7.1368, 125.6474],
      'Roxas Avenue': [7.0749, 125.6128],
      'Rizal Street': [7.071, 125.6112],
      'CM Recto': [7.0675, 125.6079],
      'Uyanguren': [7.0728, 125.6202],
      'Bolton Cor Quirino': [7.0661, 125.6073],
      'Ponciano': [7.0772, 125.6119],
      'Monteverde': [7.0797, 125.6106],
      'GE Torres (Sandawa)': [7.0489, 125.5904]
    },
    R103: {
      'Toril District Hall': [7.0152, 125.4968],
      'Toril Public Market': [7.0208, 125.5038],
      'Sirawan': [7.032, 125.518],
      'Daliao': [7.041, 125.535],
      'Bago Aplaya': [7.0495, 125.5565],
      'Sasa': [7.108, 125.639],
      'Panacan': [7.171, 125.6635],
      'Bangoy': [7.1368, 125.6474],
      'Red Cross Roxas': [7.0747, 125.6119]
    },
    R402: {
      'Mintal Palengke': [7.0862, 125.4622],
      'Mintal Proper': [7.0838, 125.4652],
      'Catalunan Grande': [7.1034, 125.5224],
      'Catalunan Pequeno': [7.1008, 125.5456],
      'Tigatto': [7.1218, 125.6069],
      'GSIS Matina': [7.0666, 125.5955],
      'Matina Pangi': [7.0532, 125.5887],
      'Ecoland': [7.0644, 125.6028],
      'Bankerohan': [7.0617, 125.6076],
      'CM Recto': [7.0675, 125.6079],
      'Uyanguren': [7.0728, 125.6202],
      'Bolton Cor Quirino': [7.0661, 125.6073],
      'Ponciano': [7.0772, 125.6119],
      'Monteverde': [7.0797, 125.6106],
      'GE Torres (Sandawa)': [7.0489, 125.5904]
    },
    R403: {
      'Mintal Palengke': [7.0862, 125.4622],
      'Mintal Proper': [7.0838, 125.4652],
      'Catalunan Grande': [7.1034, 125.5224],
      'Catalunan Pequeno': [7.1008, 125.5456],
      'Tigatto': [7.1218, 125.6069],
      'GSIS Matina': [7.0666, 125.5955],
      'Matina Pangi': [7.0532, 125.5887],
      'Ecoland': [7.0644, 125.6028],
      'Bankerohan': [7.0617, 125.6076],
      'Rizal Street': [7.071, 125.6112],
      'CM Recto': [7.0675, 125.6079],
      'Uyanguren': [7.0728, 125.6202],
      'Bolton Bridge': [7.066, 125.6068],
      'Quirino Avenue': [7.0654, 125.6072],
      'Ponciano': [7.0772, 125.6119],
      'C. Bangoy': [7.0741, 125.6133],
      'Davao Light': [7.0741, 125.6133]
    },
    R503: {
      'Hope Ave. Bangkal': [7.0486, 125.5828],
      'Bangkal Proper': [7.044, 125.5865],
      'Ma-a': [7.0876, 125.5987],
      'Shrine Hills': [7.0757, 125.601],
      'Matina Crossing': [7.0589, 125.596],
      'Ecoland': [7.0644, 125.6028],
      'Bankerohan': [7.0617, 125.6076],
      'Rizal Street': [7.071, 125.6112],
      'CM Recto': [7.0675, 125.6079],
      'Uyanguren': [7.0728, 125.6202],
      'Bolton Bridge': [7.066, 125.6068],
      'Quirino Avenue': [7.0654, 125.6072],
      'C. Bangoy': [7.0741, 125.6133],
      'Davao Light': [7.0741, 125.6133]
    },
    R603: {
      'Citymall Northtown': [7.1119, 125.6207],
      'Buhangin Proper': [7.1061, 125.629],
      'Agdao': [7.0888, 125.6315],
      'Panacan': [7.171, 125.6635],
      'Quirino Avenue': [7.0654, 125.6072],
      'Bolton Bridge': [7.066, 125.6068],
      'Uyanguren': [7.0728, 125.6202],
      'CM Recto': [7.0675, 125.6079],
      'Red Cross Roxas': [7.0747, 125.6119]
    },
    R763: {
      'Panacan Depot': [7.1859, 125.6621],
      'Panacan Church': [7.1692, 125.6608],
      'Buhangin Proper': [7.1061, 125.629],
      'Agdao Market': [7.0889, 125.6312],
      'Bankerohan': [7.0617, 125.6076],
      'Rizal Street': [7.071, 125.6112],
      'CM Recto': [7.0675, 125.6079],
      'Uyanguren': [7.0728, 125.6202],
      'Bolton Bridge': [7.066, 125.6068],
      'Quirino Avenue': [7.0654, 125.6072],
      'Ponciano': [7.0772, 125.6119],
      'C. Bangoy': [7.0741, 125.6133],
      'Red Cross Roxas': [7.0747, 125.6119]
    },
    R783: {
      'Panacan Depot': [7.1859, 125.6621],
      'R. Castillo': [7.1237, 125.6456],
      'Angliongto Ave': [7.1088, 125.6368],
      'Lanang': [7.1059, 125.6352],
      'JP Laurel': [7.0916, 125.6209],
      'Bajada': [7.0842, 125.6167],
      'Bankerohan': [7.0617, 125.6076],
      'Rizal Street': [7.071, 125.6112],
      'CM Recto': [7.0675, 125.6079],
      'Uyanguren': [7.0728, 125.6202],
      'Bolton Bridge': [7.066, 125.6068],
      'Quirino Avenue': [7.0654, 125.6072],
      'Ponciano': [7.0772, 125.6119],
      'C. Bangoy': [7.0741, 125.6133],
      'Red Cross Roxas': [7.0747, 125.6119]
    },
    R793: {
      'NCCC Panacan': [7.1773, 125.6658],
      'R. Castillo': [7.1237, 125.6456],
      'Panacan Proper': [7.1747, 125.6652],
      'McArthur Highway': [7.1506, 125.6524],
      'Agdao': [7.0888, 125.6315],
      'Buhangin': [7.1061, 125.629],
      'Bankerohan': [7.0617, 125.6076],
      'Rizal Street': [7.071, 125.6112],
      'CM Recto': [7.0675, 125.6079],
      'Uyanguren': [7.0728, 125.6202],
      'Bolton Bridge': [7.066, 125.6068],
      'Quirino Avenue': [7.0654, 125.6072],
      'Ponciano': [7.0772, 125.6119],
      'C. Bangoy': [7.0741, 125.6133],
      'Obrero': [7.0788, 125.616],
      'Red Cross Roxas': [7.0747, 125.6119]
    }
  };

  window.dcBusRouteMapData = {
    defaultCenter: [7.0731, 125.6128],
    detailedRoutes,
    stopCoordinates
  };
})();
