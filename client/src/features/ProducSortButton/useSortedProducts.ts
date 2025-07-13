import { useMemo, useState } from 'react';
import type { ReviewSliceT } from '../../entities/review/model/types';

type SortType = 'none' | 'rating-asc' | 'rating-desc' | 'price-asc' | 'price-desc';

type RatingT = {
  sum: number;
  count: number;
};

type ProductT = {
  id: number;
  price: number;
  [key: string]: unknown;
};



export function useSortedProducts(products: ProductT[], reviews?: ReviewSliceT['reviews']) {
  const [sortType, setSortType] = useState<SortType>('none');

  // Расчет среднего рейтинга
  const averageRatings: Record<number, RatingT | undefined> = useMemo(() => {
    if (!reviews) return {};
    return reviews.reduce<Record<number, RatingT | undefined>>((acc, review) => {
      const { productId } = review;

      if (!acc[productId]) {
        acc[productId] = { sum: 0, count: 0 };
      }
      const rating = acc[productId];
      rating.sum += review.rating;
      rating.count += 1;

      return acc;
    }, {});
  }, [reviews]);

  const productsWithRating = useMemo(() => {
    if (!products || products.length === 0) return [];
  
    return products.map((product) => {
      const ratingInfo = averageRatings[product.id];
      const averageRating =
        ratingInfo && ratingInfo.count > 0
          ? ratingInfo.sum / ratingInfo.count
          : 0;
  
      return {
        ...product,
        averageRating,
      };
    });
  }, [products, averageRatings]);

  const sortedProducts = useMemo(() => {
    if (sortType === 'none') return productsWithRating;

    return [...productsWithRating].sort((a, b) => {
      switch (sortType) {
        case 'rating-asc':
          return a.averageRating - b.averageRating;
        case 'rating-desc':
          return b.averageRating - a.averageRating;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [productsWithRating, sortType]);

  return { sortedProducts, sortType, setSortType };
}
