import { FlightDataGetType } from "@/services/models/post";
import { atom } from "jotai";

export const flightsAtom = atom<FlightDataGetType[]>([]);
