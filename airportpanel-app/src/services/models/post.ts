export type UserDataType = {
  avatar: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
};

export type LoginDataType = {
  email: string;
  password: string;
};

export type FlightDataType = {
  flightNumber: string;
  origin: string;
  destination: string;
  departureDate: Date;
  arrivalDate: Date;
  status: eFlightStatus;
  terminal: string;
  gate: string;
  companyId: string
}

export type FlightDataGetType = {
  _id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureDate: Date;
  arrivalDate: Date;
  status: eFlightStatus;
  terminal: string;
  gate: string;
  companyId: {
    _id: string;
    logo: string;
  };
}

export enum eFlightStatus {
  ontime = 'ontime',
  delayed = 'delayed',
  cancelled = 'cancelled',
  boarding = 'boarding',
  departed = 'departed',
  landed = 'landed',
  arrived = 'arrived',
  scheduled = 'scheduled',
  unknown = 'unknown',
}

export const FlightStatus = [
  {
    value: eFlightStatus.ontime,
    label: 'No horário',
    color: 'green',
  },
  {
    value: eFlightStatus.delayed,
    label: 'Atrasado',
    color: 'yellow',
  },
  {
    value: eFlightStatus.cancelled,
    label: 'Cancelado',
    color: 'red',
  },
  {
    value: eFlightStatus.boarding,
    label: 'Embarque',
    color: 'blue',
  },
  {
    value: eFlightStatus.departed,
    label: 'Partiu',
    color: 'yellow',
  },
  {
    value: eFlightStatus.landed,
    label: 'Pousado',
    color: 'blue',
  },
  {
    value: eFlightStatus.arrived,
    label: 'Finalizado',
    color: 'green',
  },
  {
    value: eFlightStatus.scheduled,
    label: 'Agendado',
    color: 'yellow',
  },
  {
    value: eFlightStatus.unknown,
    label: 'Desconhecido',
    color: 'red',
  },
]
