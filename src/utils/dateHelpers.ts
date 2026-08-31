export function monthKey(dateStr: string): string {
  return dateStr.slice(0, 7);
}

type GroupableRow = {
  date: string;
  value: number;
  category: string; 
};

type SeriesResult = {
  series: { name: string; data: number[] }[];
  categories: string[]; 
};

export function groupByMonthAndCategory(rows: GroupableRow[]): SeriesResult {
  const uniqueMonths = Array.from(
    new Set(rows.map((row) => monthKey(row.date)))
  ).sort();

  const uniqueCategories = Array.from(
    new Set(rows.map((row) => row.category))
  );

  const series = uniqueCategories.map((cat) => {
    const data = uniqueMonths.map((month) => {
      const total = rows
        .filter(
          (row) => monthKey(row.date) === month && row.category === cat
        )
        .reduce((sum, row) => sum + Number(row.value), 0);
      return total;
    });
    return { name: cat, data };
  });

  return { series, categories: uniqueMonths };
}