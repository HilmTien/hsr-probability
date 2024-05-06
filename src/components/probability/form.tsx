"use client";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProbabilityStore } from "@/lib/probabilityStore";
import { StoreApi, UseBoundStore } from "zustand";

const formSchema = z
  .object({
    flatProbability: z.number().gt(0, {
      message: "Probability cannot be less than or equal to 0",
    }),
    softPityStart: z
      .number()
      .int({
        message: "Pity count must be a whole number",
      })
      .gt(0, {
        message: "Starting pity count must be greater than 0",
      }),
    probabilityIncrease: z.number().gte(0, {
      message: "Probability increase cannot be less than 0",
    }),
    hardPity: z.number().int().gt(0, {
      message: "Pity count must be greater than 0",
    }),
    promotionalRate: z
      .number()
      .gt(0, {
        message: "Probability cannot be less than or equal to 0",
      })
      .lte(1, {
        message: "Probability cannot be greater than 1",
      }),
  })
  .refine((data) => data.hardPity > data.softPityStart, {
    message: "Soft pity cannot begin after hard pity",
    path: ["softPityStart"],
  });

type ProbabilityFormProps = {
  useProbabilityStore: UseBoundStore<StoreApi<ProbabilityStore>>;
  name: string;
};

export default function ProbabilityForm({
  useProbabilityStore,
  name,
}: ProbabilityFormProps) {
  const setValues = useProbabilityStore((state) => state.setValues);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setValues(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useProbabilityStore((state) => state.values),
  });

  return (
    <div className="flex flex-col gap-2 w-full mb-8 items-center">
      <h1 className="text-xl font-bold">{name}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full justify-evenly items-end"
        >
          <FormField
            control={form.control}
            name="flatProbability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flat probability per roll</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0,006"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="softPityStart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soft pity start</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="74"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="probabilityIncrease"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Probability increase per roll after soft pity start
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0,06"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hardPity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hard pity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="90"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="promotionalRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Promotional rate</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.5"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
