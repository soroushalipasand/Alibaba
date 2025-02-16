interface MapComponentProps {
  lat: number;
  long: number;
  description?: string;
  name: string;
}
interface Hotel {
  id: number;
  name: string;
  description: string;
  location: {
    lat: number;
    long: number;
  };
}

interface Metric {
  id: string;
  name: string;
  startTime: number;
  value: number;
  label: string;
  delta: number;
  entries: PerformanceEntry[];
}
