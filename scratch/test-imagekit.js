const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: "dummy",
  privateKey: "dummy",
  urlEndpoint: "https://ik.imagekit.io/dummy"
});

console.log("If ImageKit requires extension:", imagekit);
