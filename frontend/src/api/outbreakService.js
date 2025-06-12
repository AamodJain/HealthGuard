export const fetchOutbreakData = async () => {
  try {
    const response = await fetch("http://localhost:8000/disease/getAll");
    if (!response.ok) {
      throw new Error("Failed to fetch outbreak data");
    }

    const data = await response.json();

    // Transform to match frontend chart components if needed
    return data.map((entry) => ({
      disease: entry.diseaseName,
      cases: entry.totalCases,
      active_cases: entry.activeCases,
      death_cases: entry.deaths,
      symptoms: entry.symptoms,
      state: entry.stateName,
      spread_factor: entry.spreadfactor,
      population: entry.population,
      recovered: entry.totalCases - entry.activeCases - entry.deaths
    }));
  } catch (error) {
    console.error("Error fetching outbreak data:", error);
    return [];
  }
};
