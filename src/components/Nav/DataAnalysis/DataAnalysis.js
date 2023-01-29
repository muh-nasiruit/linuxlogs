import React from 'react';
import Chart from 'react-apexcharts';
import DataAnalysisCSS from './DataAnalysis.module.css';
import Sidebar from '../../Sidebar/Sidebar';

const DataAnalysis = () => {

  return (
    <>
    <div className="users-container">
    <Sidebar/>
      <Chart
       className={DataAnalysisCSS.charts}
        type="bar"
        width={1000}
        height={600}
        series={[
          {
            name: 'UIT University',
            data: [100, 200, 232, 132, 422, 132],
            color: "#00FFFF"
          },
          {
            name: 'NED University',
            data: [150, 290, 282, 120, 425, 100],
            color: "#000000"
          },
          {
            name: 'FAST University',
            data: [190, 300, 272, 120, 420, 80],
            color: "#FFFF00"
          },
        ]}
        options={{
          // colors: ["#00FFFF", "#000000", "#FFFF00"]
          theme: {
            mode: 'dark'
          },
          chart: {
            stacked: true
          },
          tooltip: {
            followCursor: true
          },
          dataLabels: {
            formatter: (_val) => {
              return `${_val}`
            }
          },
          style: {
            fontSize: 16
          },
          xaxis: {
            tickPlacement: 'on',
          },
          yaxis: {
            labels: {
              formatter: (_val) => {
                return `${_val}`
              }
            }
          }
        }}> 
        </Chart>
        </div>
        </>
  )
}

export default DataAnalysis