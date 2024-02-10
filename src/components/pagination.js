import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Pagination } from 'react-bootstrap';

export default function PaginationElem(payload) {
  const {
    page, pageSize, totals, onChange, siblingCount = 2,
  } = payload;
  const [pages, setPages] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrev, setDisablePrev] = useState(false);
  const DOTS = 'DOTS';

  useEffect(() => {
    const iPages = totals / pageSize;
    const dec = iPages % 1;

    if (dec > 0) { setPages(parseInt(iPages, 10) + 1); } else { setPages(iPages); }
  }, [totals, pageSize]);

  useEffect(() => {
    if (page === pages) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }

    if (page === 1) {
      setDisablePrev(true);
    } else {
      setDisablePrev(false);
    }
  }, [page, pages]);

  // console.log({ pages, totals, pageSize });
  const onPageClick = useCallback((value) => {
    onChange(value);
  });

  const range = useCallback((start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  });

  const getPageList = useCallback(() => {
    const totalPageCount = pages;
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      page + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  });

  const getItems = useMemo(() => {
    const pageList = getPageList();
    const pageItem = [];

    pageList.map((item, index) => {
      const active = item === page;

      if (item === DOTS) {
        pageItem.push(
          <Pagination.Item active={false}
            key={`pagination-elem-${index}`}
          >
            ...
          </Pagination.Item>,
        );
      } else {
        pageItem.push(
          <Pagination.Item
            key={`pagination-elem-${index}`}
            active={active}
            onClick={() => onPageClick(item)}
          >
            {item}
          </Pagination.Item>,
        );
      }

      return pageItem
    });

    return pageItem;
    // if (pages) {
    // const pageItem = [];
    // for (let i = 1; i <= pages; i++) {
    //   const active = i === page;
    //   pageItem.push(
    //     <Pagination.Item active={active} onClick={() => onPageClick(i)}>{i}</Pagination.Item>,
    //   );
    // }

    // return pageItem;
    // }
  }, [page, pages]);

  const onNext = useCallback(() => {
    const nextPage = page + 1;
    onChange(nextPage);
  }, [page]);

  const onPrev = useCallback(() => {
    const nextPage = page - 1;
    onChange(nextPage);
  }, [page]);

  const onLast = useCallback(() => {
    onChange(pages);
  }, [pages]);

  const onFirst = useCallback(() => {
    onChange(1);
  });

  return (
    <Pagination>
      <Pagination.First onClick={onFirst} disabled={disablePrev} />
      <Pagination.Prev onClick={onPrev} disabled={disablePrev} />
      {getItems}
      {/* <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item> */}
      <Pagination.Next onClick={onNext} disabled={disableNext} />
      <Pagination.Last onClick={onLast} disabled={disableNext} />
    </Pagination>
  );
}
