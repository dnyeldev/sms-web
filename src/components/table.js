import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import styledComponents from 'styled-components';
import _ from 'lodash';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Pagination from './pagination';

const TableContext = createContext();

const Table = styledComponents.table`
  margin-bottom: 32px;

  td.td--center, th.th--center {
    text-align: center;
  }

  td.td--right, th.th--right {
    text-align: right;
  }
`;

export default function Index(payload) {
  const columns = _.has(payload, 'columns') ? payload.columns : [];
  const {
    dataValues = [], page = 1, pageSize = 10, onPageChange, totals = 0, pagination = true,
    loading = false, emptyText = null,
  } = payload;
  const [rowTotals, setRowTotals] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    if (pageSize < dataValues.length) {
      const batches = _.chunk(dataValues, pageSize);
      const batch = batches[currentPage - 1];

      setRows(batch);
    } else {
      setRows(dataValues);
    }

    if (totals) {
      setRowTotals(totals);
    } else {
      setRowTotals(dataValues.length);
    }

    if (pagination && dataValues.length) {
      setShowPagination(true);
    } else { setShowPagination(false); }
  }, [dataValues, currentPage, pageSize, totals]);

  const onChange = useCallback((value) => {
    setCurrentPage(value);

    if (onPageChange) { onPageChange(value); }
  });

  const contextPayload = useMemo(() => ({
    columns, rows, loading, emptyText,
  }), [columns, rows, loading, emptyText]);

  return (
    <div className="table-responsive">
      <TableContext.Provider value={contextPayload}>
        <Table className="table table-hover table-center">
          <RenderTHeads />
          <RenderRows />
        </Table>

        {showPagination && (
          <Pagination
            pageSize={pageSize}
            page={currentPage}
            totals={rowTotals}
            onChange={onChange}
          />
        )}
      </TableContext.Provider>
    </div>
  );
}

function RenderTHeads() {
  const { columns } = useContext(TableContext);

  return (
    <thead>
      <tr>
        {
          columns.map((i, index) => {
            const {
              title, center, width, right,
            } = i;
            let className = null;

            if (center) { className = `${className} th--center`; }
            if (right) { className = `${className} th--right`; }

            return (<th key={`theads-${index}`} className={className} style={{ width }}>{title}</th>);
          })
        }
      </tr>
    </thead>
  );
}

function RenderRows() {
  const {
    columns, rows, loading, emptyText,
  } = useContext(TableContext);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (!loading && !rows.length) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [loading, rows]);

  const RenderColumns = ({ row }) => columns.map((column, index) => {
    const dataKey = _.has(column, 'dataKey') ? column.dataKey : null;
    const render = _.has(column, 'render') ? column.render : null;
    const initialValue = _.find(row, (a, key) => key === dataKey);
    let value = null;
    const center = _.has(column, 'center') ? column.center : false;
    const right = _.has(column, 'right') ? column.right : false;
    let className = null;
    const width = _.has(column, 'width') ? column.width : 'auto';

    if (render) {
      value = render(initialValue, row);
    }

    if (center) { className = `${className} td--center`; }
    if (right) { className = `${className} td--right`; }

    return (
      <td key={`col-${index}`} className={className} style={{ width }}>{value !== null ? value : initialValue}</td>
    );
  });

  const RowItems = () => rows.map((row, key) => {
    const paramKey = `table-trtd-${key}`;

    return (
      <tr key={paramKey}>
        <RenderColumns row={row} />
      </tr>
    );
  });

  return (
    <tbody>
      {loading && (
        <tr>
          <td style={{ textAlign: 'center', paddingTop: '10vh' }} colSpan={columns && columns.length}>
            <LoadingSpinner loading={loading} />
          </td>
        </tr>
      )}
      {empty && (
        <tr>
          <td style={{ textAlign: 'center', paddingTop: '10vh' }} colSpan={columns && columns.length}>
            {
              emptyText || (
                <h4 style={{ color: '#757575' }}>
                  <FontAwesomeIcon icon={solid('face-tired')} />
                  {' '}
                  Empty Result!
                </h4>
              )
            }
          </td>
        </tr>
      )}
      <RowItems />
    </tbody>
  );
}

function LoadingSpinner(payload) {
  const { children, loading, ...etc } = payload;
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {
        loading ? (
          <>
            <Spinner
              animation="border"
              role="status"
              as="div"
              aria-hidden="true"
              size="sm"
              style={{ color: '#FE9445' }}
              {...etc}
            >
              <span className="visually-hidden">loading</span>
            </Spinner>
            {' '}
            Loading...
          </>
        ) : ''
      }
    </>
  );
}
