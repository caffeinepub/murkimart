import { create } from 'zustand';

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
}

export const useAddressStore = create<AddressStore>((set, get) => ({
  addresses: [
    {
      id: 'addr-1',
      label: 'Home',
      houseNumber: '42',
      street: 'Gandhi Nagar',
      landmark: 'Near Murki Bazar',
      locality: 'Murki Bazar',
      isDefault: true,
    },
    {
      id: 'addr-2',
      label: 'Office',
      houseNumber: '15',
      street: 'Station Road',
      landmark: 'Opposite Railway Station',
      locality: 'Station Area',
      isDefault: false,
    },
  ],
  selectedAddressId: 'addr-1',

  addAddress: (address) => {
    const id = `addr-${Date.now()}`;
    set((state) => ({
      addresses: [...state.addresses, { ...address, id }],
      selectedAddressId: id,
    }));
  },

  deleteAddress: (id) => {
    set((state) => ({
      addresses: state.addresses.filter(a => a.id !== id),
      selectedAddressId: state.selectedAddressId === id
        ? (state.addresses.find(a => a.id !== id)?.id || null)
        : state.selectedAddressId,
    }));
  },

  setSelectedAddress: (id) => set({ selectedAddressId: id }),

  getSelectedAddress: () => {
    const { addresses, selectedAddressId } = get();
    return addresses.find(a => a.id === selectedAddressId) || null;
  },
}));
