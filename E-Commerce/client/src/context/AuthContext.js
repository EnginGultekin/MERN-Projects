import { useState, createContext, useContext, useEffect } from 'react';
import { fetchLogout, fetchMe } from '../globals/Network';
import { Flex, Spinner } from '@chakra-ui/react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // asyn func ( async () => {})()
        (async () => {
            try {
                const me = await fetchMe();

                setLoggedIn(true);
                setUser(me);
                setLoading(false);

            } catch (error) {
                setLoading(false);
            }
        })();
    }, [])

    const login = (data) => {
        setUser(data.user);
        setLoggedIn(true);

        localStorage.setItem("access-token", data.accessToken);
        localStorage.setItem("refresh-token", data.refreshToken);
    };

    const logout = async (callback) => {
        setUser(null);
        setLoggedIn(false);

        await fetchLogout();

        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');

        // Callback kullanımını görmek için bıraktım, biz yönlendirmeyi Link ile yapıyoruz
        //callback()   
    }

    const values = {
        user,
        loggedIn,
        login,
        logout,
    };


    if (loading) {
        return (
            <Flex justifyContent='center' alignItems='center' height='100vh'>
                <Spinner
                    thickness='4px'
                    speed='0.65'
                    emptyColor='gray.200'
                    size='xl'
                    color='red.500' />
            </Flex>
        )
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
