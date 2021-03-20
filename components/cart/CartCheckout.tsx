import { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import { CartItem, SelectOptions } from 'types';
import { useCartStore } from 'store/useCartStore';
import { useShippingStore } from 'store/useShippingStore';
import { useQuery } from '@apollo/client';
import { AllShippings } from 'types';
import { ALL_SHIPPINGS } from 'graphql/queries';
import { usePaystackPayment } from 'react-paystack';

const onSuccess = reference => {
  // Implementation for whatever you want to do with reference and after success call.
  // message: 'Approved';
  // reference: '1616225820392';
  // status: 'success';
  // trans: '1047177899';
  // transaction: '1047177899';
  // trxref: '1616225820392';
  console.log(reference);
};

const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed');
};

interface CartCheckoutProps {
  cart: CartItem[];
}

const CartCheckout: FC<CartCheckoutProps> = ({ cart }) => {
  const getCartTotalPrice = useCartStore(state => state.getCartTotalPrice);
  const updateShippingDetails = useShippingStore(
    state => state.updateShippingDetails
  );
  const shippingDetails = useShippingStore(state => state.shippingDetails);
  const { data } = useQuery<AllShippings>(ALL_SHIPPINGS);
  const [shippingByCountry, setShippingByCountry] = useState({});
  const [selectedCountry, setSelectedCountry] = useState<string>(
    shippingDetails?.country || ''
  );
  const [selectedState, setSelectedState] = useState(
    shippingDetails?.state || ''
  );
  const [selectedStateFee, setSelectedStateFee] = useState(
    shippingDetails?.fee || 0
  );
  const [address, setAddress] = useState<string>(
    shippingDetails?.address || ''
  );
  const [email, setEmail] = useState<string>(shippingDetails?.email || '');
  const [phone, setPhone] = useState<string>(shippingDetails?.phone || '');
  const [totalAmount, setTotalAmount] = useState(0);
  const [btnPayDisabled, setBtnPayDisabled] = useState(false);
  const initializePayment = usePaystackPayment({
    reference: new Date().getTime().toString(),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY,
    email,
    amount: totalAmount * 100
  });

  useEffect(() => {
    if (data) {
      setShippingByCountry(() => {
        let groupByCountry = data.allShippings.reduce((acc, cur) => {
          acc[cur.country.name] = [...(acc[cur.country.name] || []), cur];
          return acc;
        }, {});
        return groupByCountry;
      });
    }
  }, [data]);

  useEffect(() => {
    const newTotalAmount = getCartTotalPrice() + shippingDetails?.fee || 0;
    if (newTotalAmount === totalAmount) return;
    setTotalAmount(newTotalAmount);
  }, [shippingDetails, cart]);

  useEffect(() => {
    updateShippingDetails({
      country: selectedCountry,
      state: selectedState,
      fee: selectedStateFee,
      address,
      email,
      phone
    });
    setBtnPayDisabled(
      !!!(
        selectedCountry &&
        selectedState &&
        selectedStateFee &&
        address &&
        email &&
        phone
      )
    );
  }, [selectedCountry, selectedState, selectedStateFee, address, email, phone]);

  return (
    <div className='col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50'>
      <div className='bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm'>
        <h4 className='mtext-109 cl2 p-b-30'>Cart Totals</h4>
        <div className='flex-w flex-m bor12 p-b-13'>
          <div className='size-208'>
            <span className='stext-110 cl2'>Shipping Fee:</span>
          </div>
          <div className='size-209'>
            <span className='mtext-110 cl2'>
              ₦{selectedStateFee.toFixed(2)}
            </span>
          </div>
        </div>
        <div className='flex-w flex-t bor12 p-t-15 p-b-30'>
          <div className='size-208 w-full-ssm'>
            <span className='stext-110 cl2'>Shipping:</span>
          </div>
          <div className='size-209 p-r-18 p-r-0-sm w-full-ssm'>
            <p className='stext-111 cl6 p-t-2'>
              Shipping charges varies based on location
            </p>
            <div className='p-t-15'>
              <span className='stext-112 cl8'>Calculate Shipping</span>
              <div className='rs1-select2 rs2-select2 bor8 bg0 m-b-12 m-t-9'>
                <Select
                  instanceId='country'
                  options={Object.keys(shippingByCountry)
                    .sort()
                    .map<SelectOptions<string>>(country => ({
                      label: country,
                      value: country
                    }))}
                  onChange={(e: SelectOptions<string>) =>
                    setSelectedCountry(e.value)
                  }
                  defaultValue={
                    shippingDetails?.country && {
                      label: shippingDetails.country,
                      value: shippingDetails.country
                    }
                  }
                  placeholder='Select a country'
                />
              </div>
              <div className='bor8 bg0 m-b-12'>
                <Select
                  instanceId='state'
                  options={data?.allShippings.map<SelectOptions<number>>(
                    item => ({
                      label: item.state,
                      value: item.fee
                    })
                  )}
                  onChange={(e: SelectOptions<number>) => {
                    setSelectedState(e.label);
                    setSelectedStateFee(e.value);
                  }}
                  defaultValue={
                    shippingDetails?.state &&
                    shippingDetails?.fee && {
                      label: shippingDetails.state,
                      value: shippingDetails.fee
                    }
                  }
                  placeholder='Select a state'
                />
              </div>
              <div className='bor8 bg0 m-b-12'>
                <input
                  className='stext-111 cl8 plh3 size-111 p-lr-15'
                  type='text'
                  name='address'
                  placeholder='Enter your Address'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
              <div className='bor8 bg0 m-b-12'>
                <input
                  className='stext-111 cl8 plh3 size-111 p-lr-15'
                  type='email'
                  name='email'
                  placeholder='Enter your Email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className='bor8 bg0'>
                <input
                  className='stext-111 cl8 plh3 size-111 p-lr-15'
                  type='phone'
                  name='phone'
                  placeholder='Enter your Phone No.'
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex-w flex-t p-t-27 p-b-33'>
          <div className='size-208'>
            <span className='mtext-101 cl2'>Total:</span>
          </div>
          <div className='size-209 p-t-1'>
            <span className='mtext-110 cl2'>₦{totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <button
          className='flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer btn-pay'
          disabled={btnPayDisabled}
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CartCheckout;
