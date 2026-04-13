import { useState, useEffect } from "react";

export default function useProducts(jsonPath = '/converted22.json') {
  const [saws, setsaws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return { saws, loading, error };
}