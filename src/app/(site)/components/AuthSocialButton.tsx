import Button from "@/components/Button";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType
  isLoading: boolean
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({ 
  icon: Icon,
  isLoading,
  onClick,
}) => {
  return ( 
    <Button
      type="button"
      variant='default'
      size='xxl'
      isLoading={isLoading}
      onClick={onClick}
    >
      <Icon />
    </Button>
   );
}
 
export default AuthSocialButton;
