import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loader = () => {
  return (
    <div className='flex-c-m w-full'>
      <FontAwesomeIcon icon='spinner' size='2x' spin />
    </div>
  );
};

export default Loader;
