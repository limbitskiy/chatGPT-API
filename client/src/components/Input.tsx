// interface InputProps {
//   value: string;
// }

const Input: React.FC = () => {
  return (
    <>
      <div className="textarea-wrapper ring-1 ring-gray-300">
        <textarea className="w-full p-2 max-h-36 field-sizing-content resize-none " />
        <div className="button-container flex justify-between px-2 py-1">
          <button>M</button>
          <button>E</button>
        </div>
      </div>
    </>
  );
};

export default Input;
