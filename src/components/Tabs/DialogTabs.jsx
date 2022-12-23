import * as React from 'react';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './style.scss'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function CardTabs(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Base charact" />
          <Tab label="Stats" />
          {/* <Tab label="Attacks" /> */}
        </Tabs>
        <TabPanel value={value} index={0} dir={theme.direction}>
          {/* <ProgressBar variant="success" now={40} /> */}
          {
            props.poke.stats ?
              <ul className='DialogCaracList'>
                <li><span>Name</span>  {props.poke.name}</li>
                <li><span>Base HP</span> <span>{props.poke.base_experience}</span></li>
                <li><span>Height</span> <span>{props.poke.height}</span></li>
                <li><span>weight</span> <span>{props.poke.weight}</span></li>
                {/* <li><span>{props.poke.stats[4].stat.name}</span> <span>{props.poke.stats[4].base_stat}</span></li>
                <li><span>{props.poke.stats[5].stat.name}</span> <span>{props.poke.stats[5].base_stat}</span></li> */}
              </ul>
            :
            ""
          }
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {
            props.poke.stats ?
              <ul className='DialogCaracList'>
                <li><span>Name</span>  {props.poke.name}</li>
                <li><span>{props.poke.stats[0].stat.name}</span> <span>{props.poke.stats[0].base_stat}</span></li>
                <li><span>{props.poke.stats[1].stat.name}</span> <span>{props.poke.stats[1].base_stat}</span></li>
                <li><span>{props.poke.stats[3].stat.name}</span> <span>{props.poke.stats[3].base_stat}</span></li>
                <li><span>{props.poke.stats[4].stat.name}</span> <span>{props.poke.stats[4].base_stat}</span></li>
                <li><span>{props.poke.stats[5].stat.name}</span> <span>{props.poke.stats[5].base_stat}</span></li>
              </ul>
            :
            ""
          }
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {
            props.poke.stats ?
              <ul className='DialogCaracList'>
                <li><span>Name</span>  {props.poke.name}</li>
                <li><span>{props.poke.stats[0].stat.name}</span> <span>{props.poke.stats[0].base_stat}</span></li>
                <li><span>{props.poke.stats[1].stat.name}</span> <span>{props.poke.stats[1].base_stat}</span></li>
                <li><span>{props.poke.stats[3].stat.name}</span> <span>{props.poke.stats[3].base_stat}</span></li>
                <li><span>{props.poke.stats[4].stat.name}</span> <span>{props.poke.stats[4].base_stat}</span></li>
                <li><span>{props.poke.stats[5].stat.name}</span> <span>{props.poke.stats[5].base_stat}</span></li>
              </ul>
            :
            ""
          }
        </TabPanel>

    </Box>
  );
}