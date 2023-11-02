export type FiltreGroup = {
    id: number; // Assuming 'id' is of type number
    id_user: number;
    label: string;
    filters: string[]; // JSON data; you can specify a more specific type
    from: string;
  };

