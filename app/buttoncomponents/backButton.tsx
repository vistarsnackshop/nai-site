import { useRouter } from 'next/router';
import { IoArrowBackCircle } from 'react-icons/io5';

const BackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <button onClick={goBack} className="flex items-center space-x-1">
      <IoArrowBackCircle className="w-6 h-6 bg-vistarGreen hover:bg-vistarGreenHover" />
      <span>Go Back</span>
    </button>
  );
};

export default BackButton;
