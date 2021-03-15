import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import PageWrapper from 'components/common/PageWrapper';
import Select from 'react-select';
import { useCartStore } from 'store/useCartStore';

const CartItem = dynamic(() => import('components/cart/CartItem'), { ssr: false });

const countryOptions = [{ value: 'ng', label: 'Nigeria' }];
const stateOptions = [
  { value: 'abj', label: 'Abuja' },
  { value: 'lag', label: 'Lagos' }
];

const cart = () => {
  const cart = useCartStore(state => state.cart);

  return (
    <PageWrapper>
      <div className='container'>
        <div className='bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg'>
          <a href='index.html' className='stext-109 cl8 hov-cl1 trans-04'>
            Home
            <FontAwesomeIcon
              icon='angle-right'
              className='m-l-9 m-r-10'
              width={4.5}
              height={12}
            />
          </a>
          <span className='stext-109 cl4'>Shoping Cart</span>
        </div>
      </div>
      <form className='bg0 p-t-75 p-b-85'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-10 col-xl-7 m-lr-auto m-b-50'>
              <div className='m-l-25 m-r--38 m-lr-0-xl'>
                <div className='wrap-table-shopping-cart'>
                  <table className='table-shopping-cart'>
                    <tbody>
                      <tr className='table_head'>
                        <th className='column-1'>Product</th>
                        <th className='column-2'></th>
                        <th className='column-3'>Price</th>
                        <th className='column-4'>Quantity</th>
                        <th className='column-5'>Total</th>
                      </tr>
                      {cart.length ? (
                        cart.map(item => (
                          <CartItem
                            key={item.product.id}
                            imageUrl={item.product.mainImage.publicUrl}
                            itemName={item.product.name}
                            price={item.product.price}
                          />
                        ))
                      ) : (
                        <div>Cart is Empty...</div>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className='flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm'>
                  <div className='flex-w flex-m m-r-20 m-tb-5'>
                    <input
                      className='stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5'
                      type='text'
                      name='coupon'
                      placeholder='Coupon Code'
                    />
                    <div className='flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5'>
                      Apply coupon
                    </div>
                  </div>
                  <div className='flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10'>
                    Update Cart
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50'>
              <div className='bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm'>
                <h4 className='mtext-109 cl2 p-b-30'>Cart Totals</h4>
                <div className='flex-w flex-m bor12 p-b-13'>
                  <div className='size-208'>
                    <span className='stext-110 cl2'>Shipping Fee:</span>
                  </div>
                  <div className='size-209'>
                    <span className='mtext-110 cl2'>₦1,000.00</span>
                  </div>
                </div>
                <div className='flex-w flex-t bor12 p-t-15 p-b-30'>
                  <div className='size-208 w-full-ssm'>
                    <span className='stext-110 cl2'>Shipping:</span>
                  </div>
                  <div className='size-209 p-r-18 p-r-0-sm w-full-ssm'>
                    {/* <p className='stext-111 cl6 p-t-2'>
                      There are no shipping methods available. Please double
                      check your address, or contact us if you need any help.
                    </p> */}
                    {/* <div className='p-t-15'> */}
                    <div>
                      <span className='stext-112 cl8'>Calculate Shipping</span>
                      <div className='rs1-select2 rs2-select2 bor8 bg0 m-b-12 m-t-9'>
                        <Select
                          instanceId='country'
                          options={countryOptions}
                          placeholder='Select a country'
                        />
                      </div>
                      <div className='bor8 bg0 m-b-12'>
                        <Select
                          instanceId='state'
                          options={stateOptions}
                          placeholder='Select a state'
                        />
                      </div>
                      <div className='bor8 bg0'>
                        <input
                          className='stext-111 cl8 plh3 size-111 p-lr-15'
                          type='text'
                          name='address'
                          placeholder='Enter your Address'
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
                    <span className='mtext-110 cl2'>₦1,079.65</span>
                  </div>
                </div>
                <button className='flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer'>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </PageWrapper>
  );
};

export default cart;
