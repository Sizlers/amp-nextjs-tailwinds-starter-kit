import Document, { Html, Head, Main, NextScript } from "next/document";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

class MyDocument extends Document {
 static async getInitialProps(ctx) {
  const projectDir = __dirname.split(".next")[0];
  const initialProps = await Document.getInitialProps(ctx);

  const styles = await readFile(
   path.join(projectDir, "./styles/output.css"),
   "utf8"
  );

  return {
   ...initialProps,
   styles: (
    <>
     <style
      dangerouslySetInnerHTML={{
       __html: styles,
      }}
     />
     {initialProps.styles}
    </>
   ),
  };
 }

 render() {
  return (
   <Html>
    <Head />
    <body>
     <Main />
     <NextScript />
    </body>
   </Html>
  );
 }
}

export default MyDocument;
