import { useEffect } from 'react';

export function FacebookComment({ link }) {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <div className="facebookComment">
      <div
        className="fb-comments"
        data-href={link}
        data-width="100%"
        data-numposts="5"
      ></div>
    </div>
  );
}
