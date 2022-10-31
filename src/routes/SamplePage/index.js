import React from "react";
import {Col, Row} from "antd";
import ChartCard from "../../components/dashboard/Listing/ChartCard";
import {Area, AreaChart, ResponsiveContainer, Tooltip} from "recharts";

import IntlMessages from "util/IntlMessages";

export const propertiesData = [
  {name: 'Page A', properties: 200},
  {name: 'Page B', properties: 1200},
  {name: 'Page C', properties: 600},
  {name: 'Page D', properties: 1600},
  {name: 'Page D', properties: 1000},
  {name: 'Page H', properties: 2260},
  {name: 'Page K', properties: 800},
];

const SamplePage = () => {

  return (
    <Row>
    <Col xl={6} lg={12} md={12} sm={12} xs={24}>
    <ChartCard chartProperties={{
      title: 'Resources',
      prize: '0,00',
      icon: 'stats',
      bgColor: 'primary',
      styleName: 'up',
      desc: 'This week',
      percent: '03%',
    }}
               children={<ResponsiveContainer width="100%" height={75}>
                 <AreaChart data={propertiesData}
                            margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                   <Tooltip/>
                   <Area dataKey='properties' strokeWidth={0} stackId="2" stroke='#092453' fill="#092453"
                         fillOpacity={1}/>
                 </AreaChart>
               </ResponsiveContainer>}
    />
    

  </Col>
    <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard
            chartProperties={{
              title: 'Locations',
              prize: '0,00',
              icon: 'stats',
              bgColor: 'orange',
              styleName: 'up',
              desc: 'This week',
              percent: '',
            }}
            children={<ResponsiveContainer width="100%" height={75}>
           <AreaChart data={propertiesData}
                            margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                   <Tooltip/>
                   <Area dataKey='properties' strokeWidth={0} stackId="2" stroke='#092453' fill="#092453"
                         fillOpacity={1}/>
                 </AreaChart>
            </ResponsiveContainer>}
          />
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard
            chartProperties={{
              title: 'Billable Revenue',
              prize: '0,00',
              icon: 'stats',
              bgColor: 'teal',
              styleName: 'down',
              desc: 'This week',
              percent: '',
            }}
            children={<ResponsiveContainer width="100%" height={75}>
             <AreaChart data={propertiesData}
                            margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                   <Tooltip/>
                   <Area dataKey='properties' strokeWidth={0} stackId="2" stroke='#092453' fill="#092453"
                         fillOpacity={1}/>
                 </AreaChart>
            </ResponsiveContainer>}
          />
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ChartCard
            chartProperties={{
              title: 'Incident Repoerts',
              prize: '0,00',
              icon: 'stats',
              bgColor: 'pink',
              styleName: 'down',
              desc: 'This week',
              percent: '39',
            }}
            children={<ResponsiveContainer width="100%" height={75}>
            <AreaChart data={propertiesData}
                            margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                   <Tooltip/>
                   <Area dataKey='properties' strokeWidth={0} stackId="2" stroke='#092453' fill="#092453"
                         fillOpacity={1}/>
                 </AreaChart>
            </ResponsiveContainer>}
          />
        </Col>
  </Row>
  );
};

export default SamplePage;
