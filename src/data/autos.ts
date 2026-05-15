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
    marca: "Toyota",
    modelos: [
      { nombre: "Corolla", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.8 / 2.0", litrosAceite: 4.2 },
      { nombre: "Hilux", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.8 TDI", litrosAceite: 6.5 },
      { nombre: "Etios", años: [2018, 2019, 2020, 2021, 2022], motor: "1.5", litrosAceite: 3.5 },
      { nombre: "RAV4", años: [2020, 2021, 2022, 2023, 2024], motor: "2.5", litrosAceite: 4.8 },
    ],
  },
  {
    marca: "Ford",
    modelos: [
      { nombre: "Focus", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.6 / 2.0", litrosAceite: 4.0 },
      { nombre: "Ranger", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.2 / 3.2 TDI", litrosAceite: 7.0 },
      { nombre: "EcoSport", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.5 / 2.0", litrosAceite: 4.0 },
      { nombre: "Mustang", años: [2020, 2021, 2022, 2023, 2024], motor: "5.0 V8", litrosAceite: 8.0 },
    ],
  },
  {
    marca: "Volkswagen",
    modelos: [
      { nombre: "Gol", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.6", litrosAceite: 3.5 },
      { nombre: "Polo", años: [2019, 2020, 2021, 2022, 2023, 2024], motor: "1.6 / TSI", litrosAceite: 4.2 },
      { nombre: "Amarok", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "3.0 TDI", litrosAceite: 8.5 },
      { nombre: "Vento", años: [2020, 2021, 2022, 2023, 2024], motor: "1.4 TSI", litrosAceite: 4.5 },
    ],
  },
  {
    marca: "Chevrolet",
    modelos: [
      { nombre: "Cruze", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.4 / 1.8", litrosAceite: 4.0 },
      { nombre: "S10", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "2.8 TDI", litrosAceite: 6.5 },
      { nombre: "Onix", años: [2020, 2021, 2022, 2023, 2024], motor: "1.0 / 1.2 Turbo", litrosAceite: 3.5 },
      { nombre: "Tracker", años: [2021, 2022, 2023, 2024], motor: "1.2 Turbo", litrosAceite: 4.0 },
    ],
  },
  {
    marca: "Renault",
    modelos: [
      { nombre: "Sandero", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.6", litrosAceite: 3.5 },
      { nombre: "Duster", años: [2018, 2019, 2020, 2021, 2022, 2023, 2024], motor: "1.6 / 2.0", litrosAceite: 4.0 },
      { nombre: "Kangoo", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.6 / 1.5 DCI", litrosAceite: 4.5 },
      { nombre: "Oroch", años: [2020, 2021, 2022, 2023, 2024], motor: "2.0", litrosAceite: 4.0 },
    ],
  },
  {
    marca: "Peugeot",
    modelos: [
      { nombre: "208", años: [2019, 2020, 2021, 2022, 2023, 2024], motor: "1.2 / 1.6", litrosAceite: 3.8 },
      { nombre: "308", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.6 THP", litrosAceite: 4.0 },
      { nombre: "Partner", años: [2018, 2019, 2020, 2021, 2022, 2023], motor: "1.6 HDI", litrosAceite: 4.5 },
      { nombre: "3008", años: [2020, 2021, 2022, 2023, 2024], motor: "1.6 THP", litrosAceite: 4.0 },
    ],
  },
];
