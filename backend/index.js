
  const express = require('express');
  const mysql = require('mysql');
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');

  const app = express();
  app.use(cors());
  app.use(bodyParser.json({ limit: '10mb' })); // Increase payload limit for Base64 images
  
  // MySQL Database Connection
  const db = mysql.createConnection({
        host: 'localhost', 
        port: 3308,
        user: 'root',      
        password: '',      
        database: 'vpmproducts'
  });
  
  db.connect(err => {
      if (err) throw err;
      console.log('✅ MySQL Connected...');
  });
  
  // 📌 Route: Upload & Add Product with Base64 Image
  app.post('/product', (req, res) => {
    const { name, description, old_price, new_price, category, available, weight, image,displayHome } = req.body;
    // Check if product name already exists
    const checkQuery = 'SELECT COUNT(*) AS count FROM products WHERE name = ?';
    
    db.query(checkQuery, [name], (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
  
      if (result[0].count > 0) {
        return res.status(400).json({ error: "Product name already exists!" });
      }
  
      // Insert product if it doesn't exist
      const insertQuery = `INSERT INTO products (name, description, old_price, new_price, category, available, weight, image,displayHome) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`;
      
      db.query(insertQuery, [name, description, old_price, new_price, category, available, weight, image,displayHome], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to add product" });
  
        res.status(201).json({ message: "Product added successfully!" });
      });
    });
  });
  
 // 🔹 API to Get All Products with Base64 Images
app.get("/products", (req, res) => {
    const query = "SELECT id, name, description, old_price, new_price, category, available, weight, image FROM products";
  
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      // Convert Buffer images to Base64 (if images are stored as BLOBs)
      const products = results.map((product) => {
        return {
          ...product,
          image: product.image.startsWith("data:image") ? product.image : `data:image/png;base64,${product.image.toString("base64")}`
        };
      });
  
      res.json(products);
    });
  });
  
  app.get("/product/:id", (req, res) => {
    const { id } = req.params;
  
    const query = "SELECT * FROM products WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json(result[0]); // ✅ Send correct JSON response
    });
  });
   
  // 📌 Route: Update Product with Base64 Image
  app.put('/product/:id', (req, res) => {
      const { name, description, old_price, new_price, category, available, weight, image,displayHome } = req.body;
      const { id } = req.params;
  
      let query = `UPDATE products SET 
                      name = ?, description = ?, old_price = ?, new_price = ?, 
                      category = ?, available = ?, weight = ?,displayHome=?`;
      const values = [name, description, old_price, new_price, category, available, weight,displayHome];
  
      if (image) {
          query += `, image = ?`;
          values.push(image);
      }
  
      query += ` WHERE id = ?`;
      values.push(id);
  
      db.query(query, values, (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
  
          if (result.affectedRows === 0) {
              return res.status(404).json({ message: 'Product not found' });
          }
  
          res.json({ message: 'Product updated successfully' });
      });
  });
  
  // 📌 Route: Delete Product
  app.delete('/product/:id', (req, res) => {
      const { id } = req.params;
      db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
  
          if (result.affectedRows === 0) {
              return res.status(404).json({ message: 'Product not found' });
          }
  
          res.json({ message: 'Product deleted successfully' });
      });
  });

//category
// 📌 Route: Upload & Add category
app.post('/category', (req, res) => {
    const { name, description } = req.body;

    // Check if category name already exists
    const checkQuery = 'SELECT COUNT(*) AS count FROM category WHERE name = ?';
    
    db.query(checkQuery, [name], (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
  
      if (result[0].count > 0) {
        return res.status(400).json({ error: "category name already exists!" });
      }
  
      // Insert category if it doesn't exist
      const insertQuery = `INSERT INTO category (name, description) VALUES (?, ?)`;
      
      db.query(insertQuery, [name, description], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to add category" });
  
        res.status(201).json({ message: "category added successfully!" });
      });
    });
  });
  
 // 🔹 API to Get All category
app.get("/category", (req, res) => {
    const query = "SELECT * FROM category";  
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }  
      res.json(results);
    });
  });
  
  app.get("/category/:id", (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM category WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result[0]); // Send category details
    });
  });
  
  
  // 📌 Route: Update category with Base64 Image
  app.put('/category/:id', (req, res) => {
      const { name, description } = req.body;
      const { id } = req.params;
  
      let query = `UPDATE category SET name = ?, description = ?`;
      const values = [name, description];

      query += ` WHERE id = ?`;
      values.push(id);
  
      db.query(query, values, (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
  
          if (result.affectedRows === 0) {
              return res.status(404).json({ message: 'category not found' });
          }
  
          res.json({ message: 'category updated successfully' });
      });
  });
  
  // 📌 Route: Delete category
  app.delete('/category/:id', (req, res) => {
      const { id } = req.params;
      db.query('DELETE FROM category WHERE id = ?', [id], (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
  
          if (result.affectedRows === 0) {
              return res.status(404).json({ message: 'category not found' });
          }
  
          res.json({ message: 'category deleted successfully' });
      });
  });

// admin code ends

// frontend code starts
//get cart values
app.get("/cart/:user_id", (req, res) => {
    const { user_id } = req.params;
    const query = "SELECT * FROM cart WHERE user_id = ?";
    db.query(query, [user_id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result); // Send cart details
    });
  });

  
