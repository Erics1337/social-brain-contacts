import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Button } from 'react-native';
import useStore from '../store';
import { signOut } from 'firebase/auth';
import { auth } from '../config';

const Sidebar: React.FC = () => {
    const slideAnim = useRef(new Animated.Value(-500)).current;
    const accountSlideAnim = useRef(new Animated.Value(-500)).current;

    const { sidebarVisible, toggleSidebar, toggleShowSearchBox } = useStore();
    const [showAccountSidebar, setShowAccountSidebar] = useState(false);

    const handleLogout = () => {
        try {
            signOut(auth)
        } catch (error) {
            console.log('Error logging out: ', error)
        }
    }
    
    useEffect(() => {
        Animated.spring(slideAnim, {
            toValue: sidebarVisible && !showAccountSidebar ? 0 : -500,
            tension: 50,
            friction: 7,
            useNativeDriver: false,
        }).start();
    }, [sidebarVisible, showAccountSidebar]);

    useEffect(() => {
        Animated.spring(accountSlideAnim, {
            toValue: showAccountSidebar ? 0 : -500,
            tension: 50,
            friction: 7,
            useNativeDriver: false,
        }).start();
    }, [showAccountSidebar]);

    return (
        <>
            {/* Main Sidebar */}
            <Animated.View
                style={{
                    position: 'absolute',
                    right: slideAnim,
                    top: 50,
                    bottom: 0,
                    width: '60%',
                    backgroundColor: '#fff',
                    padding: 10,
                    zIndex: 1,
                }}>
                <TouchableOpacity onPress={toggleSidebar}>
                    <Text style={{ fontSize: 24 }}>X</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'column' }}>
                    <Button title='Search' onPress={() => toggleShowSearchBox} />
                    <Button title='Account' onPress={() => setShowAccountSidebar(true)} />
                    <Button title='Sign Out' onPress={handleLogout} color='#000' />
                </View>
            </Animated.View>

            {/* Account Sidebar */}
            <Animated.View
                style={{
                    position: 'absolute',
                    right: accountSlideAnim,
                    top: 50,
                    bottom: 0,
                    width: '60%',
                    backgroundColor: '#f5f5f5',
                    padding: 10,
                    zIndex: 2,
                }}>
                <TouchableOpacity onPress={() => setShowAccountSidebar(false)}>
                    <Text style={{ fontSize: 24 }}>&larr;</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'column' }}>
                    <Button title='Delete Account' onPress={() => console.log('Delete Account')} />
                    <Button title='Other Option' onPress={() => console.log('Other Option')} />
                </View>
            </Animated.View>
        </>
    );
}

export default Sidebar;
