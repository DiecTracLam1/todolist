import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MenuComponent from '~/views/component/Menu';

const MainPage = ({ searchParams }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user_token')) {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <>
      <MenuComponent searchParams={searchParams} />
      <Outlet />
    </>
  );
};

export default MainPage;
