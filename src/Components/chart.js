import React, { useState, useEffect, useRef } from 'react';
import { fetchAxisData } from '../Services/api';
import Chart from 'chart.js/auto';

function ViewChart() {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const xAxisParam = 'gDa8uC';
  const yAxisParam = 'o5zMs5';
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchDataForChart = async () => {
      try {
        const xAxisData = await fetchAxisData(xAxisParam);
        const yAxisData = await fetchAxisData(yAxisParam);
         console.log("xAxisData",xAxisData);
         console.log("yAxisData",yAxisData);
        setXData(xAxisData.slice(0, 50));
        setYData(yAxisData.slice(0, 50));
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataForChart();
  }, [xAxisParam, yAxisParam]);

  useEffect(() => {
    if (xData.length > 0 && yData.length > 0) {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('chart1').getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: xData.map((item)=>item?.Label),
          datasets: [{
            label: 'Y-Axis Data',
            data: yData.map((item)=>item?.RandomNumber),
            borderColor: '#36A2EB',
      backgroundColor: '#9BD0F5',

          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'X-Axis',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Y-Axis'
              },
            }
          }
        }
      });
    }
  }, [xData, yData]);

  return (
    <div  style={{ height: '100vh', width: '400vw' }}>
      <canvas id="chart1"></canvas>
    </div>
  );
}

export default ViewChart;
