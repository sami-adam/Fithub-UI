import * as React from 'react';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import { Paper, useTheme } from '@mui/material';

export default function PieChartCustom({items=[]}) {
  const theme = useTheme();
  const primaryMainColor = theme.palette.primary.main;
  return (
    <Paper style={{padding: "18px"}} elevation={0} sx={{boxShadow:"0px 4px 5px 5px rgb(244 244 244)", borderRadius:"12px"}}>
        <div>
          <PieChart
          series={[
              {
              arcLabel: (item) => `${item.value}`,
              data: items,
              innerRadius: 18,
              },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "rgb(0, 102, 204)",
              fontWeight: 'bold',
            },
          }}
          width={250}
          height={120}
          
          />
        </div>
    </Paper>
  );
}
