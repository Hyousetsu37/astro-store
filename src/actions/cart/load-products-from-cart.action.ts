import type { CartItem } from "@/interfaces/cart-item";
import { defineAction } from "astro:actions";
import { db, eq, inArray, Product, ProductImage } from "astro:db";
import { z } from "astro:schema";

// If Fixed

// export const loadProductsFromCart = defineAction({
//   accept: "json",
//   //   input: z.string(),
//   handler: async (_, {cookies}) => {
//     const cart = JSON.parse(cookies.get("cart")?.value ?? "") as CartItem[];
//     if (cart.length === 0) return [];
//     return [];
//   },
// });

export const loadProductsFromCart = defineAction({
  accept: "json",
  input: z.array(
    z.object({
      productId: z.string(),
      size: z.string(),
      quantity: z.number(),
    })
  ),
  handler: async (cart, ctx) => {
    if (cart.length === 0) return [];

    const productIds = cart.map((item) => item.productId);
    const dbProducts = await db
      .select()
      .from(Product)
      .innerJoin(ProductImage, eq(Product.id, ProductImage.productId))
      .where(inArray(Product.id, productIds));

    return cart.map((item) => {
      const dbProduct = dbProducts.find((p) => p.Product.id === item.productId);

      if (!dbProduct) {
        throw new Error(`Product with id ${item.productId} not found`);
      }

      const { title, price, slug } = dbProduct.Product;
      const image = dbProduct.ProductImage.image;

      return {
        productId: item.productId,
        title: title,
        size: item.size,
        quantity: item.quantity,
        image: image.startsWith("http")
          ? image
          : `${import.meta.env.PUBLIC_URL}/images/products/${image}`,
        price: price,
        slug: slug,
      };
    });
  },
});
