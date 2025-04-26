export interface ProductWithImages {
  id: string;
  stock: number;
  slug: string;
  price: number;
  sizes: string; // Or string[] if you parse the comma-separated string
  type: string;
  tags: string; // Or string[] if you parse the comma-separated string
  title: string;
  description: string;
  gender: string;
  user: string; // Assuming this is a user ID string
  images: string | null; // Or string[] if you parse the comma-separated string, null if no images
}
