import rawMachines from '../data/csvjson2.json';

const machines = rawMachines.map((m, index) => ({
  id: `row-${index}`,
  name: m.Name,
  manufacturer: m.Producer,
  length: m.Length,
  width: m.Width,
  thickness: m.Thickness,
}));

export default function useMachines() {
  return { machines };
}