import Image from "next/image";

const Modal = ({ image, onClose }: { image: string; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="relative bg-white p-2 md:p-6 rounded-lg w-[80vw] h-[50vh] md:h-[60vh] max-w-2xl">
      <button
        className="absolute top-1 right-1 text-gray-600 hover:text-gray-900 text-[35px]"
        onClick={onClose}
      >
        &times;
      </button>
      <Image
        src={image}
        alt="Modal Image"
        width={800}
        height={800}
        className="w-full h-full object-contain"
      />
    </div>
  </div>
);

export default Modal;
