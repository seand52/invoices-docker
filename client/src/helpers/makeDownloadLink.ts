export const makeDownloadLink = type => (source, id) => {
  const downloadLink = document.createElement('a');
  const fileName = `${type}-${id}.pdf`;

  downloadLink.href = source;
  downloadLink.download = fileName;
  downloadLink.click();
};

export const downloadInvoice = makeDownloadLink('factura');
export const downloadSalesOrder = makeDownloadLink('albaran');
