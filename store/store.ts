import { Observable, observable } from "@legendapp/state";
import {
  configureObservablePersistence,
  persistObservable,
} from "@legendapp/state/persist";
import { ObservablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define types
type User = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
};

interface Store {
  user: User | null;
  sessionToken: string;
  setSessionExpiration: (token: number) => void;
  setUser: (user: User | null) => void;
  sessionExpiration: number;
  setSessionToken: (token: string) => void;
}

// Setup configured persistence options using AsyncStorage
configureObservablePersistence({
  pluginLocal: ObservablePersistAsyncStorage,
  localOptions: {
    asyncStorage: {
      AsyncStorage, // Inject AsyncStorage
    },
  },
});

// Create the store observable without immediate persistence
export const store$: Observable<Store> = observable<Store>({
  user: null,
  sessionExpiration: 0,
  sessionToken: "",
  // Actions
  setUser: (user: User | null) => {
    store$.user.set(user);
  },

  setSessionToken: (token: string) => {
    store$.sessionToken.set(token);
  },

  setSessionExpiration: (token: number) => {
    store$.sessionExpiration.set(token);
  },
});

// Load data asynchronously and persist after data is loaded
const initializeStore = async () => {
  try {
  } catch (error) {
    console.error("Error initializing store:", error);
  }
};

// Call this function during app initialization to set up persistence
initializeStore();

// Helper functions for easier access
export const selectUser = () => store$.user.get();
export const selectSessionToken = () => store$.sessionToken.get();
export const selectFullName = () => {
  const user = store$.user.get();
  return user ? `${user.firstName} ${user.lastName}` : "";
};
export const selectSessionExpiration = () => store$.sessionExpiration.get();
