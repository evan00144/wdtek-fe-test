import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div onClick={handleClick} className="success-page">
      <img src="/check-icon.png" width={100} alt="" />
      <h1 className="mt-4">Success</h1>
      <p>Click anywhere to continue</p>
    </div>
  );
}
