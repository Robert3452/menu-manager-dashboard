import { AuthContext } from '@/contexts/jwt-context';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext);
