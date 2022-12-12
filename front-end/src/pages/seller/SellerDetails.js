import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Header from '../../components/Header';
import ProductBtn from '../../components/ProductBtn';
import dataTestIds from '../../components/utils/dataTestIds';
import SellerDetailsTable from '../../components/SellerDetailsTable';
import { requestData, requestUpdate } from '../../API/requests';

export default function SellerDetails({ match: { params: { id } } }) {
  const [sale, setSale] = useState({ products: [] });
  const [saleStatus, setSaleStatus] = useState('Pendente');

  const requestSale = async () => {
    requestData(`/seller/orders/${id}`)
      .then((data) => {
        setSale(data);
        setSaleStatus(data.status);
      });
  };

  const updateStatus = async (status) => {
    requestUpdate(`/seller/orders/${id}`, { status })
      .then((data) => setSaleStatus(data));
  };

  useEffect(() => {
    requestSale();
  }, []);
  return (
    <main>
      <Header
        FirstNavigationLink={ ProductBtn }
        SecondNavegationLink={ null }
      />
      <div>
        <p
          data-testid={ `${dataTestIds[54]}${sale.id}` }
        >
          { sale.deliveryNumber}
        </p>
        <p
          data-testid={ `${dataTestIds[56]}${sale.id}` }
        >
          { moment(sale.saleDate).format('DD/MM/YYYY')}
        </p>
        <p
          data-testid={ `${dataTestIds[55]}${sale.id}` }
        >
          { saleStatus }
        </p>
        <button
          type="button"
          data-testid={ `${dataTestIds[57]}${sale.id}` }
          disabled={ saleStatus !== 'Pendente' }
          onClick={ () => updateStatus('Preparando') }
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          data-testid={ `${dataTestIds[58]}${sale.id}` }
          disabled={ saleStatus !== 'Preparando' }
          onClick={ () => updateStatus('Em Trânsito') }
        >
          SAIU PARA ENTREGA
        </button>
      </div>
      <section>
        <SellerDetailsTable data={ sale.products } />
      </section>

    </main>
  );
}

SellerDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
