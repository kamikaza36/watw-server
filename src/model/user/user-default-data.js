const user = {
  email: 'first@mail.com',
  password: 'random',
  aUserId: '0',
};

const defaultUserSettings = {
  emailSettings: {
    sendAtTime: '20:00',
    timezone: 'UTC',
    dataSent: {
      weatherConditions: {
        temp: true,
        windSpeed: true,
        realFeel: true,
        airPressure: true,
        humidity: true,
        visibility: true,
        general: true,
      },
      watwClothes: {
        hat: 'Hat',
        scarf: 'Scarf',
        jacket: 'Jacket',
      },
      joke: false,
      inspiration: false,
    },
    mailToSendTo: 'first@mail.com',
  },
  locationSettings: {
    prefferedCity: 'Zagreb',
    prefferedCoordinates: [45.8153, 15.9665],
    weatherStation: {
      name: 'Zagreb',
      location: [45.8153, 15.9665],
      altitude: 100,
    },
  },
  measureUnits: {
    temp: 'Celsius',
    windSpeed: 'km/h',
    airPressure: 'bar',
  },
};

module.exports = {
  user,
  defaultUserSettings,
};
