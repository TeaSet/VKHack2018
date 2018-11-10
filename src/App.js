import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import Home from './Panels/Home';
import '@vkontakte/vkui/dist/vkui.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'home',
            fetchedUser: null,
            geodata: null,
        };
    }

    componentDidMount() {
        connect.subscribe((e) => {
            if (e.detail.hasOwnProperty('type')) {
                switch (e.detail.type) {
                    case 'VKWebAppGetUserInfoResult':
                        this.setState({ fetchedUser: e.detail.data});
                        break;
                    case 'VKWebAppGeodataResult':
                        this.setState({ geodata: {
                                lat: e.detail.data.lat,
                                lng: e.detail.data.long
                            } });
                        break;
                    default:
                        break;
                }
            }
        });
        connect.send('VKWebAppGetUserInfo', {});
    }

    getGeoData = () => {

        const xhr = new XMLHttpRequest();
        const url = "http://172.20.36.209/submit";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("XHR finished");
            }
        };
        console.log(this)
        const data = JSON.stringify({"user_id": this.state.fetchedUser, "lat": this.state.geodata.lat, "lng": this.state.geodata.lng, "time": "2018-11-11 15:35:04.179729"});
        xhr.send(data);
    }

    render() {
        return (
            <View activePanel={this.state.activePanel}>
                <Home id="home" user={this.state.fetchedUser} geodata={this.state.geodata} getGeoData={this.getGeoData}/>
            </View>
        );
    }
}

export default App;
