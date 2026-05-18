const db = require("../db"); 
class Product 
{ 


    // ======== OBTENER TODOS =================// 
static async getAll() 
{ const [rows] = await db.execute(`
     SELECT 
     p.*, c.nombre AS categoria_nombre, pr.nombre AS proveedor_nombre FROM productos p 
     LEFT JOIN categorias c ON p.categoria_id = c.id 
     LEFT JOIN proveedores pr ON p.proveedor_id = pr.id 
     ORDER BY p.id DESC `); 
     return rows; 
    } 
  
    // CREAR PRODUCTO // 
    static async create(data) 
    {
         const 
         { nombre, categoria_id, proveedor_id, fecha_elaboracion, fecha_vencimiento, cantidad, stock_minimo, stock_actual, sku, precio_costo, precio_venta 

         } = data; 
         
         const [result] = await db.execute(` 
            INSERT INTO productos ( nombre, categoria_id, proveedor_id, fecha_elaboracion, fecha_vencimiento, cantidad, stock_minimo, stock_actual, sku, precio_costo, precio_venta ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `, 
            [ nombre, categoria_id, proveedor_id, fecha_elaboracion, fecha_vencimiento, cantidad, stock_minimo, stock_actual, sku, precio_costo, precio_venta ]); 
            return result.insertId; } 
            

   // ACTUALIZAR PRODUCTO // 
static async update(id, productData) { 
    const 
    { nombre, categoria_id, proveedor_id, fecha_elaboracion, fecha_vencimiento, cantidad, stock_minimo, stock_actual, sku, precio_costo, precio_venta 

    } = productData; 
    await db.execute(` 
        UPDATE productos SET nombre = ?, categoria_id = ?, proveedor_id = ?, fecha_elaboracion = ?, fecha_vencimiento = ?, cantidad = ?, stock_minimo = ?, stock_actual = ?, sku = ?, precio_costo = ?, precio_venta = ? WHERE id = ? `, 
        [ nombre, categoria_id, proveedor_id, fecha_elaboracion, fecha_vencimiento, cantidad, stock_minimo, stock_actual, sku, precio_costo, precio_venta, id ]);
    }
    
  // ELIMINAR // 
static async delete(id) 
 { 
    await db.execute( 
        `DELETE FROM productos WHERE id = ?`,
         [id] ); 
 }
} 
     
module.exports = Product;