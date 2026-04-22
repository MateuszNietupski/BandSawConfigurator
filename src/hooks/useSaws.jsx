import rawSaws from '../data/tasmowe_pily.json'


  const saws = rawSaws.map((p, index) => ({
    ...p,
    id: `row-${index}`,
    Length: Number(p.Length),
    Width: Number(p.Width),
    Thickness: Number(p.Thickness),
    Price: Number(p.Price)
  }));


export default function useSaws(){
  return { saws };
}