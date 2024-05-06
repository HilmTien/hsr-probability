export function toPercent(number: number): number {
  return number * 100;
}

export function convolute(f_1: number[], f_2: number[]): number[] {
  const f_3 = new Array(f_1.length + f_2.length - 1).fill(0);

  for (let i = 0; i < f_1.length; i++) {
    for (let j = 0; j < f_2.length; j++) {
      f_3[i + j] += f_1[i] * f_2[j];
    }
  }

  return f_3;
}

export function accumulate(arr: number[]): number[] {
  const accumulated = [0];

  for (const element of arr) {
    accumulated.push(accumulated[accumulated.length - 1] + element);
  }

  return accumulated.slice(1);
}
