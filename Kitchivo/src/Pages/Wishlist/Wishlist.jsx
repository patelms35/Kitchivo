import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import ProductPrice from '../../components/ProductPrice';
import deleteIcon from "../../assets/delete.svg";
import { createWishlist, getWishlist, removeWishlist } from '../../redux/slices/CommanSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProfile } from '../../redux/slices/AuthSlice';
import SEO from '../../components/SEO';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wishlist, loading } = useSelector((state) => state.commanStore);
  const items = wishlist?.items || [];
  const totalItems = wishlist?.total_items ?? items.length;

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  // const handleRemoveFromWishlist = async (wishlistItemId) => {
  //   try {
  //     const resultAction = await dispatch(
  //       removeWishlist({ wishlist_item_id: wishlistItemId })
  //     );
  //     if (resultAction?.payload?.status === 1) {
  //       toast.success(resultAction?.payload?.message || 'Removed from wishlist');
  //       dispatch(getWishlist());
  //     } else {
  //       toast.error(resultAction?.payload?.message || 'Failed to remove from wishlist');
  //     }
  //   } catch (error) {
  //     toast.error('Failed to remove from wishlist');
  //   }
  // };

  const handleAddToWishlist = async (product) => {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        title: 'Login required',
        text: 'Please login first to add products to your wishlist.',
        icon: 'warning',
        confirmButtonText: 'Login',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    // if (product?.is_wishlisted) {
    //   return;
    // }

    const productId = product?.id;
    if (!productId) {
      return;
    }

    try {
      const resultAction = await dispatch(createWishlist({ product_id: productId }));
      if (resultAction?.payload?.status == 1) {
        toast.success(resultAction?.payload?.message || 'Added to wishlist');
        dispatch(getWishlist());
        dispatch(getProfile());
      } else {
        toast.error(resultAction?.payload?.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  };

  const handleAddToCart = (product) => {
    // Placeholder for future cart integration
    toast.info('Add to Cart functionality will be implemented soon.');
  };

  const getVariantPrimaryImage = (product) => {
    if (!product?.variants || product.variants.length === 0) return null;
    for (const variant of product.variants) {
      if (variant.images && variant.images.length > 0) {
        const primary = variant.images.find((img) => img.is_primary) || variant.images[0];
        if (primary?.url) return primary.url;
      }
    }
    return null;
  };

  const getPrimaryImage = (product) => {
    const variantImg = getVariantPrimaryImage(product);
    if (variantImg) return variantImg;
    if (product?.featured_image) return product.featured_image;
    if (product?.common_images && product.common_images.length > 0) {
      return product.common_images[0].url;
    }
    return null;
  };

  const handleBuyOnAmazon = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <SEO
        title="My Wishlist - Saved Products | Kitchivo"
        description="View and manage your saved kitchen and home products. Keep track of your favorite items and shop them when you're ready."
        keywords="wishlist, saved products, favorite items, kitchivo wishlist, my favorites"
        canonicalUrl={`${window.location.origin}/wishlist`}
        noindex={true}
      />
      <Navbar />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Wishlist' }
        ]}
      />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              My Wishlist
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          {items.length > 0 && (
            <div className="flex gap-3">
              <Link
                to="/"
                className="px-4 py-2 bg-lima-600 text-white rounded-lg font-semibold text-sm hover:bg-lima-700 transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Wishlist Items */}
        {loading && !wishlist && (
          <div className="flex items-center justify-center py-10 text-gray-500 text-sm">
            Loading wishlist...
          </div>
        )}

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {items.map(({ wishlist_item_id, product }) => {
              const primaryImage = getPrimaryImage(product);
              const thumbnails = product?.common_images || [];

              return (
                <div key={wishlist_item_id} className="relative group/card bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                  {/* Remove Button */}
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="absolute top-2 right-2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-error-100 text-white rounded-full flex items-center justify-center cursor-pointer transition-all"
                    aria-label="Remove from wishlist"
                  >
                    <img src={deleteIcon} alt="Remove from wishlist" />
                  </button>

                  {/* Image */}
                  <div className="w-full aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden">
                    {primaryImage ? (
                      <img
                        src={primaryImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No image</div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    {product.category?.name && (
                      <p className="text-xs text-gray-500 mb-2">{product.category.name}</p>
                    )}

                    {/* Price */}
                    <div className="mb-2">
                      <ProductPrice product={product} />
                    </div>

                    {/* Sizes */}
                    {product.available_sizes?.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Available Sizes</p>
                        <div className="flex flex-wrap gap-1.5">
                          {product.available_sizes.map((size) => (
                            <span
                              key={size.id}
                              className="px-2 py-0.5 border border-gray-300 rounded text-[11px] text-gray-700"
                            >
                              {size.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Colors */}
                    {product.available_colors?.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Available Colors</p>
                        <div className="flex flex-wrap gap-2">
                          {product.available_colors.map((color) => (
                            <div key={color.id} className="flex items-center gap-1">
                              <span
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color.hex_code || '#e5e7eb' }}
                              />
                              <span className="text-[11px] text-gray-600">
                                {color.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Thumbnails */}
                    {thumbnails.length > 0 && (
                      <div className="mt-2 mb-3">
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {thumbnails.map((img) => (
                            <div
                              key={img.id}
                              className="w-10 h-10 rounded border border-gray-200 overflow-hidden flex-shrink-0"
                            >
                              <img
                                src={img.url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-auto flex flex-col gap-2 pt-2">
                      <button
                        onClick={() => handleBuyOnAmazon(product?.url)}
                        className="w-full inline-flex items-center justify-center px-3 py-2 rounded-lg bg-lima-600 text-white text-xs sm:text-sm font-semibold hover:bg-lima-700 transition-colors"
                      >
                        {/* Add to Cart */}
                        Buy on Amazon
                      </button>
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="w-full inline-flex items-center justify-center px-3 py-2 rounded-lg border border-gray-300 text-xs sm:text-sm font-semibold text-gray-700 hover:border-lima-600 hover:text-lima-700 transition-colors"
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
              Your Wishlist is Empty
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-8 text-center max-w-md">
              Save items you love to your wishlist. Review them anytime and decide when you're ready to purchase.
            </p>
            <Link
              to="/"
              className="px-6 py-3 bg-lima-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-lima-700 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
