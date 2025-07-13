import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import ProductCard from '../productCard/ProductCard';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { getById } from '../../entities/products/model/productThunk';
import ProductSortButtons from '../ProducSortButton/ProducSortButton';
import { useSortedProducts } from '../ProducSortButton/useSortedProducts';
import { getReviews } from '../../entities/review/model/reviewThunk';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export default function FilteredCardList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const { productsByCategory, loading, categoryPagination } = useAppSelector(
    (store) => store.products,
  );
  const reviews = useAppSelector((state) => state.rewiew.reviews);
  const categories = useAppSelector((state) => state.categories.categories);
  const categoryName = categories.find((cat) => cat.id === Number(id))?.name;

  useEffect(() => {
    void dispatch(getById({ id: Number(id), page: 1, limit: itemsPerPage }));
    void dispatch(getReviews());
  }, [dispatch, id]);

  const { sortedProducts, sortType, setSortType } = useSortedProducts(productsByCategory, reviews);

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
    // Загружаем новую страницу с сервера
    void dispatch(getById({ id: Number(id), page: newPage + 1, limit: itemsPerPage }));
  };

  if (loading && currentPage === 0) {
    return (
      <div className="min-h-screen bg-[#E6F0FA] pt-20 sm:pt-24 flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E6F0FA] pt-20 sm:pt-24 font-poppins">
      <Container>
        <h1 className="text-2xl sm:text-3xl text-[#1A3C6D] font-bold mb-6 text-center sm:text-left">
          {categoryName}
        </h1>
        <ProductSortButtons
          sortType={sortType}
          onSortChange={setSortType}
          className="flex justify-center sm:justify-start mb-6 z-10"
        />

        <Row xs={1} sm={2} md={3} lg={4} className="g-3 sm:g-4">
          {sortedProducts.map((product) => (
            <Col
              key={product.id}
              className="d-flex transform transition-all duration-300 hover:scale-[1.02]"
            >
              <ProductCard product={product} rating={product.averageRating} />
            </Col>
          ))}
        </Row>

        {categoryPagination && categoryPagination.totalPages > 1 && (
          <div className="mt-10 sm:mt-12 flex justify-center">
            <ReactPaginate
              previousLabel={<ChevronLeft size={20} className="text-[#1A3C6D]" />}
              nextLabel={<ChevronRight size={20} className="text-[#1A3C6D]" />}
              breakLabel={<MoreHorizontal size={18} className="text-[#6B7280]" />}
              pageCount={categoryPagination.totalPages}
              forcePage={currentPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="flex items-center gap-2"
              pageClassName="w-8 h-8 flex items-center justify-center text-[#1A3C6D] hover:bg-[#D1E3F6] hover:text-[#3B5A9A] rounded-full transition-all duration-300"
              activeClassName="bg-[#1A3C6D] text-white font-semibold"
              previousClassName="w-8 h-8 flex items-center justify-center hover:bg-[#D1E3F6] rounded-full transition-all duration-300"
              nextClassName="w-8 h-8 flex items-center justify-center hover:bg-[#D1E3F6] rounded-full transition-all duration-300"
              breakClassName="w-8 h-8 flex items-center justify-center"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        )}
      </Container>
    </div>
  );
}
