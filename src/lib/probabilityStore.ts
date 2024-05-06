import { create } from "zustand";

export type ProbabilityValues = {
  flatProbability: number;
  softPityStart: number;
  probabilityIncrease: number;
  hardPity: number;
  promotionalRate: number;
};

export type ProbabilityStore = {
  values: ProbabilityValues;
  setValues: (values: ProbabilityValues) => void;
};

export const useCharProbabilityStore = create<ProbabilityStore>((set) => ({
  values: {
    flatProbability: 0.006,
    softPityStart: 74,
    probabilityIncrease: 0.06,
    hardPity: 90,
    promotionalRate: 0.5,
  },
  setValues: (values: ProbabilityValues) => set(() => ({ values })),
}));

export const useLCProbabilityStore = create<ProbabilityStore>((set) => ({
  values: {
    flatProbability: 0.008,
    softPityStart: 66,
    probabilityIncrease: 0.08,
    hardPity: 80,
    promotionalRate: 0.75,
  },
  setValues: (values: ProbabilityValues) => set(() => ({ values })),
}));
