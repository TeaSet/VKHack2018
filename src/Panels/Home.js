import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, ListItem, PanelHeader, Cell, Switch} from '@vkontakte/vkui';

const Home = (props) => (
    <Panel id={props.id}>
        <PanelHeader>Home Screen</PanelHeader>
        {
            <Group>
                <ListItem>
                    <Cell asideContent={<Switch onClick={props.getGeoData}/>} >
                        Activate Your Money Collector
                    </Cell>
                </ListItem>
            </Group>
        }
    </Panel>
);

Home.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        user_id: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
    geodata: PropTypes.shape({
        lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    fetchedUser: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    go: PropTypes.func.isRequired,
    getGeoData: PropTypes.func.isRequired,
    closeConnection: PropTypes.func.isRequired,
};

export default Home;
