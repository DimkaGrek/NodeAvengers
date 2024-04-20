import { useDispatch, useSelector } from 'react-redux';
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { verifyLoginThunk } from '../../redux/auth/operations';
import { useEffect } from 'react';
import { selectIsLoggedIn } from '../../redux/auth/slice';
import { toast } from 'react-toastify';

const messagesList = {
  1: 'Your account was activeted successfully.',
  2: 'Activation link no valid. Please, try again to recieve new link.',
};

const VerifyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messageCode } = useParams();
  const [searchParams] = useSearchParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyLogin = async () => {
      if (token) {
        await dispatch(verifyLoginThunk(token))
          .unwrap()
          .then(() => {
            toast.success(`Verification and log in success.`);
            navigate('/home');
          });
      }
    };

    verifyLogin();
  }, [dispatch, token, navigate]);

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div>
      <h2>Success Page</h2>
      <p>{messagesList[messageCode]}</p>
    </div>
  );
};

export default VerifyPage;
