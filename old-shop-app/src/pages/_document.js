import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import { createGetInitialProps } from '@mantine/next';

export default class Document extends NextDocument {
  static getInitialProps = createGetInitialProps()

  render() {
    return (
      <Html lang='ru'>
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/logo.svg"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/logo.svg"
          />
        </Head>
        <body>
          <div id="modal"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

