import PageWrapper from 'components/common/PageWrapper';
import { useQuery } from '@apollo/client';
import { TOP_CATEGORIES } from 'graphql/queries';
import { AllTopCategories } from 'types';

const about = () => {
  const { data } = useQuery<AllTopCategories>(TOP_CATEGORIES);

  return (
    <PageWrapper allTopCategories={data?.allTopCategories}>
      <section className='bg-img1 txt-center p-lr-15 p-tb-92'>
        <h2 className='ltext-105 cl0 txt-center'>About</h2>
      </section>
      <section className='bg0 p-t-75 p-b-120'>
        <div className='container'>
          <div className='row p-b-148'>
            <div className='col-md-7 col-lg-8'>
              <div className='p-t-7 p-r-85 p-r-15-lg p-r-0-md'>
                <h3 className='mtext-111 cl2 p-b-16'>Our Story</h3>
                <p className='stext-113 cl6 p-b-26'>
                  Strands natural deals in natural hair products that are
                  tailored to suit every natural hair needs. It caters to every
                  type of natural hair and even textured hair, relaxed hair, and
                  it’s not limited to that alone. Strands Natural is a leading
                  online store that ensures that customers hair needs are met,
                  From the comfort of their homes or wherever they may be. The
                  goal is ease and reliability. From the ordering process down
                  to the delivery, Strands provide the best service.
                </p>
                <p className='stext-113 cl6 p-b-26'>
                  Strands natural has 24 hours Customer Care supports, present
                  at all points of order, from order processing to order
                  confirmation. You will receive messages regarding your orders
                  once they have been placed, And also receive a survey at the
                  end of every order to ensure that the service rendered was to
                  your satisfaction .
                </p>
                <p className='stext-113 cl6 p-b-26'>
                  Any questions? Let us know in store at 5/7 Peter Ujomu close,
                  Seaside Estate, Badore, Ajah, Lagos or call us on 08108877482
                </p>
              </div>
            </div>
            <div className='col-11 col-md-5 col-lg-4 m-lr-auto'>
              <div className='how-bor1 '>
                <div className='hov-img0'>
                  <img src='images/about-01.jpg' alt='IMG' />
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='order-md-2 col-md-7 col-lg-8 p-b-30'>
              <div className='p-t-7 p-l-85 p-l-15-lg p-l-0-md'>
                <h3 className='mtext-111 cl2 p-b-16'>Our Mission</h3>
                <p className='stext-113 cl6 p-b-26'>
                  The goal of Strands Naturale is ease, efficiency and
                  reliability. From the ordering process down to the delivery,
                  strands provide the best service. Integrity is among our core
                  values and timelines is very important to us.
                </p>
              </div>
            </div>
            <div className='order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30'>
              <div className='how-bor2'>
                <div className='hov-img0'>
                  <img src='images/about-02.jpg' alt='IMG' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default about;
