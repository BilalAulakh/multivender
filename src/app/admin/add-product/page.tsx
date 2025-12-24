'use client';

import { useState, useEffect } from 'react';
import api from '../../../helper/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function AddProductPage() {
  const { token } = useSelector((state: RootState) => state.auth);
  const [categories, setCategories] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔍 DEBUG - API Base URL:', process.env.NEXT_PUBLIC_API_URL);
        console.log('🔍 DEBUG - Full Categories URL:', `${process.env.NEXT_PUBLIC_API_URL}/products/categories`);
        
        const catRes = await api.get('/products/categories');
        setCategories(catRes.data);

        if (token) {
          const vendRes = await api.get('/products/vendors');
          setVendors(vendRes.data);
        }
      } catch (error) {
        console.error('Error fetching data', error);
        setMessage({ type: 'error', text: 'Failed to load categories and vendors' });
      }
    };
    fetchData();
  }, [token]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
    description: Yup.string(),
    price: Yup.number().required('Price is required').positive('Price must be positive').integer('Must be integer'),
    discountPrice: Yup.number()
      .positive()
      .integer()
      .nullable()
      .test('less-than-price', 'Discount must be less than price', function (value) {
        const { price } = this.parent;
        if (!value || !price) return true;
        return value < price;
      }),
    stock: Yup.number().required('Stock is required').min(0).integer(),
    categoryId: Yup.string().required('Category is required'),
    vendorId: Yup.string().required('Vendor is required'),
    images: Yup.array().min(1, 'At least one image is required'), // Now it's an array
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      discountPrice: '',
      stock: '',
      categoryId: '',
      vendorId: '',
      images: [] as File[], // Array of File objects
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setMessage({ type: '', text: '' });

      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('price', values.price);
        if (values.discountPrice) {
          formData.append('discountPrice', values.discountPrice);
        }
        formData.append('stock', values.stock);
        formData.append('categoryId', values.categoryId);
        formData.append('vendorId', values.vendorId);

        // Append images using the 'images' key (matching backend expectation)
        values.images.forEach((file) => {
          formData.append('images', file);
        });

        await api.post('/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setMessage({ type: 'success', text: 'Product added successfully!' });
        resetForm();
        setPreviews([]); // Clear previews
      } catch (error: any) {
        setMessage({
          type: 'error',
          text: error.response?.data?.message || 'Failed to add product',
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        newFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    });

    // Append new images to existing ones
    formik.setFieldValue('images', [...formik.values.images, ...newFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);

    // Reset input
    e.target.value = '';
  };

  // Remove image by index
  const removeImage = (index: number) => {
    const updatedImages = formik.values.images.filter((_, i) => i !== index);
    formik.setFieldValue('images', updatedImages);
    
    setPreviews((prev) => {
      const updatedPreviews = prev.filter((_, i) => i !== index);
      // Optional: Revoke URL to avoid memory leak if needed, strictly speaking
      // URL.revokeObjectURL(prev[index]); 
      return updatedPreviews;
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Add New Product</h2>

      {message.text && (
        <div
          className={`p-4 mb-6 rounded-md text-sm font-medium ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Price & Discount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.price}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              value={formik.values.discountPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            {formik.touched.discountPrice && formik.errors.discountPrice && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.discountPrice}</p>
            )}
          </div>
        </div>

        {/* Stock & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
            <input
              type="number"
              name="stock"
              value={formik.values.stock}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            {formik.touched.stock && formik.errors.stock && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.stock}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {formik.touched.categoryId && formik.errors.categoryId && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.categoryId}</p>
            )}
          </div>
        </div>

        {/* Vendor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vendor *</label>
          <select
            name="vendorId"
            value={formik.values.vendorId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Select Vendor</option>
            {vendors.map((ven) => (
              <option key={ven.id} value={ven.id}>
                {ven.storeName}
              </option>
            ))}
          </select>
          {formik.touched.vendorId && formik.errors.vendorId && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.vendorId}</p>
          )}
        </div>

        {/* Images Upload - Perfect Working */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Images * (At least 1)</label>
          
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Image Previews */}
          {formik.values.images.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Image Previews ({formik.values.images.length})</p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {previews.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formik.touched.images && formik.errors.images && (
            <p className="text-red-600 text-sm mt-2">{formik.errors.images as string}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting || formik.values.images.length === 0}
          className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition-all ${
            formik.isSubmitting || formik.values.images.length === 0
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-md'
          }`}
        >
          {formik.isSubmitting ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}