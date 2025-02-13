import { useMemo } from "react";
import { ContactType } from "./definitions";

export const useFilterContacts = (contacts: ContactType[], filter: string) => {
  const filteredContacts = useMemo(() => {
    return contacts.filter((item: ContactType) => {
      const fio =
        `${item.last_name} ${item.first_name} ${item.middle_name}`.toLowerCase();
      return fio.includes(filter.toLowerCase());
    });
  }, [contacts, filter]);

  return filteredContacts;
};
