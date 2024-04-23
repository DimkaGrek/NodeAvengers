import { useSelector } from 'react-redux';

import {
  selectAvatarURL,
  selectEmail,
  selectError,
  selectId,
  selectName,
  selectThemeId,
} from '../redux/user/slice';

export const useUser = () => {
  const id = useSelector(selectId);
  const userName = useSelector(selectName);
  const userEmail = useSelector(selectEmail);
  const userAvatar = useSelector(selectAvatarURL);
  const userTheme = useSelector(selectThemeId);
  const userError = useSelector(selectError);

  return {
    id,
    userName,
    userEmail,
    userAvatar,
    userTheme,
    userError,
  };
};
