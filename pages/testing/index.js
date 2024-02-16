import React, { useEffect, useState } from 'react';
import Sidenav from '../../components/sidenav';

export default function Layout() {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch('../index.html')
      .then(response => response.text())
      .then(data => setHtmlContent(data));
  }, []);
  return (
    <div className="flex bg-white">
      <Sidenav />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}