"use client";

import createProbabilities from "@/lib/probability";
import Table from "@/components/ui/table";
import { accumulate, convolute, toPercent } from "@/lib/utils2";
import {
  useCharProbabilityStore,
  useLCProbabilityStore,
} from "@/lib/probabilityStore";

function collectData(
  f: number[],
  name: string,
  data: { name: string; data: string[] }[]
) {
  const F = accumulate(f);
  data.push({ name: name, data: [] });

  let prev_chance = 0;
  let last = false;

  for (let i = 0; i < F.length; i++) {
    if (prev_chance >= 0.95) {
      prev_chance = 0.94;
      last = true;
    }

    if (F[i] > prev_chance + 0.05) {
      data[data.length - 1].data.push(i.toString());
      prev_chance += 0.05;

      if (last) {
        break;
      }
    }
  }

  data[data.length - 1].data.push((F.length - 1).toString());
}

export default function ProbabilityTable() {
  const charValues = useCharProbabilityStore((state) => state.values);
  const lcValues = useLCProbabilityStore((state) => state.values);

  const character = createProbabilities(charValues);
  const lightCone = createProbabilities(lcValues);

  function promotedCharacter() {
    const promoted = Array.from(
      { length: charValues.hardPity + 1 },
      (_, index) => character.pmf(index) * (1 - charValues.promotionalRate)
    );
    promoted[0] = charValues.promotionalRate;
    const ordinary = Array.from(
      { length: charValues.hardPity + 1 },
      (_, index) => character.pmf(index)
    );

    return convolute(promoted, ordinary);
  }

  function promotedLightCone() {
    const promoted = Array.from(
      { length: lcValues.hardPity + 1 },
      (_, index) => lightCone.pmf(index) * (1 - lcValues.promotionalRate)
    );
    promoted[0] = lcValues.promotionalRate;
    const ordinary = Array.from({ length: lcValues.hardPity + 1 }, (_, index) =>
      lightCone.pmf(index)
    );

    return convolute(promoted, ordinary);
  }

  const data: { name: string; data: string[] }[] = [];

  const f_char = Array.from({ length: charValues.hardPity + 1 }, (_, index) =>
    character.pmf(index)
  );

  const f_lc = Array.from({ length: lcValues.hardPity + 1 }, (_, index) =>
    lightCone.pmf(index)
  );

  for (let e = 0; e <= 6; e++) {
    for (let s = 0; s <= 5; s++) {
      const f = new Array(e + s)
        .fill(promotedCharacter(), 0, e)
        .fill(promotedLightCone(), e)
        .reduce((prev, curr) => convolute(prev, curr), promotedCharacter());
      collectData(f, `E${e}${s ? `S${s}` : ""}`, data);
    }
  }

  for (let s = 0; s <= 5; s++) {
    const f = new Array(s)
      .fill(promotedLightCone())
      .reduce((prev, curr) => convolute(prev, curr), promotedLightCone());
    collectData(f, `S${s + 1}`, data);
  }

  collectData(f_char, "5*", data);
  collectData(f_lc, "5* LC", data);

  const headerProb = Array.from({ length: 19 }, (_, index) => (index + 1) * 5);
  headerProb.push(99);
  headerProb.push(100);

  return (
    <Table
      headerContent={headerProb.map((prob) => `P = ${prob} %`)}
      tableData={data}
    ></Table>
  );
}
