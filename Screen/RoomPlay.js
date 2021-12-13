import * as React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import socket from '../Socket.io/Socket';
import PokerCard from '../components/PokerCard';
import { Ionicons } from '@expo/vector-icons';
import UserProfile from '../components/RoomPlay/user'
import UserCard from '../components/RoomPlay/carduser';
import { changeScreen, login, musicGamePlay } from '../Redux/Action';
import { ip } from '../styles/config'
import DescriptionRoom from '../components/RoomPlay/DescriptionRoom';
import ButtonRectangle from '../components/ButtonRectangle';
import AnimListCardTable from '../components/RoomPlay/AnimListCardTable';
import Countdown2 from '../components/Countdown2';
import Profile from '../components/Profile';
import ModalPoup from '../components/ModalPoup';
import Friends from '../components/Friends'
import ToolsMenu from '../components/RoomPlay/toolsMenu';
import Chat from '../components/Chat'
import Attention from '../components/Attention'
import { Overlay } from 'react-native-elements';
import { Audio } from 'expo-av';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
class RoomPlay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Players: [],
            listCard: [],
            play: false,
            hiddenButton: false,
            listCardInTable: [],
            isTurn: false,
            index: null,
            showCountDown: false,
            showResult: false,

            showNewUser: false,
            newUser: null,
            showUserLogout: false,
            userLogout: null,
            showTools: false,

            ready: false,
            idUserWin: null,
            loading: true,

            messages: [],
            countMessages: 0,
            showChat: false,
            showProfile: false,
            showAttention: false,
            showFriend: false,
            userProfile: null,
            showCoinUp: false,
            tongcuoc: null,
            showCardError: false
        }
    }
    async componentDidMount() {
        axios.post(`${ip}/getPlayer`, { idRoom: this.props.idRoom }).then(response => {
            const { data } = response;
            var index = 0;
            data.Players.forEach((e, i) => {
                if (e.idUser === this.props.idUser)
                    index = i;
            })
            this.setState({ Players: data.Players, index: index, play: data.play })
        }).catch(err => {
            console.log(err)
        })
        this.danhbai = new Audio.Sound()
		this.danhbai.loadAsync(require('../assets/Audio/danhbai.mp3'))
		this.music_win = new Audio.Sound()
		this.music_win.loadAsync(require('../assets/Audio/music_win.mp3'))
		this.music_lose = new Audio.Sound()
		this.music_lose.loadAsync(require('../assets/Audio/music_lose.mp3'))
		this.s_denluot = new Audio.Sound()
		this.s_denluot.loadAsync(require('../assets/Audio/s_denluot.mp3'))
        socket.on('test', data => {
            let array = [];
            data.listCards.forEach(element => {
                array.push({ data: element, pick: false })
            });
            const { Players } = this.state
            Players.forEach((element, index) => {
                element.totalCards = 13;
                if (index === data.isTurn) element.dangdanh = true;
                else element.dangdanh = false;
            })
            this.setState({ showCountDown: true })
            setTimeout(() => {
                this.setState({ ready: false, play: true, listCard: array, isTurn: (data.isTurn === this.state.index), showCoinUp: true });
                setTimeout(() => {
                    this.setState({ showCoinUp: false })
                }, 3000)
                Players.forEach(element => {
                    element.coin -= this.props.tiencuoc;
                })
                this.props.login({ ...this.props.dataLogin, coin: this.props.coin - this.props.tiencuoc })
            }, 5000)
        })
        socket.on('updateRoomWhenJoin', (data) => {
            this.setState({ showNewUser: true, Players: [...this.state.Players, data], newUser: data.userName })
            setTimeout(() => {
                this.setState({ showNewUser: false, newUser: null })
            }, 4000)
        })
        socket.on('removeUser', (data) => {
            const Players = this.state.Players.filter(element => {
                return data !== element.idUser
            })
            var index = 0;
            Players.forEach((e, i) => {
                if (e.idUser === this.props.idUser)
                    index = i;
            })
            this.setState({ Players: Players, showUserLogout: true, index: index, userLogout: data })

            setTimeout(() => {
                this.setState({ showUserLogout: false, userLogout: null })
            }, 4000)
        })
        socket.on('updateIsTurn', (data) => {
            const Players = this.state.Players;
            Players.forEach((element, index) => {
                if (data === index)
                    element.dangdanh = true
                else
                    element.dangdanh = false
            })
            this.setState({ Players: Players, isTurn: data === this.state.index })
            if (data === this.state.index) {
                this.s_denluot.playAsync();
            }
        })
        socket.on('sendCard', (data) => {
            const { Players } = this.state;
            this.danhbai.playAsync()
            Players.forEach(element => {
                if (element.idUser === data.idUser) element.totalCards -= data.listCard.length;
            })
            const { listCardInTable } = this.state;
            const length = listCardInTable.length;
            if (length === 0)
                this.setState({ listCardInTable: [{ listCard: data.listCard, type: data.type, zoomOut: false, id: this.getRandomInt(10000) }], Players: Players });
            else
                this.setState({ listCardInTable: [{ ...listCardInTable[length - 1], zoomOut: true, id: this.getRandomInt(10000) }, { listCard: data.listCard, type: data.type, zoomOut: false, id: this.getRandomInt(1000) }], Players: Players })
        })
        socket.on('skip', (data) => {
            this.state.Players.forEach((element, index) => {
                if (element.idUser === data)
                    this.setState({ Players: [...this.state.Players.slice(0, index), { ...element, skip: true }, ...this.state.Players.slice(index + 1)] })
            })
        })
        socket.on('resetSkip', () => {
            const { Players } = this.state;
            Players.forEach(element => {
                element.skip = false
            })
            setTimeout(() => {
                this.setState({ Players: Players, listCardInTable: [] })
            }, 1000)
        })
        socket.on('gameOver', (data) => {
            const players = this.state.Players;
            players.forEach(element => {
                element.Viewer = false;
            })
            if (data.idUser === this.props.idUser) this.props.login({ ...this.props.dataLogin, coin: this.props.coin + data.tongtiencuoc })
            players.forEach(element => {
                if (element.idUser === data.idUser) {
                    element.coin += data.tongtiencuoc
                }
            })
            setTimeout(() => {
                if (data.idUser === this.props.idUser) {
                    this.music_win.playAsync()
                }
                else {
                   this.music_lose.playAsync()
                }
                this.setState({ showResult: true, players: players, idUserWin: data.idUser, tongcuoc: data.tongtiencuoc})
            }, 500)
            setTimeout(() => {
                this.setState({ showResult: false, listCardInTable: [], idUserWin: null, play: false })
            }, 10000);
        })
        socket.on('sendChat', (data) => {
            const count = data.idUser === this.props.idUser ? 0 : 1;
            this.setState({ messages: [...this.state.messages, data], countMessages: this.state.countMessages + count })
        })
    }
    componentWillUnmount() {
        socket.off('test');
        socket.off('sendChat');
        socket.off('gameOver');
        socket.off('resetSkip');
        socket.off('removeUser');
        socket.off('sendCard');
        socket.off('skip');
        socket.off('updateRoomWhenJoin')
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max) + 1;
    }
    acceptLogoutRoom = () => {
        if (this.state.isTurn && this.state.Players.length > 2) this.skip();
        socket.emit('logoutRoom', { idRoom: this.props.idRoom, idUser: this.props.idUser })
        this.props.changeScreen('ChooseTable')
    }
    logoutRoom = () => {
        if (this.state.play) {
            this.setState({ showAttention: true })
        }
        else {
            socket.emit('logoutRoom', { idRoom: this.props.idRoom, idUser: this.props.idUser })
            this.props.changeScreen('ChooseTable')
        }

    }
    showCardsError = () => {
        this.setState({ showCardError: true })
        setTimeout(() => {
            this.setState({ showCardError: false })
        }, 1500)
    }
    startGame = () => {
        if (this.state.Players.length >= 2) {
            this.setState({ showCountDown: false, ready: true })
            socket.emit('startGame', { idRoom: this.props.idRoom })
        }
    }
    //bốc bài và hiển thị button 'đánh'
    pickCard = (id) => {
        const { listCard } = this.state;
        listCard.forEach((Element, index) => {
            if ((Element.data.value + Element.data.type) === id) {
                this.setState({ listCard: [...listCard.slice(0, index), { ...Element, pick: !Element.pick }, ...listCard.slice(index + 1)] })
                Element.pick = !Element.pick;
                return;
            }
        })
        var show = false;
        listCard.forEach(Element => {
            if (Element.pick) {
                show = true;
            }
        })
        this.setState({ hiddenButton: show })
    }

    compareCardToCard = (listCardInTable, listCardNew) => {
        const lengthTable = listCardInTable.length;
        const lengthNew = listCardNew.length;
        let type = null;
        if (lengthNew === 1) type = 'don';
        else if (this.kiemtradoc(listCardNew)) type = this.kiemtradoc(listCardNew);
        else if (this.kiemtradoibatu(listCardNew)) type = this.kiemtradoibatu(listCardNew);
        else if (this.kiemtrathong(listCardNew)) type = this.kiemtrathong(listCardNew);
        if (lengthTable === 0) {
            if (type)
                return type;
            else
                return false
        }
        const listCardPrev = listCardInTable[lengthTable - 1];
        if (listCardPrev.type === type) {
            if (this.compare(listCardPrev.listCard[listCardPrev.listCard.length - 1], listCardNew[lengthNew - 1]) === -1)
                return type;
        }
        if (listCardPrev.type === 'don' && listCardPrev.listCard[0] === 15 && (type === '3thong' || type === '4thong' || type === '5thong')) return type;
        if (listCardPrev.type === '3thong' && (type === '4thong' || type === '5thong')) return type;
        if (listCardPrev.type === 'doi' && listCardPrev.listCard[0] === 15 && (type === '4thong' || type === '5thong')) return type;
        return false;
    }
    //chấp nhận đánh ném bài ra bàn và gửi dữ liệu lên server 
    fight = () => {
        const array = [];
        const cardRemove = [];
        this.state.listCard.forEach(element => {
            if (!element.pick) array.push(element)
            else cardRemove.push(element)
        })
        cardRemove.sort(this.compare);
        const check = this.compareCardToCard(this.state.listCardInTable, cardRemove)
        if (check) {
            if (array.length === 0) {
                socket.emit('gameOver', { idRoom: this.props.idRoom, idUser: this.props.idUser })
            }
            socket.emit('sendCard', { idRoom: this.props.idRoom, listCard: cardRemove, type: check, index: this.state.index, idUser: this.props.idUser })
            this.setState({ listCard: array, hiddenButton: false })
        }
        else
            this.showCardsError();
    }
    //bỏ qua khi không đánh được
    skip = (value) => {
        if (value && this.state.listCardInTable.length === 0) {
            if (this.state.listCard.length === 1)
                socket.emit('gameOver', { idRoom: this.props.idRoom, idUser: this.props.idUser })
            socket.emit('sendCard', { idRoom: this.props.idRoom, listCard: this.state.listCard.slice(0, 1), type: 'don', index: this.state.index, idUser: this.props.idUser })
            this.setState({ listCard: this.state.listCard.slice(1) })
        }
        else
            socket.emit('skip', { idRoom: this.props.idRoom, index: this.state.index, idUser: this.props.idUser })
    }

    //kiểm tra hợp bộ hợp lệ
    prioriti(value) {
        if (value === 'co') return 1;
        else if (value === 'ro') return 2;
        else if (value === 'chuon') return 3;
        else return 4;
    }
    compare = (a, b) => {
        a = a.data, b = b.data;
        const x = parseInt(a.value)
        const y = parseInt(b.value)
        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        } else if (x === y) {
            if (this.prioriti(a.type) > this.prioriti(b.type))
                return -1;
            else return 1;
        }
        return 0;
    }
    kiemtradoc(list) {
        const length = list.length;
        if (length < 3) return false;
        else {
            for (let i = 1; i < list.length; i++) {
                if (list[i].data.value !== list[i - 1].data.value + 1)
                    return false;
            }
            return length + 'doc';
        }
    }
    closeProfile = () => {
        this.setState({ showProfile: false })
    }
    showProfile = (idUser) => {
        var user = this.state.Players.filter(element => {
            return element.idUser === idUser
        })
        this.setState({ userProfile: user[0], showProfile: true })
    }
    showFriend = () => {
        this.setState({ showFriend: true, showTools: false })
    }
    closeShow = (value) => {
        this.setState({ [value]: false })
    }
    kiemtradoibatu(list) {
        const length = list.length;
        if (length === 2 && list[0].data.value === list[1].data.value) return 'doi';
        else if (length === 3 && list[0].data.value === list[1].data.value && list[0].data.value === list[2].data.value) return 'tam';
        else if (length === 4 && list[0].data.value === list[1].data.value && list[0].data.value === list[2].data.value && list[0].data.value === list[3].data.value) return 'tu'
        else return false
    }

    kiemtrathong(list) {
        const length = list.length;
        if (length < 6) return false;
        else {
            if (length % 2 === 1) return false;
            else {
                for (let i = 0; i < length / 2; i++) {
                    if (list[i * 2].data.value !== list[i * 2 + 1].data.value) return false;
                    if (i > 0 && list[(i - 1) * 2].data.value + 1 !== list[i * 2].data.value) return false
                }
            }
            return length / 2 + 'thong'
        }
    }
    //kiểm tra bộ hợp lệ
    shortCards = () => {
        this.setState({ listCards: this.state.listCard.sort(this.compare) })
    }
    render() {
        var Players = this.state.Players;
        const length = 4 - Players.length;
        for (let i = 0; i < length; i++) {
            Players = [...Players, {}]
        }
        const otherPlayer = [...Players.slice(this.state.index + 1), ...Players.slice(0, this.state.index)];
        return (
            <View style={{
                flex: 1,
                height: "100%",
                width: "100%",
                position: 'relative'
            }}>
                <ImageBackground source={require('../assets/bg2.png')} style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                }}>
                    <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                        <Image style={{ width: 618, height: 385.5 }} source={require('../assets/table_2.png')} />
                    </View>
                    {this.state.showResult && this.state.idUserWin === this.props.idUser ? <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', height: '100%', width: "100%"}}>  
                       <Image source={require('../assets/fireworks.gif')} style={{height: 225, width: 400, position: 'absolute'}} />
                    </View> : <></>}
                    
               
                    <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}>
                        <DescriptionRoom coin={this.props.tiencuoc} idRoom={this.props.idRoom} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ position: 'relative', marginRight: 10 }}>
                                <TouchableOpacity onPress={() => { this.setState({ showChat: true, countMessages: 0 }); }}>
                                    <ImageBackground style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }} source={require('../assets/background_button.png')} >
                                        <Ionicons name="chatbubbles-sharp" size={24} color="#fff" />
                                    </ImageBackground>
                                </TouchableOpacity>
                                {this.state.countMessages !== 0 ? <View style={{ backgroundColor: "#e30f1c", height: 16, width: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: -5, right: -5 }}>
                                    <Text style={{ color: '#fff', fontSize: 12 }}>{this.state.countMessages}</Text>
                                </View> : <></>}
                            </View>
                            <View style={{ position: 'relative' }}>
                                <TouchableOpacity onPress={() => { this.setState({ showTools: !this.state.showTools }); }}>
                                    <ImageBackground style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }} source={require('../assets/background_button.png')} >
                                        <Ionicons name="menu" size={30} color="#fff" />
                                    </ImageBackground>
                                </TouchableOpacity>
                                {this.state.showTools ?
                                    <ToolsMenu logoutRoom={this.logoutRoom} showFriend={this.showFriend} /> : <></>}
                            </View>
                        </View>
                    </View>
                    {
                        this.state.showNewUser ? <View style={{ position: 'absolute', left: '60%', top: 10, backgroundColor: '#d1d1d1', borderRadius: 2, padding: 4 }}>
                            <Text>{this.state.newUser} vào bàn</Text>
                        </View> : <></>}
                    {
                        this.state.showUserLogout ? <View style={{ position: 'absolute', left: '60%', top: 10, backgroundColor: '#d1d1d1', borderRadius: 2, padding: 4 }}>
                            <Text>{this.state.userLogout} rời bàn</Text>
                        </View> : <></>
                    }
                    <View style={styles.table}>
                        {this.state.listCardInTable.map((value) =>
                            <AnimListCardTable zoomOut={value.zoomOut} key={value.id} listCardItem={value.listCard} />
                        )}
                    </View>

                    {otherPlayer.map((value, index) =>
                        value.idUser ?
                            <View style={styles['user' + (index + 1)]}>
                                <TouchableOpacity onPress={() => this.showProfile(value.idUser)} activeOpacity={0.8}>
                                    <UserProfile
                                        name={value.userName}
                                        coin={value.coin}
                                        idUser={value.idUser}
                                        url={value.url}
                                        showResult={this.state.showResult}
                                        Viewer={value.Viewer}
                                        idUserWin={this.state.idUserWin}
                                        dangdanh={value.dangdanh}
                                        play={this.state.play}
                                        index={index}
                                        me={false}
                                        tongcuoc={this.state.tongcuoc}
                                    />
                                </TouchableOpacity>
                                {(this.state.play && !value.Viewer) ? <><UserCard
                                    skip={value.skip}
                                    totalCards={value.totalCards}
                                    showResult={this.state.showResult}
                                    tiencuoc={this.props.tiencuoc}
                                    showCoinUp={this.state.showCoinUp}
                                /></> : <></>}
                            </View> : <></>
                    )}
                    {(!this.state.play && this.state.Players.length >= 2 && !this.state.ready && !this.state.showResult) ?
                        <View style={{ position: 'absolute', top: '46%', width: '100%', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { this.startGame(); }} >
                                <ButtonRectangle name={'Sẵn sàng'} color={'orange'} />
                            </TouchableOpacity>
                        </View> : <></>
                    }
                    <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 115, alignItems: 'center', marginLeft: '5%', flexDirection: 'row' }}>
                        <UserProfile
                            name={this.props.userName}
                            idUser={this.props.idUser}
                            coin={this.props.coin}
                            url={this.props.url}
                            showResult={this.state.showResult}
                            idUserWin={this.state.idUserWin}
                            dangdanh={this.state.isTurn}
                            play={this.state.play}
                            isTurn={this.state.isTurn}
                            tongcuoc={this.state.tongcuoc}
                            skip={this.skip}
                            me={true}
                        />
                        <View style={{ width: '75%', height: '100%', alignItems: 'center', justifyContent: 'center', marginLeft: 5 }}>
                            {this.state.play ? <PokerCard
                                isTurn={this.state.isTurn}
                                fight={this.fight}
                                listCard={this.state.listCard}
                                hiddenButton={this.state.hiddenButton}
                                play={this.state.play}
                                pickCard={this.pickCard}
                                skip={this.skip}
                                shortCards={this.shortCards}
                                showCoinUp={this.state.showCoinUp}
                                tiencuoc={this.props.tiencuoc}
                                showCardError={this.state.showCardError}
                            /> : <></>}
                        </View>
                    </View>
                    {this.state.showCountDown ?
                        <View style={{ position: 'absolute', top: '40%', width: '100%', alignItems: 'center' }}>
                            <Countdown2 closeShow={this.closeShow} />
                        </View> : <></>}
                    <ModalPoup visible={this.state.showProfile}>
                        <Profile closeProfile={this.closeProfile} user={this.state.userProfile} />
                    </ModalPoup>
                    <ModalPoup visible={this.state.showFriend}>
                        <Friends closeShow={this.closeShow}
                            idUser={this.props.idUser}
                            idRoom={this.props.idRoom}
                            coin={this.props.tiencuoc}
                            userName={this.props.userName}
                            url={this.props.url} />
                    </ModalPoup>
                    <ModalPoup visible={this.state.showAttention}>
                        <Attention acceptLogoutRoom={this.acceptLogoutRoom} closeShow={this.closeShow} />
                    </ModalPoup>
                    <Overlay isVisible={this.state.showChat} onBackdropPress={() => this.closeShow('showChat')}
                        backdropStyle={{
                            position: 'absolute',
                            left: 0,
                            shadowOpacity: 0
                        }}
                        overlayStyle={{
                            width: '40%',
                            height: '100%',
                            backgroundColor: "transparent",
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            padding: 0,
                            shadowOpacity: 0
                        }} >
                        <Chat messages={this.state.messages} />
                    </Overlay>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Play'
    },
    table: {
        flexDirection: 'row',
        position: 'absolute',
        top: '45%',
        left: '48%',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        borderWidth: 2,
        borderColor: '#fff',
        width: 200,
        padding: 5,
        marginLeft: 10,
        marginRight: 10,

    },
    buttonBack: {
        height: 50,
        width: 50
    },
    user3: {
        position: 'absolute',
        top: '35%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    user1: {
        position: 'absolute',
        top: '35%',
        right: 0,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row-reverse'
    },
    user2: {
        position: 'absolute',
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 2,
        top: 0,
        left: '42%',
        flexDirection: 'row',
        alignItems: 'center',

    }
})
const mapStateToProps = (state) => {
    return {
        idRoom: state.ReducerGame.idRoom,
        tiencuoc: state.ReducerGame.coin,
        idUser: state.ReducerLogin.idUser,
        url: state.ReducerLogin.url,
        userName: state.ReducerLogin.userName,
        playing: state.ReducerPlayGame.playing,
        coin: state.ReducerLogin.coin,
        dataSetting: state.ReducerSetting,
        dataLogin: state.ReducerLogin
    }
};
const mapDispatchToProps = () => {
    return {
        changeScreen: changeScreen,
        musicGamePlay: musicGamePlay,
        login: login
    };
};
export default connect(mapStateToProps, mapDispatchToProps())(RoomPlay);
