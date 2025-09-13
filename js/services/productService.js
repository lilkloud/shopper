import apiService from '../apiService';

// Get all products with optional filters and pagination
export const getProducts = async (params = {}) => {
  try {
    const { page = 1, keyword = '', category = '' } = params;
    const queryParams = new URLSearchParams({
      page,
      keyword,
      category,
    });

    const data = await apiService.products.getProducts(queryParams.toString());
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, error: error.message };
  }
};

// Get a single product by ID
export const getProductById = async (id) => {
  try {
    const data = await apiService.products.getProduct(id);
    return { success: true, data };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return { success: false, error: error.message };
  }
};

// Get top rated products
export const getTopProducts = async () => {
  try {
    const data = await apiService.products.getTopProducts();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching top products:', error);
    return { success: false, error: error.message };
  }
};

// Create a new product (admin only)
export const createProduct = async (productData, token) => {
  try {
    const data = await apiService.products.createProduct(productData, token);
    return { success: true, data };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: error.message };
  }
};

// Update a product (admin only)
export const updateProduct = async (id, productData, token) => {
  try {
    const data = await apiService.products.updateProduct(id, productData, token);
    return { success: true, data };
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    return { success: false, error: error.message };
  }
};

// Delete a product (admin only)
export const deleteProduct = async (id, token) => {
  try {
    await apiService.products.deleteProduct(id, token);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    return { success: false, error: error.message };
  }
};

// Create a product review
export const createProductReview = async (productId, reviewData, token) => {
  try {
    await apiService.products.createReview(productId, reviewData, token);
    return { success: true };
  } catch (error) {
    console.error(`Error creating review for product ${productId}:`, error);
    return { success: false, error: error.message };
  }
};

export default {
  getProducts,
  getProductById,
  getTopProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
