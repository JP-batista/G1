import React from 'react';
import './globals.css';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="pt-BR">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Gerenciamento de Pagamentos</title>
    </head>
    <body>
      <header className="header">
        <h1>Gerenciamento de Pagamentos</h1>
      </header>
      <main className="container">{children}</main>
    </body>
  </html>
);

export default Layout;
