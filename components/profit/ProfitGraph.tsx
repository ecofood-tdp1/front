import { Box } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ProfitGraph = (props: {shopIncome: number, profitsMonthBefore: number}) => {

  const data = [
    { name: 'E', month: 'Enero' , Ganancia: 12730 },
    { name: 'F', month: 'Febrero' , Ganancia: 15265 },
    { name: 'M', month: 'Marzo' , Ganancia: 20616 },
    { name: 'A', month: 'Abril' , Ganancia: 24255 },
    { name: 'M', month: 'Mayo' , Ganancia: 32265 },
    { name: 'J', month: 'Junio' , Ganancia: props.profitsMonthBefore },
    { name: 'J', month: 'Julio' , Ganancia: props.shopIncome },
    { name: 'A', month: 'Agosto' , Ganancia: 0 },
    { name: 'S', month: 'Septiembre' , Ganancia: 0 },
    { name: 'O', month: 'Octubre' , Ganancia: 0 },
    { name: 'N', month: 'Noviembre' , Ganancia: 0 },
    { name: 'D', month: 'Diciembre' , Ganancia: 0 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ background: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>{data.month}</p>
          <p style={{ fontSize: '12px' }}>Ganancia: {data.Ganancia}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Box p={1} paddingTop={4}>
      <BarChart width={310} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip active={true} payload={data} />} />
        <Legend />
        <Bar dataKey="Ganancia" fill="#83C135" />
      </BarChart>
    </Box>
  );
};

export default ProfitGraph;
