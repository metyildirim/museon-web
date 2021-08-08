import HorizontalLine from "../horizontal-line";

const AuthDivider = () => {
  return (
    <div className="auth-divider">
      <HorizontalLine />
      <div className="divider-text-or">OR</div>
      <HorizontalLine />
    </div>
  );
};

export default AuthDivider;
