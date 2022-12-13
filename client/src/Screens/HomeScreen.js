import { useEffect } from 'react';
import { useUser } from '../context/UserContext'

function HomeScreen() {

  const { user } = useUser();

  return (
    <div className='mt-5'>{user?.email ?? 'Kullanıcı Yok '}</div>
  )
}

export default HomeScreen