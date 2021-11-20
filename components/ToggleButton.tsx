const ToggleButton = ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => {
  return (
    <div
      className="flex items-center justify-center w-full text-center cursor-pointer text-darkMint gap-[0.375rem]"
      onClick={onToggle}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isOpen ? "" : "transform transition-transform rotate-180"}
      >
        <path
          d="M8.98532 4.99991L4.74268 0.757272L0.500035 4.99991"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>
      <p>{isOpen ? "Ẩn bớt thông tin" : "Xem đầy đủ thông tin"}</p>
    </div>
  );
};

export default ToggleButton;
