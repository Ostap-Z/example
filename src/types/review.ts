interface Review {
  title: string;
  comment: string;
  rating: 1 | 2 | 3 | 4 | 5;
  recommendation: 'Yes' | 'No';
}

export type { Review };
