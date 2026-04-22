import rawMachines from '../data/przecinarki.json';

const machines = rawMachines.map((m, index) => ({
  id: `row-${index}`,
  imageUrl: m.Image_URL,
  name: m.Name,
  manufacturer: m.Producer,
  category: m.Type,
  length: m.Length,
  width: m.Width,
  thickness: m.Thickness,
}));

export default function useMachines() {
  return { machines };
}