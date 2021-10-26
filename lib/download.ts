import FileSaver from "file-saver";

async function download(variantIds: string[]) {
  const canvas = document.createElement("canvas");
  const geneImage = document.getElementById("gene") as HTMLImageElement;
  canvas.width = geneImage.naturalWidth;
  canvas.height = geneImage.naturalHeight;
  const context = canvas.getContext("2d");
  context.drawImage(
    geneImage as HTMLImageElement,
    0,
    0,
    geneImage.naturalWidth,
    geneImage.naturalHeight
  );
  variantIds.forEach((id) => {
    const image = document.getElementById(id);

    context.drawImage(
      image as HTMLImageElement,
      0,
      0,
      geneImage.naturalWidth,
      geneImage.naturalHeight
    );
  });
  const mergedImage = canvas.toDataURL("image/png");
  const blob = await (await fetch(mergedImage)).blob();
  FileSaver.saveAs(blob, "custom_bakia.jpeg");
}

export default download;
