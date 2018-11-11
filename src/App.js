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
            status: false,
        };
    }

    componentDidMount() {
        connect.subscribe((e) => {
            if (e.detail.hasOwnProperty('type')) {
                switch (e.detail.type) {
                    case 'VKWebAppGetUserInfoResult':
                        this.setState({ fetchedUser: {
                                id: e.detail.data.id,
                                first_name: e.detail.data.first_name,
                                last_name: e.detail.data.last_name
                            }});
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
        connect.send('VKWebAppGetGeodata', {});
    }

    getGeoData = () => {
        const xhr = new XMLHttpRequest();
        const url = "https://615230d9.ngrok.io/submit";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("XHR finished");
            }
        };

        console.log(this.state.status);
        console.log(this.state.fetchedUser.first_name + " " + this.state.fetchedUser.last_name);
        const data = JSON.stringify({"user_id": this.state.fetchedUser.id,
            "name": this.state.fetchedUser.first_name + " " + this.state.fetchedUser.last_name,
            "lat": this.state.geodata.lat,
            "lng": this.state.geodata.lng,
            "time": "2018-11-11 15:35:04.179729",
            "presence": this.state.status});

        xhr.send(data);
    }

    setActiveStatus = () => {
        if (!this.state.status) {
            this.state.status = true;
        }
        else {
            this.state.status = false;
        }
        this.getGeoData();
    }

    render() {
        return (
            <View activePanel={this.state.activePanel}>
                <Home id="home" user={this.state.fetchedUser} geodata={this.state.geodata} getGeoData={this.setActiveStatus}/>
            </View>
        );
    }
}

export default App;
