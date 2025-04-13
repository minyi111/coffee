require(["esri/views/MapView", "esri/WebMap"], function(MapView, WebMap) {
  const webmap1 = new WebMap({
    portalItem: { id: "7f67f7671f6248b6886dd7ce6b1972b5" } // 门店数量图
  });

  const view = new MapView({
    container: "viewDiv",
    map: webmap1,
    center: [0, 30],
    zoom: 2
  });

  view.when(() => {
    // 获取所有图层
    const layer = webmap1.layers.getItemAt(0); // 默认取第一个图层（你可以换成其他图层）

    // 自定义 popup 模板
    layer.popupTemplate = {
      title: "{Continent}",
      content: (feature) => {
        const attr = feature.graphic.attributes;
        const brands = ["Starbucks", "Tim_Hortons", "Luckin", "Costa"];

        // 饼图渲染
        renderChart([
          attr.Starbucks,
          attr.Tim_Hortons,
          attr.Luckin,
          attr.Costa
        ], brands);

        return `
          <b>Starbucks:</b> ${attr.Starbucks}<br>
          <b>Tim Hortons:</b> ${attr.Tim_Hortons}<br>
          <b>Luckin:</b> ${attr.Luckin}<br>
          <b>Costa:</b> ${attr.Costa}<br>
          <i>*Click to view pie chart on the right</i>
        `;
      }
    };
  });

  // ===== Chart.js 饼图逻辑 =====
  function renderChart(data, labels) {
    document.getElementById("chartDiv").style.display = "block";
    const ctx = document.getElementById("pieChart").getContext("2d");

    if (window.pieChartInstance) {
      window.pieChartInstance.destroy();
    }

    window.pieChartInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ["#4caf50", "#a1887f", "#2196f3", "#e57373"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
});
