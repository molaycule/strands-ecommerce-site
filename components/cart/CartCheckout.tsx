import { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import { CartItem, SelectOptions } from 'types';
import { useCartStore } from 'store/useCartStore';
import { useDeliveryStore } from 'store/useDeliveryStore';
import { useQuery } from '@apollo/client';
import { AllAreas } from 'types';
import { ALL_AREAS } from 'graphql/queries';
import { usePaystackPayment } from 'react-paystack';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER, UPDATE_PRODUCT } from 'graphql/mutations';
import swal from 'sweetalert';

interface CartCheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
}

const CartCheckout: FC<CartCheckoutProps> = ({ cart, clearCart }) => {
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [createOrder] = useMutation(CREATE_ORDER, {
    onCompleted({ createOrder }) {
      const { orderNumber } = createOrder;
      swal(
        'Order Confirmed',
        `Thank you for your order. Your order number is ${orderNumber}`,
        'success'
      ).then(() => {
        cart.forEach(item => {
          updateProduct({
            variables: {
              id: item.product.id,
              data: {
                quantityInStock: item.product.quantityInStock - item.quantity
              }
            }
          });
        });
        clearCart();
        window.scroll(0, 0);
      });
    }
  });
  const getCartTotalPrice = useCartStore(state => state.getCartTotalPrice);
  const updateDeliveryDetails = useDeliveryStore(
    state => state.updateDeliveryDetails
  );
  const deliveryDetails = useDeliveryStore(state => state.deliveryDetails);
  const { data } = useQuery<AllAreas>(ALL_AREAS);
  const [selectedRegion, setSelectedRegion] = useState<string>(
    deliveryDetails?.region || ''
  );
  const [selectedArea, setSelectedArea] = useState(deliveryDetails?.area || '');
  const [selectedAreaFee, setSelectedAreaFee] = useState(
    deliveryDetails?.fee || 0
  );
  const [address, setAddress] = useState<string>(
    deliveryDetails?.address || ''
  );
  const [email, setEmail] = useState<string>(deliveryDetails?.email || '');
  const [name, setName] = useState<string>(deliveryDetails?.name || '');
  const [phoneNumber, setPhoneNumber] = useState<string>(
    deliveryDetails?.phoneNumber || ''
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const [btnPayDisabled, setBtnPayDisabled] = useState(false);
  const initializePayment = usePaystackPayment({
    reference: new Date().getTime().toString(),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY,
    email,
    amount: totalAmount * 100
  });

  const onSuccess = (data: {
    reference: string;
    transaction: string;
    message: string;
    status: string;
  }) => {
    const { reference, transaction, message, status } = data;
    createOrder({
      variables: {
        data: {
          orderNumber: reference,
          area: selectedArea,
          region: selectedRegion,
          referenceNumber: reference,
          transactionNumber: transaction,
          subtotal: getCartTotalPrice(),
          discount: 0,
          deliveryFee: selectedAreaFee,
          total: getCartTotalPrice() + selectedAreaFee,
          lineItems: {
            create: cart.map(item => ({
              image: item.product.mainImage.publicUrl,
              name: item.product.name,
              category: item.product.category.name,
              quantity: item.quantity,
              price: item.product.price
            }))
          },
          name,
          address,
          phoneNumber,
          email,
          message,
          status
        }
      }
    });
  };

  useEffect(() => {
    const newTotalAmount = getCartTotalPrice() + selectedAreaFee;
    if (newTotalAmount === totalAmount) return;
    setTotalAmount(newTotalAmount);
  }, [selectedAreaFee, cart]);

  useEffect(() => {
    updateDeliveryDetails({
      region: selectedRegion,
      area: selectedArea,
      fee: selectedAreaFee,
      address,
      name,
      email,
      phoneNumber
    });
    setBtnPayDisabled(
      !!!(
        selectedRegion &&
        selectedArea &&
        selectedAreaFee &&
        address &&
        name &&
        email &&
        phoneNumber
      )
    );
  }, [
    selectedRegion,
    selectedArea,
    selectedAreaFee,
    address,
    name,
    email,
    phoneNumber
  ]);

  return (
    <div className='col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50'>
      <div className='bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm'>
        <h4 className='mtext-109 cl2 p-b-30'>Cart Totals</h4>
        <div className='flex-w flex-m bor12 p-b-13'>
          <div className='size-208'>
            <span className='stext-110 cl2'>Delivery Fee:</span>
          </div>
          <div className='size-209'>
            <span className='mtext-110 cl2'>₦{selectedAreaFee.toFixed(2)}</span>
          </div>
        </div>
        <div className='flex-w flex-t bor12 p-t-15 p-b-30'>
          <div className='size-208 w-full-ssm'>
            <span className='stext-110 cl2'>Delivery:</span>
          </div>
          <div className='size-209 p-r-18 p-r-0-sm w-full-ssm'>
            <p className='stext-111 cl6 p-t-2'>
              Delivery fee varies based on location
            </p>
            <div className='p-t-15'>
              <span className='stext-112 cl8'>Enter your details</span>
              <div className='bor8 bg0 m-b-12'>
                <Select
                  instanceId='area'
                  options={data?.allAreas.map<SelectOptions<number>>(item => ({
                    label: item.area,
                    value: item.region.fee
                  }))}
                  onChange={(e: SelectOptions<number>) => {
                    setSelectedArea(e.label);
                    setSelectedRegion(
                      data?.allAreas.find(item => item.area === e.label).region
                        .name
                    );
                    setSelectedAreaFee(e.value);
                  }}
                  defaultValue={
                    deliveryDetails?.area &&
                    deliveryDetails?.fee && {
                      label: deliveryDetails.area,
                      value: deliveryDetails.fee
                    }
                  }
                  placeholder='Select your area'
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
                  type='name'
                  name='name'
                  placeholder='Enter your Name'
                  value={name}
                  onChange={e => setName(e.target.value)}
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
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
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
            <span className='mtext-101 cl2'>₦{totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <button
          className='flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer btn-pay'
          disabled={btnPayDisabled}
          onClick={() => {
            initializePayment(onSuccess);
          }}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CartCheckout;
