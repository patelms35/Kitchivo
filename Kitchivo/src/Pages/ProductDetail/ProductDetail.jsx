import React, { useEffect, useMemo, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import ProductPrice from "../../components/ProductPrice";
import {
  fetchProductDetails,
  createWishlist,
  submitReview,
} from "../../redux/slices/CommanSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import SEO from "../../components/SEO";

// const formatReviewDate = (isoString) => {
//   if (!isoString) return '';
//   const date = new Date(isoString);
//   if (Number.isNaN(date.getTime())) return '';

//   const now = new Date();
//   const diffMs = now - date;
//   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//   if (diffDays === 0) return 'Today';
//   if (diffDays === 1) return '1 day ago';
//   if (diffDays < 7) return `${diffDays} days ago`;

//   return date.toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//   });
// };

const formatReviewDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;

  // Compute difference in calendar days (local time) by using UTC midnight for each local date.
  // This avoids problems where a small timezone/time-of-day difference makes the diff negative.
  const utcNowMidnight = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const utcDateMidnight = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diffDays = Math.floor((utcNowMidnight - utcDateMidnight) / msPerDay);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays > 1 && diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 0) {
    // In case the timestamp is in the future (unlikely for reviews) — show a safe label.
    return "Today";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const StarRating = ({ rating = 0, className = "" }) => {
  const safeRating = Number.isFinite(rating) ? rating : 0;
  const rounded = Math.round(safeRating);

  return (
    <div
      className={`flex items-center ${className}`}
      aria-label={`${safeRating.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 sm:w-5 sm:h-5 ${
            star <= rounded ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const StarRatingInput = ({ value = 0, onChange, className = "" }) => {
  const handleClick = (rating) => {
    if (typeof onChange === "function") {
      onChange(rating);
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          className="focus:outline-none"
        >
          <svg
            className={`w-6 h-6 ${
              star <= value ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

const ReviewModal = ({
  isOpen,
  onClose,
  rating,
  onRatingChange,
  reviewText,
  onReviewTextChange,
  onSubmit,
  submitting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 sm:px-0">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Write a review
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="px-4 pt-4 pb-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <StarRatingInput value={rating} onChange={onRatingChange} />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="review-textarea"
            >
              Review
            </label>
            <textarea
              id="review-textarea"
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-lima-500 focus:border-lima-500 resize-none"
              placeholder="Share your honest experience with this product..."
              value={reviewText}
              onChange={(e) => onReviewTextChange(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-gray-800"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold text-white bg-lima-600 hover:bg-lima-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lima-500 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RatingStats = ({ ratingStats, reviews }) => {
  const totalReviews =
    ratingStats?.total_reviews ?? (Array.isArray(reviews) ? reviews.length : 0);

  const averageRating =
    ratingStats?.average_rating ??
    (totalReviews
      ? reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) /
        totalReviews
      : 0);

  const distribution = ratingStats?.rating_distribution || {};

  const getCount = (star) => distribution[`${star}_star`] ?? 0;
  const getPercentage = (count) =>
    totalReviews ? Math.round((count / totalReviews) * 100) : 0;

  if (!totalReviews) {
    return (
      <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 sm:p-5">
        <p className="text-sm text-gray-600">
          No reviews yet. Be the first to review this product.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex flex-col items-start justify-center">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold text-gray-900">
            {Number(averageRating || 0).toFixed(1)}
          </span>
          <StarRating rating={averageRating} />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="md:col-span-2 space-y-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = getCount(star);
          const percentage = getPercentage(count);

          return (
            <div key={star} className="flex items-center gap-3">
              <span className="w-10 text-xs sm:text-sm text-gray-700">
                {star}★
              </span>
              <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-yellow-400"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-10 text-xs sm:text-sm text-gray-500 text-right">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ReviewItem = ({ review }) => {
  const name = review.customer_name || "Anonymous";
  const rating = Number(review.rating) || 0;
  const comment =
    review.review && review.review.trim()
      ? review.review
      : "No comment provided.";
  const dateLabel = formatReviewDate(review.created_at);

  return (
    <div className="border border-gray-100 rounded-lg p-4 sm:p-5 bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <StarRating rating={rating} />
          <span className="text-sm font-medium text-gray-800">{name}</span>
        </div>
        {dateLabel && (
          <span className="text-xs text-gray-400">{dateLabel}</span>
        )}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
        {comment}
      </p>
    </div>
  );
};

const ReviewsList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-200 p-4 sm:p-6 text-center">
        <p className="text-sm text-gray-600">No reviews yet.</p>
        <p className="mt-1 text-xs text-gray-400">
          Once customers review this product, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productDatails, loading } = useSelector((state) => state.commanStore);
  const product = productDatails;

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(0);
  const [displayedImages, setDisplayedImages] = useState([]);
  const thumbnailContainerRef = useRef(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch product details from API
  useEffect(() => {
    if (!id) return;
    dispatch(fetchProductDetails({ product_id: id }));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  // Reset selections when product changes
  useEffect(() => {
    if (!product) return;
    setSelectedSizeId(null);
    setSelectedColorId(null);
  }, [product?.id]);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    } catch (e) {
      setIsLoggedIn(false);
    }
  }, []);

  // All images: featured image (if any) + common images + all variant images (default view)
  const allImages = useMemo(() => {
    if (!product) return [];

    const commonImages = product.common_images || [];
    const variantImages =
      product.variants?.flatMap((v) => v.images || []) || [];

    const mergedImages = [...commonImages, ...variantImages];
    const seen = new Set();
    const ordered = [];

    if (product.featured_image) {
      const featuredUrl = product.featured_image;
      if (featuredUrl) {
        ordered.push({
          id: "featured",
          url: featuredUrl,
        });
        seen.add(featuredUrl);
      }
    }

    mergedImages.forEach((img) => {
      const url = img?.url;
      if (!url || seen.has(url)) return;
      seen.add(url);
      ordered.push(img);
    });

    return ordered;
  }, [product]);

  // Active variant from selected size and/or color
  const activeVariant = useMemo(() => {
    if (!product?.variants || !product.variants.length) return null;

    const hasSize = !!selectedSizeId;
    const hasColor = !!selectedColorId;

    // If there is exactly one variant and nothing is selected, use that by default
    if (!hasSize && !hasColor) {
      if (product.variants.length === 1) {
        return product.variants[0];
      }
      return null;
    }

    const selectedSizeKey =
      selectedSizeId != null ? String(selectedSizeId) : null;
    const selectedColorKey =
      selectedColorId != null ? String(selectedColorId) : null;

    return (
      product.variants.find((v) => {
        const vSizeId =
          v.size?.id != null
            ? String(v.size.id)
            : v.size_id != null
            ? String(v.size_id)
            : null;
        const vColorId =
          v.color?.id != null
            ? String(v.color.id)
            : v.color_id != null
            ? String(v.color_id)
            : null;

        const sizeMatch = hasSize ? vSizeId === selectedSizeKey : true;
        const colorMatch = hasColor ? vColorId === selectedColorKey : true;
        return sizeMatch && colorMatch;
      }) || null
    );
  }, [product, selectedSizeId, selectedColorId]);

  // Update displayed images when variant or product changes
  useEffect(() => {
    if (!product) return;

    if (activeVariant && activeVariant.images?.length) {
      const variantImages = activeVariant.images || [];
      // When a variant is selected, show only that variant's images
      setDisplayedImages(allImages);

      const primary =
        variantImages.find((img) => img.is_primary) || variantImages[0];

      if (primary?.url) {
        setSelectedImageUrl(primary.url);
        setSelectedThumbIndex(0);
      }
    } else {
      // No active variant: show all images (common + all variant images)
      setDisplayedImages(allImages);

      if (!selectedImageUrl) {
        const fallback = product.featured_image || allImages[0]?.url || null;

        if (fallback) {
          setSelectedImageUrl(fallback);
          setSelectedThumbIndex(0);
        }
      } else {
        const existsInAll = allImages.some(
          (img) => img.url === selectedImageUrl
        );

        if (!existsInAll) {
          const fallback = product.featured_image || allImages[0]?.url || null;

          if (fallback) {
            setSelectedImageUrl(fallback);
            setSelectedThumbIndex(0);
          }
        }
      }
    }
  }, [product, activeVariant, allImages]);

  const handleThumbnailClick = (url, index) => {
    setSelectedImageUrl(url);
    setSelectedThumbIndex(index);
  };

  // Scroll thumbnail gallery up/left
  const scrollThumbnailsPrev = () => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        container.scrollBy({ top: -100, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -100, behavior: "smooth" });
      }
    }
  };

  // Scroll thumbnail gallery down/right
  const scrollThumbnailsNext = () => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        container.scrollBy({ top: 100, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 100, behavior: "smooth" });
      }
    }
  };

  const totalStock =
    product?.variants?.reduce(
      (sum, v) => sum + (Number(v.stock_quantity) || 0),
      0
    ) || 0;
  const inStock = totalStock > 0;
  const isWishlisted = !!product?.is_wishlisted;

  const handleOpenReviewModal = () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Login required",
        text: "Please login first to write a review.",
        icon: "warning",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }
    setReviewRating(0);
    setReviewText("");
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    if (isSubmittingReview) return;
    setIsReviewModalOpen(false);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!product) return;

    if (!reviewRating || reviewRating < 1 || reviewRating > 5) {
      toast.error("Please select a rating between 1 and 5 stars.");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const resultAction = await dispatch(
        submitReview({
          product_id: product.id,
          rating: reviewRating,
          review_text: reviewText,
        })
      );

      if (resultAction?.payload?.status === 1) {
        toast.success(
          resultAction?.payload?.message || "Review submitted successfully"
        );
        setIsReviewModalOpen(false);
        setReviewRating(0);
        setReviewText("");
        dispatch(fetchProductDetails({ product_id: product.id }));
      } else {
        toast.error(
          resultAction?.payload?.message || "Failed to submit review"
        );
      }
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleWishlistClick = async () => {
    if (!product) return;

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Login required",
        text: "Please login first to add products to your wishlist.",
        icon: "warning",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    try {
      const resultAction = await dispatch(
        createWishlist({ product_id: product.id })
      );
      if (resultAction?.payload?.status === 1) {
        toast.success(resultAction?.payload?.message || "Wishlist updated");
        dispatch(fetchProductDetails({ product_id: product.id }));
      } else {
        toast.error(
          resultAction?.payload?.message || "Failed to update wishlist"
        );
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  };

  const handleBuyOnAmazon = () => {
    const variantUrl = activeVariant?.url;
    const fallbackUrl = product?.url;
    const targetUrl = variantUrl || fallbackUrl;

    if (targetUrl) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (loading && !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-white">
          <p className="text-gray-500 text-sm">Loading product details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Product not found
            </h2>
            <p className="text-gray-600 mb-4">
              We couldn&apos;t find the product you&apos;re looking for.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-2 bg-lima-600 text-white rounded-lg font-semibold hover:bg-lima-700 transition-colors"
            >
              Back to Products
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const reviews = product.reviews || [];
  const ratingStats = product.rating_stats || null;
  const headerTotalReviews =
    ratingStats?.total_reviews ?? (Array.isArray(reviews) ? reviews.length : 0);
  const headerAverageRating =
    ratingStats?.average_rating ??
    (headerTotalReviews
      ? reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) /
        headerTotalReviews
      : 0);

  // Product schema for SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.featured_image || displayedImages[0]?.url,
    description: product.description || product.name,
    brand: {
      "@type": "Brand",
      name: "Kitchivo",
    },
    offers: {
      "@type": "Offer",
      price: product.price || "0",
      priceCurrency: "INR",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    aggregateRating:
      headerTotalReviews > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: headerAverageRating.toFixed(1),
            reviewCount: headerTotalReviews,
            bestRating: "5",
            worstRating: "1",
          }
        : undefined,
    review: reviews?.slice(0, 5).map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.user?.name || "Anonymous",
      },
      datePublished: review.created_at,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: review.comment,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${product.name} | Buy Online at Best Price - Kitchivo`}
        description={`${
          product.description || product.name
        } - Shop now at Kitchivo. ${
          headerTotalReviews > 0
            ? `Rated ${headerAverageRating.toFixed(
                1
              )}/5 by ${headerTotalReviews} customers.`
            : "High quality kitchen and home products."
        }`}
        keywords={`${product.name}, ${
          product.category?.name || "kitchen products"
        }, buy ${product.name}, ${
          product.category?.name
        } online, kitchenware, home products`}
        canonicalUrl={`${window.location.origin}/product/${product.id}`}
        ogImage={product.featured_image || displayedImages[0]?.url}
        ogType="product"
        schema={productSchema}
      />
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: product.category?.name || "Products", href: "/products" },
          { label: product.name || "Product Details" },
        ]}
      />

      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Product Detail Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Image Gallery */}
            <div className="flex flex-col-reverse lg:flex-row gap-4">
              {/* Thumbnail Gallery with Arrows */}
              <div className="relative flex flex-row lg:flex-col items-center gap-2">
                {/* Up Arrow (Desktop) / Left Arrow (Mobile) */}
                {displayedImages.length > 4 && (
                  <button
                    onClick={scrollThumbnailsPrev}
                    className="hidden lg:flex w-8 h-8 items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all z-10"
                    aria-label="Previous images"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </button>
                )}
                {displayedImages.length > 3 && (
                  <button
                    onClick={scrollThumbnailsPrev}
                    className="lg:hidden flex w-8 h-8 items-center cursor-pointer justify-center bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all z-10 shrink-0"
                    aria-label="Previous images"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}

                {/* Thumbnail Container */}
                <div
                  ref={thumbnailContainerRef}
                  className="flex flex-row lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto scrollbar-hide"
                  style={{ maxHeight: "calc(60vh - 200px)" }}
                >
                  {displayedImages.map((img, index) => (
                    <button
                      key={img.id || index}
                      onClick={() => handleThumbnailClick(img.url, index)}
                      className={`shrink-0 w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedThumbIndex === index
                          ? "border-lima-600 ring-2 ring-lima-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`${product.name} view ${index + 1}`}
                        loading={index < 3 ? "eager" : "lazy"}
                        decoding="async"
                        sizes="80px"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100x100?text=No+Image";
                        }}
                      />
                    </button>
                  ))}
                </div>

                {/* Down Arrow (Desktop) / Right Arrow (Mobile) */}
                {displayedImages.length > 4 && (
                  <button
                    onClick={scrollThumbnailsNext}
                    className="hidden lg:flex w-8 h-8 items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all z-10"
                    aria-label="Next images"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                )}
                {displayedImages.length > 3 && (
                  <button
                    onClick={scrollThumbnailsNext}
                    className="lg:hidden flex w-8 h-8 items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all z-10 shrink-0"
                    aria-label="Next images"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Main Image */}
              <div className="flex-1 rounded-lg overflow-hidden relative">
                <div className="aspect-square bg-gray-50 flex items-center justify-center">
                  {selectedImageUrl ? (
                    <img
                      src={selectedImageUrl}
                      alt={product.name}
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                      sizes="(min-width: 1024px) 600px, 100vw"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/600x600?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">
                      No image available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="space-y-5">
              {/* Product Title */}
              <div>
                {product.category?.name && (
                  <p className="text-xs uppercase tracking-wider text-lima-600 font-semibold mb-1">
                    {product.category.name}
                  </p>
                )}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>

                {/* Reviews placeholder */}
                {headerTotalReviews ? (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-semibold text-gray-900">
                        {Number(headerAverageRating || 0).toFixed(1)}
                      </span>
                      <StarRating rating={headerAverageRating} />
                    </div>
                    <span className="text-sm text-gray-600">
                      {headerTotalReviews} review
                      {headerTotalReviews !== 1 ? "s" : ""}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-4">
                    <StarRating rating={0} />
                    <span className="text-sm text-gray-500">
                      No reviews yet
                    </span>
                  </div>
                )}

                {/* Product Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {product.description}
                </p>

                {/* Price (₹ / $ logic) */}
                <div className="mb-2">
                  <ProductPrice product={activeVariant || product} />
                </div>
              </div>

              {/* Variants: Sizes */}
              {product.available_sizes?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.available_sizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSizeId(size.id)}
                        className={`px-4 py-2 min-w-12 border-2 rounded font-medium text-sm transition-all cursor-pointer ${
                          selectedSizeId === size.id
                            ? "border-lima-600 bg-lima-600 text-white"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Variants: Colors */}
              {product.available_colors?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Color
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.available_colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColorId(color.id)}
                        className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                          selectedColorId === color.id
                            ? "border-gray-900 ring-2 ring-offset-2 ring-gray-900"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        aria-label={color.name}
                      >
                        <div
                          className="w-full h-full rounded-full"
                          style={{
                            backgroundColor: color.hex_code || "#e5e7eb",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleBuyOnAmazon}
                  className="cursor-pointer w-full bg-orange-500 text-white py-3 px-6 rounded font-semibold text-base hover:bg-orange-600 transition-all duration-300 inline-flex items-center justify-center"
                >
                  Buy on Amazon
                </button>

                <div className="flex items-center gap-4 text-sm">
                  {/* <button className="flex items-center gap-2 text-gray-600 hover:text-lima-600 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Size Guide
                  </button> */}
                  <button
                    onClick={handleWishlistClick}
                    className={`cursor-pointer flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-lg border transition-colors ${
                      isWishlisted
                        ? "border-lima-600 text-lima-700 bg-white"
                        : "border-gray-300 text-gray-700 hover:border-lima-600 hover:text-lima-700"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${
                        isWishlisted ? "text-base" : "text-gray-500"
                      }`}
                      fill={isWishlisted ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="border-t pt-5 space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-600">Category:</span>
                  <span className="text-gray-900">
                    {product.category?.name || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12 border-t">
            <div className="flex md:gap-4 lg:gap-8 border-b">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === "description"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                Description
              </button>
              {/* <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${activeTab === 'details'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
              >
                Product Details
              </button> */}
              <button
                onClick={() => setActiveTab("reviews")}
                className={`cursor-pointer py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === "reviews"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                Reviews
              </button>
            </div>
            <div className="py-8">
              {activeTab === "description" && (
                <div>
                  <h3 className="cursor-pointer text-lg font-semibold mb-4">
                    Product Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    This premium quality product ensures durability and comfort
                    for everyday use. Made with the finest materials and crafted
                    with attention to detail.
                  </p>
                </div>
              )}
              {/* {activeTab === 'details' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Material:</span>
                      <span className="text-gray-600">Premium Pima Cotton</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Weight:</span>
                      <span className="text-gray-600">0.5 kg</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Dimensions:</span>
                      <span className="text-gray-600">25cm x 15cm x 10cm</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Care:</span>
                      <span className="text-gray-600">Machine washable, tumble dry low</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700 min-w-[120px]">Warranty:</span>
                      <span className="text-gray-600">1 Year Manufacturer Warranty</span>
                    </div>
                  </div>
                </div>
              )} */}
              {activeTab === "reviews" && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    {isLoggedIn && !product?.is_reviewed && (
                      <button
                        type="button"
                        onClick={handleOpenReviewModal}
                        className="text-lg font-semibold text-gray-600 hover:text-lima-600"
                      >
                        <h3>Write a review</h3>
                      </button>
                    )}
                  </div>
                  <RatingStats ratingStats={ratingStats} reviews={reviews} />
                  <ReviewsList reviews={reviews} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        rating={reviewRating}
        onRatingChange={setReviewRating}
        reviewText={reviewText}
        onReviewTextChange={setReviewText}
        onSubmit={handleSubmitReview}
        submitting={isSubmittingReview}
      />
    </div>
  );
};

export default ProductDetail;
