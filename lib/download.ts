import FileSaver from "file-saver";

const WIDTH = 480;
const HEIGHT = 754;

async function download(variantIds: string[]) {
  const canvas = document.createElement("canvas");
  const geneImage = document.getElementById("gene") as HTMLImageElement;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext("2d");
  context.drawImage(geneImage as HTMLImageElement, 0, 0, WIDTH, HEIGHT);
  variantIds.forEach((id) => {
    const image = document.getElementById(id);

    context.drawImage(image as HTMLImageElement, 0, 0, WIDTH, HEIGHT);
  });
  const mergedImage = canvas.toDataURL("image/png");
  const blob = await (await fetch(mergedImage)).blob();
  FileSaver.saveAs(blob, "custom_bakia");
}

export default download;
