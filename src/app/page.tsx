"use client";

import ProbabilityForm from "@/components/probability/form";
import Table from "@/components/probability/probabilityTable";
import {
  useCharProbabilityStore,
  useLCProbabilityStore,
} from "@/lib/probabilityStore";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProbabilityForm
        useProbabilityStore={useCharProbabilityStore}
        name="Character"
      />
      <ProbabilityForm
        useProbabilityStore={useLCProbabilityStore}
        name="Light Cone"
      />
      <Table />
    </main>
  );
}
