import { useState, useEffect } from "react";
import rawSaws from '../data/converted22.json'

  /*  const [saws, setsaws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
*/
  /*
  useEffect(() => {
    let isMounted = true; // zabezpieczenie przed aktualizacją po odmontowaniu

    const fetchProducts = async () => {
      try {
        const res = await fetch(jsonPath);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (isMounted) setsaws(data.root.items || []);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false; // cleanup
    };
  }, [jsonPath]);
*/


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