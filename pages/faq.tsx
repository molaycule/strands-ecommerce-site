import { Accordion, Card, Container } from 'react-bootstrap';
import PageWrapper from 'components/common/PageWrapper';

const faq = () => {
  return (
    <PageWrapper>
      <section className='bg-img1 txt-center p-lr-15 p-tb-92'>
        <h2 className='ltext-105 cl0 txt-center'>FAQ</h2>
      </section>
      <section className='bg0 p-t-75 p-b-120'>
        <Container>
          <Accordion defaultActiveKey='0'>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='0'>
                Can I buy in bulk?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  Yes, you can buy in bulk. Simply Input the item you’d like to
                  order and increase the quantity number. In case of
                  unavailability of the product or the number required, you can
                  contact customer care service.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='1'>
                How reliable and safe is their delivery?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='1'>
                <Card.Body>
                  The goal is ease and reliability. From the ordering process
                  down to the delivery, strands provide the best service.
                  Integrity is among our core values and timelines are very
                  important to us.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='2'>
                How Good is their customer support?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='2'>
                <Card.Body>
                  Strands natural has 24 hours Customer Care supports, Present
                  at all points of order, from order processing to order
                  confirmation. You will receive messages regarding your orders
                  once they have been placed, And also receive a survey at the
                  end of every order To ensure that the service rendered was to
                  your satisfaction.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='3'>
                What Product do they sell?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='3'>
                <Card.Body>
                  Strands natural deals in natural hair products that are
                  tailored to suit every natural hair needs. It caters to every
                  type of natural hair and even textured hair, relaxed hair, and
                  it’s not limited to that alone.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='4'>
                Who is Strand Natural?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='4'>
                <Card.Body>
                  Strands Natural deals in natural hair products that are
                  tailored to suit every natural hair needs. It caters to every
                  type of natural hair and even textured hair, relaxed hair, and
                  it's not limited to that alone. Strands Natural is a leading
                  online store that ensures that customer's hair needs are met,
                  from the comfort of their homes or wherever they may be.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>
      </section>
    </PageWrapper>
  );
};

export default faq;
