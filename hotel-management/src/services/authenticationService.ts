import { ILogin } from '@type/common';
import { UserAttributes } from '@supabase/supabase-js';

// Services
import supabase from './supabaseService';

// Types
import { IAccount } from '@type/account';

/**
 * Login services
 * @param param0 The object contains email and password to login
 * @returns The data of account login if success
 */
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

/**
 * Get data of account current login
 * @returns The data of account currently login
 */
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

/**
 * Logout services
 */
const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Update account currently login
 * @param param0 The object contain fullName, password to be updated
 * @returns The data of account after updated
 */
const updateAccount = async ({ fullName, password }: IAccount) => {
  let accountUpdate: UserAttributes | null = null;

  if (password) {
    accountUpdate = { password };
  }

  if (fullName) {
    accountUpdate = { data: { fullName } };
  }

  const { data, error } = await supabase.auth.updateUser(accountUpdate!);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
};

export { login, logout, getCurrentAccount, updateAccount };
