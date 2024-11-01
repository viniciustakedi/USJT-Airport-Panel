import { atom } from "jotai";

export type Airport =  {
    _id: string,
    airport: string,
    airportAcronym: string,
    terminals: string[],
    gates: string[],
    updatedAt: Date
}

export const AirportsAtom = atom<Airport[]>([]);