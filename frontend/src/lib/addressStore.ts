import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Address {
  id: string;
  label: string;
  houseNumber: string;
  street: string;
  landmark: string;
  locality: string;
  isDefault: boolean;
}

interface AddressStore {
  addresses: Address[];
  selectedAddressId: string | null;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setSelectedAddress: (id: string) => void;
  getSelectedAddress: () => Address | null;
  getFirstAddress: () => Address | null;
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],
      selectedAddressId: null,

      addAddress: (address) => {
        const id = `addr-${Date.now()}`;
        set((state) => ({
          addresses: [...state.addresses, { ...address, id }],
          selectedAddressId: id,
        }));
      },

      deleteAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
          selectedAddressId:
            state.selectedAddressId === id
              ? state.addresses.find((a) => a.id !== id)?.id || null
              : state.selectedAddressId,
        }));
      },

      setSelectedAddress: (id) => set({ selectedAddressId: id }),

      getSelectedAddress: () => {
        const { addresses, selectedAddressId } = get();
        return addresses.find((a) => a.id === selectedAddressId) || null;
      },

      getFirstAddress: () => {
        const { addresses } = get();
        if (addresses.length === 0) return null;
        const defaultAddr = addresses.find((a) => a.isDefault);
        return defaultAddr || addresses[0];
      },
    }),
    {
      name: 'murkimart-addresses',
    }
  )
);
