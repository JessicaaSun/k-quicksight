export const generateText = (txt) => {
    return {
        _id: "64c0a0cef4424c5a918333fa",
        img: "https://imgur.com/XdJCRjX.png",
        data: `{"rootId":"6fccf84f-b3cd-4e9c-88bb-a10021e83205","layers":{"6fccf84f-b3cd-4e9c-88bb-a10021e83205":{"type":{"resolvedName":"TextLayer"},"props":{"text":"<p style=\\"font-size: 40px; text-align: center\\">${txt}</p>","position":{"x":373,"y":317},"boxSize":{"width":500,"height":60,"x":379,"y":300},"scale":1,"rotate":0,"fonts":[{"name":"Oswald","fonts":[{"style":"Bold","urls":["https://lidojs-fonts.s3.us-east-2.amazonaws.com/Oswald/Oswald-Bold.woff2"]},{"urls":["https://lidojs-fonts.s3.us-east-2.amazonaws.com/Oswald/Oswald-Regular.woff2"]}]}],"colors":["rgb(40, 255, 13)"],"fontSizes":[162.667],"effect":{"name":"echo","settings":{"offset":0,"direction":0,"color":"rgb(255, 255, 255)"}}},"locked":false,"child":[],"parent":"ROOT"}}}`,
      }
};
export const generateCard = (txt, value) => {
  return {
      _id: "64c0a0cef4424c5a918333fa",
      img: "https://imgur.com/XdJCRjX.png",
      data: `{"rootId":"6fccf84f-b3cd-4e9c-88bb-a10021e83205","layers":{"6fccf84f-b3cd-4e9c-88bb-a10021e83205":{"type":{"resolvedName":"TextLayer"},"props":{"text":"<div style=\\"background-color: white; border: transparent; border-radius: 15px; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; text-align: center; display: flex; justify-content: space-between; flex-direction: column; padding: 35px 20px 45px 20px;\\"><p style=\\"font-size: 45px; text-align: center\\">${txt}</p><p style=\\"font-size: 20px; text-align: center\\">${value}</p></div>","position":{"x":373,"y":317},"boxSize":{"width":300,"height":180,"x":379,"y":300},"scale":1,"rotate":0,"fonts":[{"name":"Oswald","fonts":[{"style":"Bold","urls":["https://lidojs-fonts.s3.us-east-2.amazonaws.com/Oswald/Oswald-Bold.woff2"]},{"urls":["https://lidojs-fonts.s3.us-east-2.amazonaws.com/Oswald/Oswald-Regular.woff2"]}]}],"colors":["rgb(40, 255, 13)"],"fontSizes":[162.667],"effect":{"name":"echo","settings":{"offset":0,"direction":0,"color":"rgb(255, 255, 255)"}}},"locked":false,"child":[],"parent":"ROOT"}}}`,
    }
};

