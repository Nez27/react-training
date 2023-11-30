import { ILogin } from '@type/common';

// Services
import supabase from './supabaseService';

const login = async ({ email, password }: ILogin) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getCurrentAccount = async () => {
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return null;
  }

  const { data: accountData, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return accountData.user;
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export { login, logout, getCurrentAccount };
