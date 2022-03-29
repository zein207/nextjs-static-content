import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => 
            originalRenderPage({
                enhanceApp: App => props => 
                sheet.collectStyles(<App {...props} />),
            })

            const getInitialProps = await Document.getInitialProps(ctx);

            return {
                ...getInitialProps,
                styles: (
                    <>
                        {getInitialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            }
        } finally {
            sheet.seal();
        }
    }
}

//https://styled-components.com/docs/advanced#with-babel
//https://github.com/vercel/next.js/blob/canary/examples/with-styled-components-babel/pages/_document.js