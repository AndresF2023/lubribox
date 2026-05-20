export interface Auto {
  marca: string;
  modelos: {
    nombre: string;
    años: number[];
    motor: string;
    litrosAceite: number;
  }[];
}

export const autos: Auto[] = [
  {
    marca: "Audi",
    modelos: [
      { nombre: "A1", años: [2019, 2020, 2021, 2022, 2023, 2024], motor: "1.0 / 1.5 TFSI", litrosAceite: 4.0 },
      { nombre: "A3", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.4 / 2.0 TFSI", litrosAceite: 4.5 },
      { nombre: "A4", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.0 TFSI", litrosAceite: 5.0 },
      { nombre: "Q3", años: [2019, 2020, 2021, 2022, 2023, 2024], motor: "1.4 / 2.0 TFSI", litrosAceite: 4.5 },
      { nombre: "Q5", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.0 TFSI", litrosAceite: 5.0 },
    ],
  },
  {
    marca: "BMW",
    modelos: [
      { nombre: "118i", años: [2019, 2020, 2021, 2022, 2023, 2024], motor: "1.5 Turbo", litrosAceite: 4.5 },
      { nombre: "320i", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.0 Turbo", litrosAceite: 5.0 },
      { nombre: "X1", años: [2019, 2020, 2021, 2022, 2023, 2024], motor: "2.0 Turbo", litrosAceite: 5.0 },
      { nombre: "X3", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.0 Turbo", litrosAceite: 5.5 },
    ],
  },
  {
    marca: "Chery",
    modelos: [
      { nombre: "Tiggo 2", años: [2020, 2021, 2022, 2023, 2024], motor: "1.5", litrosAceite: 3.8 },
      { nombre: "Tiggo 4", años: [2020, 2021, 2022, 2023, 2024], motor: "1.5 Turbo", litrosAceite: 4.0 },
      { nombre: "Tiggo 7", años: [2021, 2022, 2023, 2024], motor: "2.0 Turbo", litrosAceite: 4.5 },
      { nombre: "Arrizo 6", años: [2021, 2022, 2023, 2024], motor: "1.5 Turbo", litrosAceite: 4.0 },
    ],
  },
  {
    marca: "Citroën",
    modelos: [
      { nombre: "C3", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.2 / 1.6", litrosAceite: 3.8 },
      { nombre: "C4 Cactus", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.6 VTi", litrosAceite: 4.0 },
      { nombre: "C4 Lounge", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.6 THP", litrosAceite: 4.0 },
      { nombre: "Berlingo", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.6 HDI", litrosAceite: 4.5 },
      { nombre: "C5 Aircross", años: [2020, 2021, 2022, 2023, 2024], motor: "1.6 THP", litrosAceite: 4.0 },
    ],
  },
  {
    marca: "Chevrolet",
    modelos: [
      { nombre: "Onix", años: [2020, 2021, 2022, 2023, 2024], motor: "1.0 / 1.2 Turbo", litrosAceite: 3.5 },
      { nombre: "Cruze", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.4 / 1.8", litrosAceite: 4.0 },
      { nombre: "Tracker", años: [2021, 2022, 2023, 2024], motor: "1.2 Turbo", litrosAceite: 4.0 },
      { nombre: "S10", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.8 TDI", litrosAceite: 6.5 },
      { nombre: "Montana", años: [2023, 2024], motor: "1.2 Turbo", litrosAceite: 4.0 },
    ],
  },
  {
    marca: "Dodge",
    modelos: [
      { nombre: "Journey", años: [2018, 2019, 2020, 2021, 2022], motor: "2.4 / 3.6 V6", litrosAceite: 5.0 },
      { nombre: "Durango", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "3.6 V6 / 5.7 V8", litrosAceite: 6.0 },
      { nombre: "Ram 1500", años: [2019, 2020, 2021, 2022, 2023, 2024], motor: "3.6 V6 / 5.7 V8", litrosAceite: 6.5 },
    ],
  },
  {
    marca: "Fiat",
    modelos: [
      { nombre: "Cronos", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.3 / 1.8", litrosAceite: 3.8 },
      { nombre: "Argo", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.3 / 1.8", litrosAceite: 3.8 },
      { nombre: "Toro", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.8 / 2.0 TDI", litrosAceite: 4.5 },
      { nombre: "Pulse", años: [2022, 2023, 2024], motor: "1.3 Turbo", litrosAceite: 4.0 },
      { nombre: "Ducato", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.3 MultiJet", litrosAceite: 6.0 },
    ],
  },
  {
    marca: "Ford",
    modelos: [
      { nombre: "Ranger", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.2 / 3.2 TDI", litrosAceite: 7.0 },
      { nombre: "EcoSport", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.5 / 2.0", litrosAceite: 4.0 },
      { nombre: "Focus", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.6 / 2.0", litrosAceite: 4.0 },
      { nombre: "Territory", años: [2021, 2022, 2023, 2024], motor: "1.5 EcoBoost", litrosAceite: 4.5 },
      { nombre: "Maverick", años: [2022, 2023, 2024], motor: "2.0 EcoBoost", litrosAceite: 5.5 },
      { nombre: "Mustang", años: [2020, 2021, 2022, 2023, 2024], motor: "5.0 V8", litrosAceite: 8.0 },
    ],
  },
  {
    marca: "Honda",
    modelos: [
      { nombre: "City", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.5", litrosAceite: 3.8 },
      { nombre: "Civic", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.5 Turbo / 2.0", litrosAceite: 4.0 },
      { nombre: "WR-V", años: [2023, 2024], motor: "1.5", litrosAceite: 3.8 },
      { nombre: "HR-V", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.8 / 1.5 Turbo", litrosAceite: 4.2 },
      { nombre: "CR-V", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.5 Turbo / 2.0", litrosAceite: 4.5 },
    ],
  },
  {
    marca: "Hyundai",
    modelos: [
      { nombre: "HB20", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.0 / 1.6", litrosAceite: 3.5 },
      { nombre: "i30", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.4 / 2.0", litrosAceite: 4.0 },
      { nombre: "Creta", años: [2020, 2021, 2022, 2023, 2024], motor: "1.6", litrosAceite: 4.0 },
      { nombre: "Tucson", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.6 Turbo / 2.0", litrosAceite: 4.5 },
      { nombre: "Santa Fe", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.0 / 2.4", litrosAceite: 5.0 },
    ],
  },
  {
    marca: "Jeep",
    modelos: [
      { nombre: "Renegade", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.8 / 2.0 TDI", litrosAceite: 4.5 },
      { nombre: "Compass", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.3 Turbo / 2.0 TDI", litrosAceite: 5.0 },
      { nombre: "Cherokee", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "2.4 / 3.2 V6", litrosAceite: 5.5 },
      { nombre: "Gladiator", años: [2020, 2021, 2022, 2023, 2024], motor: "3.6 V6 / 3.0 TDI", litrosAceite: 6.0 },
    ],
  },
  {
    marca: "Mercedes Benz",
    modelos: [
      { nombre: "A 200", años: [2019, 2020, 2021, 2022, 2023, 2024], motor: "1.3 Turbo", litrosAceite: 5.5 },
      { nombre: "C 200", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.5 / 2.0 Turbo", litrosAceite: 6.0 },
      { nombre: "GLA 200", años: [2019, 2020, 2021, 2022, 2023, 2024], motor: "1.3 Turbo", litrosAceite: 5.5 },
      { nombre: "GLC 300", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.0 Turbo", litrosAceite: 6.5 },
      { nombre: "Sprinter", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.1 CDI", litrosAceite: 8.5 },
      { nombre: "Vito", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.6 / 2.1 CDI", litrosAceite: 6.5 },
    ],
  },
  {
    marca: "Nissan",
    modelos: [
      { nombre: "Versa", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.6", litrosAceite: 3.5 },
      { nombre: "March", años: [2018, 2019, 2020, 2021, 2022], motor: "1.6", litrosAceite: 3.5 },
      { nombre: "Kicks", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.6", litrosAceite: 4.0 },
      { nombre: "Frontier", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.3 TDI", litrosAceite: 6.5 },
      { nombre: "X-Trail", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.0 / 2.5", litrosAceite: 4.8 },
    ],
  },
  {
    marca: "Peugeot",
    modelos: [
      { nombre: "208", años: [2019, 2020, 2021, 2022, 2023, 2024], motor: "1.2 / 1.6", litrosAceite: 3.8 },
      { nombre: "2008", años: [2020, 2021, 2022, 2023, 2024], motor: "1.2 Turbo", litrosAceite: 4.0 },
      { nombre: "308", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.6 THP", litrosAceite: 4.0 },
      { nombre: "3008", años: [2020, 2021, 2022, 2023, 2024], motor: "1.6 THP", litrosAceite: 4.0 },
      { nombre: "Partner", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.6 HDI", litrosAceite: 4.5 },
      { nombre: "Landtrek", años: [2021, 2022, 2023, 2024], motor: "1.9 TDI", litrosAceite: 6.0 },
    ],
  },
  {
    marca: "Renault",
    modelos: [
      { nombre: "Sandero", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.6", litrosAceite: 3.5 },
      { nombre: "Logan", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.6", litrosAceite: 3.5 },
      { nombre: "Duster", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.6 / 2.0", litrosAceite: 4.0 },
      { nombre: "Kangoo", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.6 / 1.5 DCI", litrosAceite: 4.5 },
      { nombre: "Oroch", años: [2020, 2021, 2022, 2023, 2024], motor: "2.0", litrosAceite: 4.0 },
      { nombre: "Koleos", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.5", litrosAceite: 5.0 },
    ],
  },
  {
    marca: "Toyota",
    modelos: [
      { nombre: "Corolla", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.8 / 2.0", litrosAceite: 4.2 },
      { nombre: "Yaris", años: [2019, 2020, 2021, 2022, 2023, 2024], motor: "1.5", litrosAceite: 3.8 },
      { nombre: "Hilux", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.8 TDI", litrosAceite: 6.5 },
      { nombre: "RAV4", años: [2020, 2021, 2022, 2023, 2024], motor: "2.5", litrosAceite: 4.8 },
      { nombre: "SW4", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.8 TDI", litrosAceite: 7.0 },
      { nombre: "Land Cruiser Prado", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.8 TDI / 4.0 V6", litrosAceite: 7.5 },
    ],
  },
  {
    marca: "Volkswagen",
    modelos: [
      { nombre: "Gol", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.6", litrosAceite: 3.5 },
      { nombre: "Polo", años: [2019, 2020, 2021, 2022, 2023, 2024], motor: "1.6 / TSI", litrosAceite: 4.2 },
      { nombre: "Virtus", años: [2020, 2021, 2022, 2023, 2024], motor: "1.6 / 1.0 TSI", litrosAceite: 4.0 },
      { nombre: "T-Cross", años: [2020, 2021, 2022, 2023, 2024], motor: "1.0 TSI / 1.4 TSI", litrosAceite: 4.2 },
      { nombre: "Taos", años: [2021, 2022, 2023, 2024], motor: "1.4 TSI", litrosAceite: 4.5 },
      { nombre: "Vento", años: [2020, 2021, 2022, 2023, 2024], motor: "1.4 TSI", litrosAceite: 4.5 },
      { nombre: "Amarok", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "3.0 TDI", litrosAceite: 8.5 },
    ],
  },
];
