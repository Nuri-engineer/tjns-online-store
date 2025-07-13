import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getProducts } from '../../entities/products/model/productThunk';
import { getReviews } from '../../entities/review/model/reviewThunk';
import ProductSortButtons from '../ProducSortButton/ProducSortButton';
import ProductCard from '../productCard/ProductCard';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useSortedProducts } from '../ProducSortButton/useSortedProducts';
import { getFavorites } from '../../entities/favorite/model/favoriteThunks';

export default function CardList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  const { products, loading, pagination } = useAppSelector((store) => store.products);

  const reviews = useAppSelector((store) => store.rewiew.reviews);
  const searchedProducts = useAppSelector((store) => store.search.results);
  const searchQuery = useAppSelector((store) => store.search.query);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery]);
  const activeProducts = searchQuery.length > 0 ? searchedProducts : products;
  console.log(searchQuery, 'tgyuhijokijhugf');

  const { sortedProducts, sortType, setSortType } = useSortedProducts(activeProducts, reviews);

  const itemsPerPage = 10;
  const pageCount =
    searchQuery.length > 0
      ? Math.ceil(sortedProducts.length / itemsPerPage)
      : pagination?.totalPages;

  const productsToDisplay =
    searchQuery.length > 0
      ? sortedProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      : products;

  const handlePageClick = (event: { selected: number }): void => {
    const newPage = event.selected;
    setCurrentPage(newPage);

    // Если нет поиска - запрашиваем новую страницу с сервера
    if (searchQuery.length === 0) {
      void dispatch(getProducts({ page: newPage + 1, limit: itemsPerPage }));
    }
  };

  useEffect(() => {
    if (user) {
      void dispatch(getFavorites(user.id));
    }
    void dispatch(getProducts({ page: 0, limit: itemsPerPage }));
    void dispatch(getReviews());
    setCurrentPage(0);
  }, [dispatch, user]);

  if (loading && currentPage === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#E6F0FA] pt-20 sm:pt-24 font-poppins">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ProductSortButtons
          sortType={sortType}
          onSortChange={setSortType}
          className="flex justify-center sm:justify-start mb-6 z-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {productsToDisplay.map((product) => (
            <div
              key={product.id}
              className="flex transform transition-all duration-300 hover:scale-[1.02]"
            >
              <ProductCard product={product} rating={product.averageRating} />
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 flex justify-center">
          <ReactPaginate
            previousLabel={<ChevronLeft size={20} className="text-[#1A3C6D]" />}
            nextLabel={<ChevronRight size={20} className="text-[#1A3C6D]" />}
            breakLabel={<MoreHorizontal size={18} className="text-[#6B7280]" />}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            renderOnZeroPageCount={null}
            containerClassName="flex items-center gap-2"
            pageClassName="w-8 h-8 flex items-center justify-center text-[#1A3C6D] hover:bg-[#D1E3F6] hover:text-[#3B5A9A] rounded-full transition-all duration-300"
            activeClassName="bg-[#1A3C6D] text-white font-semibold"
            previousClassName="w-8 h-8 flex items-center justify-center hover:bg-[#D1E3F6] rounded-full transition-all duration-300"
            nextClassName="w-8 h-8 flex items-center justify-center hover:bg-[#D1E3F6] rounded-full transition-all duration-300"
            breakClassName="w-8 h-8 flex items-center justify-center"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
