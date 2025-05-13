const BackgroundFigures = () => {
  return (
    <div className="figures fixed inset-0 z-0">
      <div className="square w-60 h-60 rotate-12 border-2 border-[#18720F] absolute left-[calc(50%+170px)] top-1/12 animate-spin [animation-duration:_190s]"></div>
      {/* <div className="triangle absolute left-1/6 top-2/4"></div> */}
      <svg
        className="absolute left-[calc(50%-350px)] top-2/4 animate-spin [animation-duration:_220s]"
        width="226"
        height="230"
        viewBox="0 0 226 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M223.836 227.813L3.03859 161.693L170.698 3.53577L223.836 227.813Z" stroke="#0FD226" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default BackgroundFigures;
