import { pool } from '../loaders/postgres';

export const addProductToCart = async (userId: string, productId: string, quantity: number) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Get or create a shopping cart for the user
    let cartResult = await client.query('SELECT id FROM shopping_carts WHERE user_id = $1', [userId]);
    let cartId;
    if (cartResult.rows.length === 0) {
      cartResult = await client.query('INSERT INTO shopping_carts (user_id) VALUES ($1) RETURNING id', [userId]);
      cartId = cartResult.rows[0].id;
    } else {
      cartId = cartResult.rows[0].id;
    }

    // Check if the item already exists in the cart
    const existingItem = await client.query('SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2', [cartId, productId]);

    if (existingItem.rows.length > 0) {
      // Update quantity if the item exists
      const newQuantity = existingItem.rows[0].quantity + quantity;
      await client.query('UPDATE cart_items SET quantity = $1 WHERE id = $2', [newQuantity, existingItem.rows[0].id]);
    } else {
      // Insert new item if it does not exist
      await client.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)', [cartId, productId, quantity]);
    }

    await client.query('COMMIT');

    // Return the updated cart contents
    const updatedCart = await client.query('SELECT * FROM cart_items WHERE cart_id = $1', [cartId]);
    return updatedCart.rows;

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
