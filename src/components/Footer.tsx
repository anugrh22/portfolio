import type { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Anugrah. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
