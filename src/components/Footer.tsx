import type { FC } from 'react';
import JumpingText from './JumpingText';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <p><JumpingText text={`© ${new Date().getFullYear()} Anugrah. All rights reserved.`} /></p>
    </footer>
  );
};

export default Footer;
