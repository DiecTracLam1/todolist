import MenuComponent from '~/views/component/Menu';
import useCustomSearchParams from '~/useCustom/useCustomSearchParams';
import Abc from '~/abc';


export const RouteCompoent = () => {
  const [searchParams, setSearchParams] = useCustomSearchParams();

  return [
    {
      path: '/',
      element: <MenuComponent />,
      children :[
        {
            index:true,
            element:<Abc/>
        }
      ]
    },
  ];
};
