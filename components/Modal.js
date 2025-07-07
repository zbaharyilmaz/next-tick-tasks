const Modal = ({ children, onClose }) => {
  return (
    <div>
      <div
        className="fixed inset-0 flex items-center justify-center bg-teal-700 bg-opacity-50 z-50"
        onClick={onClose}
      ></div>
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   bg-white rounded-lg shadow-lg p-6 z-50 w-96 max-w-full"
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;