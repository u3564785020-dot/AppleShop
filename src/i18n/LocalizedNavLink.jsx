import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const LocalizedNavLink = ({ to, children, ...props }) => {
  const { lang } = useParams();
  const langPrefix = lang || 'en';
  const href = `/${langPrefix}${to.startsWith('/') ? '' : '/'}${to}`;
  
  return (
    <NavLink to={href} {...props}>
      {children}
    </NavLink>
  );
};
