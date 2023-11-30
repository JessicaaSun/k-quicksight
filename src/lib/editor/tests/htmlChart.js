export const lineChart = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Line Chart</title>
        <!-- Include Chart.js library -->
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <!-- Include react-chartjs-2 library -->
        <script src="https://cdn.jsdelivr.net/npm/react-chartjs-2"></script>
      </head>
      <body>
        <div>
          <!-- Create a canvas element for the chart -->
          <canvas id="myLineChart" width="400" height="200"></canvas>
        </div>
  
        <script>
          // Chart configuration
          var ctx = document.getElementById('myLineChart').getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ["2023-01", "2023-02", "2023-03", "2023-04", "2023-05", "2023-06", "2023-07"],
              datasets: [{
                data: [100, 120, 115, 134, 168, 132, 200],
                backgroundColor: "purple",
              }],
            },
            options: {
              // Add any additional options here
            }
          });
        </script>
      </body>
      </html>
    `;
  };
  
  export const generateChart = (txt) => {
    return {
      _id: "64c0a0cef4424c5a918333fa",
      img: "https://imgur.com/XdJCRjX.png",
      data: `{"rootId":"6fccf84f-b3cd-4e9c-88bb-a10021e83205","layers":{"6fccf84f-b3cd-4e9c-88bb-a10021e83205":{"type":{"resolvedName":"TextLayer"},"props":{"text":"<div style=\\"font-size: 40px; text-align: center\\">${txt}</div>","position":{"x":373,"y":317},"boxSize":{"width":500,"height":60,"x":379,"y":300},"scale":1,"rotate":0,"fonts":[{"name":"Oswald","fonts":[{"style":"Bold","urls":["https://lidojs-fonts.s3.us-east-2.amazonaws.com/Oswald/Oswald-Bold.woff2"]},{"urls":["https://lidojs-fonts.s3.us-east-2.amazonaws.com/Oswald/Oswald-Regular.woff2"]}]}],"colors":["rgb(40, 255, 13)"],"fontSizes":[162.667],"effect":{"name":"echo","settings":{"offset":0,"direction":0,"color":"rgb(255, 255, 255)"}}},"locked":false,"child":[],"parent":"ROOT"}}}`,
      }
  };
  