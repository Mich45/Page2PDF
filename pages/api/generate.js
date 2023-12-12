import chromium from 'chrome-aws-lambda';

export default async function handler(req, res) {
  try {
    const { inputValue } = req.body;

    if (inputValue) {
      
      const browser = await chromium.puppeteer.launch({
          args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath,
          headless: true,
          ignoreHTTPSErrors: true,
        })
      const page = await browser.newPage();
      await page.goto(inputValue, { waitUntil: "networkidle2" });

      const pdfBuffer = await page.pdf({ format: "A4" });
      await browser.close();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Length", `${pdfBuffer.length}`);
      res.status(200).send(pdfBuffer);
    } else {
      res.status(405).json({ message: "No input received." });
    }
  } catch (error) {
    console.log(error);
  }
}
