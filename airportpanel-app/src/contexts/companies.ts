import { atom } from "jotai";

export type Company =  {
    _id: string,
    logo: string,
    name: string,
    updatedAt: Date
}

export const CompaniesAtom = atom<Company[]>([]);