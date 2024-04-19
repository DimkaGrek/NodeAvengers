import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { loginThunk, verifyLoginThunk } from '../../redux/auth/operations';
import { useEffect } from 'react';
import { selectIsLoggedIn } from '../../redux/auth/slice';

const messagesList = {
  1: 'Your account was activeted successfully.',
  2: 'Activation link no valid. Please, try again to recieve new link.',
};

const VerifyPage = () => {
  const dispatch = useDispatch();
  const { messageCode } = useParams();
  const [searchParams] = useSearchParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = searchParams.get('token');
  console.log('Verification success');
  useEffect(() => {
    const verifyLogin = async () => {
      try {
        if (token) {
          await dispatch(verifyLoginThunk(token)).unwrap();
          console.log('Verification success');
          dispatch(loginThunk());
        }
      } catch (error) {
        console.error('Verification error:', error);
      }
    };

    verifyLogin();
  }, [dispatch, token]);

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
