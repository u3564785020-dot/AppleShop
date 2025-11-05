import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const LocalizedLink = ({ to, children, ...props }) => {
  const { lang } = useParams();
  const langPrefix = lang || 'en';
  const href = `/${langPrefix}${to.startsWith('/') ? '' : '/'}${to}`;
  
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
};
