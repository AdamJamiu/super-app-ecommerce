import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OrdersCard from '../orders/OrdersCard';
import { getAllOrdersByUserId } from '../../controllers/dashboard';
import { Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { dashboardClient } from '../../interceptors';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function OrdersTab() {
  const [value, setValue] = useState(0);
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const [isOpenOrderPageSize, setisOpenOrderPageSize] = useState(10)
  const [isClosedOrderPagedSize, setisClosedOrderPageSize] = useState(10)

  const { data: openOrder, isInitialLoading: isOpenOrderLoading, isRefetching: isOpenRefetching, refetch } = useQuery({
    queryKey: ["open-orders"],
    queryFn: () => dashboardClient.get(`Order/GetAllUserOrders/${userId}`, {
      params: {
        PageSize: isOpenOrderPageSize,
        Classification: "OPENED"
      }
    }).then(res => res?.data?.data),
    retry: 5,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchInterval: 30 * 1000,
  })

  // console.log(openOrder)

  const { data: closedOrder = [], isInitialLoading: isClosedOrderLoading, isRefetching: isClosedRefetching, } = useQuery({
    queryKey: ["closed-orders", isClosedOrderPagedSize],
    queryFn: async () => await dashboardClient.get(`Order/GetAllUserOrders/${userId}`, {
      params: {
        PageSize: isClosedOrderPagedSize,
        Classification: "CLOSED"
      }
    }).then(res => res?.data?.data),
    retry: 5,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchInterval: 30 * 1000,
  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    refetch()
  }, [isOpenOrderPageSize])

  return (
    <div className='w-full'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant='standard' value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={`Open Orders (${openOrder?.length})`} {...a11yProps(0)} />
          <Tab label={`Closed Orders (${closedOrder?.length})`} {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <OrdersCard showMore={setisOpenOrderPageSize} isLoading={isOpenOrderLoading} loading={isOpenRefetching} data={openOrder} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <OrdersCard showMore={setisClosedOrderPageSize} isLoading={isClosedOrderLoading} loading={isClosedRefetching} data={closedOrder} />
      </CustomTabPanel>

    </div>
  );
}
