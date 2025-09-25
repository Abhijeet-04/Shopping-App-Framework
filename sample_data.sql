-- Sample Data for Shopping Cart Application

-- This script populates the database with sample users, products, and carts.
-- It also creates a sample order to demonstrate the complete schema.

-- Clear existing data to prevent conflicts on re-running the script
TRUNCATE TABLE users, products, shopping_carts, cart_items, orders, order_items RESTART IDENTITY CASCADE;

-- Insert Users
-- Passwords should be properly hashed in a real application. These are for example purposes.
INSERT INTO users (username, email, password_hash) VALUES
('john_doe', 'john.doe@example.com', '$2b$10$f/3v.h.c_0P7Ym.v1.t4GuB4E8k.C1D4.U8hD.C/A.j/3f.a/2g.j'),
('jane_smith', 'jane.smith@example.com', '$2b$10$k/9a.b.c_2D4Efg.h.i/1jKlMn.o.pQrS.tUvWxYz.aBcDeFgH.i');

-- Insert Products
INSERT INTO products (name, description, price, stock_quantity) VALUES
('Laptop Pro', 'A powerful laptop for professionals', 1200.00, 50),
('Wireless Mouse', 'An ergonomic wireless mouse', 75.50, 200),
('Mechanical Keyboard', 'A mechanical keyboard with RGB lighting', 150.00, 100),
('4K Monitor', 'A 27-inch 4K UHD monitor', 450.00, 75),
('HD Webcam', 'A 1080p webcam for video conferencing', 99.99, 150);

-- Create Shopping Carts for Users
-- John's cart
INSERT INTO shopping_carts (user_id) VALUES ((SELECT id FROM users WHERE username = 'john_doe'));
-- Jane's cart
INSERT INTO shopping_carts (user_id) VALUES ((SELECT id FROM users WHERE username = 'jane_smith'));

-- Add Items to John's Cart
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
((SELECT id FROM shopping_carts WHERE user_id = (SELECT id FROM users WHERE username = 'john_doe')), (SELECT id FROM products WHERE name = 'Laptop Pro'), 1),
((SELECT id FROM shopping_carts WHERE user_id = (SELECT id FROM users WHERE username = 'john_doe')), (SELECT id FROM products WHERE name = 'Wireless Mouse'), 1);

-- Add Items to Jane's Cart
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
((SELECT id FROM shopping_carts WHERE user_id = (SELECT id FROM users WHERE username = 'jane_smith')), (SELECT id FROM products WHERE name = 'Mechanical Keyboard'), 2),
((SELECT id FROM shopping_carts WHERE user_id = (SELECT id FROM users WHERE username = 'jane_smith')), (SELECT id FROM products WHERE name = '4K Monitor'), 1);

-- Create a Completed Order for Jane
-- This demonstrates moving items from a cart to an order
WITH new_order AS (
    INSERT INTO orders (user_id, total_amount, status)
    VALUES (
        (SELECT id FROM users WHERE username = 'jane_smith'),
        750.00, -- (2 * 150.00 for keyboards) + 450.00 for monitor
        'completed'
    )
    RETURNING id
)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
((SELECT id FROM new_order), (SELECT id FROM products WHERE name = 'Mechanical Keyboard'), 2, 150.00),
((SELECT id FROM new_order), (SELECT id FROM products WHERE name = '4K Monitor'), 1, 450.00);

-- It's good practice to update stock quantity after an order is placed
UPDATE products SET stock_quantity = stock_quantity - 2 WHERE name = 'Mechanical Keyboard';
UPDATE products SET stock_quantity = stock_quantity - 1 WHERE name = '4K Monitor';

