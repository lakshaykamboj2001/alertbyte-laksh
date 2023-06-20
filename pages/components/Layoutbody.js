// components/Layout.js

import Script from 'next/script';

const Layout = ({ children }) => {
  return (
    <>
      {/* Your layout content */}
      {children}
      <Script
        strategy="lazyOnload"
        src="https://leadbooster-chat.pipedrive.com/assets/loader.js"
        async
      />
      <Script strategy="lazyOnload">
        {`
          window.pipedriveLeadboosterConfig = {
            base: 'leadbooster-chat.pipedrive.com',
            companyId: 11231043,
            playbookUuid: 'ee7995aa-a52c-4516-b14e-13971503eb5c',
            version: 2
          };
          (function() {
            var w = window;
            if (w.LeadBooster) {
              console.warn('LeadBooster already exists');
            } else {
              w.LeadBooster = {
                q: [],
                on: function(n, h) {
                  this.q.push({ t: 'o', n: n, h: h });
                },
                trigger: function(n) {
                  this.q.push({ t: 't', n: n });
                },
              };
            }
          })();
        `}
      </Script>
    </>
  );
};

export default Layout;