// Add to Cart
app.post("/cart",  (req, res) => {
    const { user_id, product_id, name, new_price, quantity,image } = req.body;
    try {
       db.query(
        "INSERT INTO cart (user_id, product_id, name, new_price, quantity,image) VALUES (?, ?, ?, ?, ?,?) ON DUPLICATE KEY UPDATE quantity = quantity + 1",
        [user_id, product_id, name, new_price, quantity,image]
      );
      res.json({ message: "Product added to cart!" });
    } catch (error) {
      res.status(500).json({ error: "Database error" });
    }
  });
  
  // Increase Quantity
app.put("/cart/increase", (req, res) => {
    const { user_id, product_id } = req.body;
  
    // ✅ Fetch current quantity
    db.query("SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?", [user_id, product_id], (err, rows) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
  
      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: "Product not found in cart" });
      }
      // ✅ Increase quantity
      db.query("UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?", [user_id, product_id], (err) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }
  
        // ✅ Fetch updated product
        db.query("SELECT * FROM cart WHERE user_id = ? AND product_id = ?", [user_id, product_id], (err, updatedRows) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
          }
  
          res.json(updatedRows[0]); // ✅ Return updated product data
        });
      });
    });

  });
  
  
  app.put("/cart/decrease", (req, res) => {
    const { user_id, product_id } = req.body;
  
    // ✅ Fetch current quantity
    db.query("SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?", [user_id, product_id], (err, rows) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
  
      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: "Product not found in cart" });
      }
      // ✅ Increase quantity
      db.query("UPDATE cart SET quantity = quantity - 1 WHERE user_id = ? AND product_id = ?", [user_id, product_id], (err) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }
  
        // ✅ Fetch updated product
        db.query("SELECT * FROM cart WHERE user_id = ? AND product_id = ?", [user_id, product_id], (err, updatedRows) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
          }
  
          res.json(updatedRows[0]); // ✅ Return updated product data
        });
      });
    });

  });
  

  

// ✅ Remove Item from Cart
app.delete("/cart/remove", (req, res) => {
  const { user_id, product_id } = req.body;

  db.query("DELETE FROM cart WHERE user_id = ? AND product_id = ?", [user_id, product_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    res.json({ message: "Item removed from cart", product_id });
  });
});


//wishlist
//get wishlist values
app.get("/wishlist/:user_id", (req, res) => {
  const { user_id } = req.params;
  const query = "SELECT * FROM wishlist WHERE user_id = ?";
  db.query(query, [user_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result); // Send wishlist details
  });
});



app.post("/wishlist", (req, res) => {
  const { user_id, product_id, new_price, name, image } = req.body;

  // ✅ Step 1: Check if the product is already in the wishlist
  const checkQuery = "SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?";
  db.query(checkQuery, [user_id, product_id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Product already in wishlist!" }); // ✅ Prevent duplicate entry
    }

    // ✅ Step 2: Insert new product into the wishlist
    const insertQuery = "INSERT INTO wishlist (user_id, product_id, new_price, name, image) VALUES (?, ?, ?, ?, ?)";
    db.query(insertQuery, [user_id, product_id, new_price, name, image], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ message: "Product added to wishlist!", wishlist_id: result.insertId });
    });
  });
});

// ✅ Remove Item from wishlist
app.delete("/wishlist/remove", (req, res) => {
const { user_id, product_id } = req.body;

db.query("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?", [user_id, product_id], (err, result) => {
  if (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: "Database error" });
  }

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Item not found in wishlist" });
  }

  res.json({ message: "Item removed from wishlist", product_id });
});
});




  //user creation
  
  const JWT_SECRET = "test_token";

  // Signup
  app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating user." });
      }
      res.status(201).json({ message: "User registered successfully." });
    });
  });
  
  // Login
  app.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email],  (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error retrieving user." });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found." });
      }
  
      const user = results[0];
      const isMatch =  bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      const token = jwt.sign({ id: user.id,email:user.email,username:user.username }, JWT_SECRET);
      res.status(200).json({ username: user.username, token,id: user.id });

      // res.json({ message: "Login successful", token });
    });
  });
  
  // Fetch a single user by ID
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results[0]);
  });
});
// Edit a user
  
app.put('/user/:id',  (req, res) => {

  const { id } = req.params;
  const { phone,username,address1, address2, zipcode} = req.body;
  let query = 'UPDATE users SET phone = ? ,username=?, address1=?, address2=? , zipcode=?'
  const values = [phone,username,address1, address2, zipcode];

  query += ' WHERE id = ?';
  values.push(id);

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.json({ message: 'user updated successfully' });
  });
});


// API to get products by category
app.get("/products/category/:categoryName", (req, res) => {
    const categoryName = req.params.categoryName;
  
    const query = `
      SELECT p.*, c.name AS category_name
      FROM products p
      JOIN category c ON p.category = c.id
      WHERE c.name = ?
    `;
  
    db.query(query, [categoryName], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
      } else {
        res.json(results);
      }
    });
  });
  


  
// API to get products by category and displayHome
app.get("/displayHome/Cat", (req, res) => {

  const query = "SELECT * FROM products WHERE displayHome = 1";

  db.query(query,  (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(results);
  });
});





 //product name check whether exists or not 
  app.get('/search-product-name/:name', (req, res) => {
    const { name } = req.params;
    const query = 'SELECT name FROM products WHERE name LIKE ? LIMIT 5'; // Limit results for performance
  
    db.query(query, [`%${name}%`], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
  
      res.json(result.map(row => row.name)); // Send only product names
    });
  });
    
  // Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});