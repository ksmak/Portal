'use client'
import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { DictType, UserType } from "../lib/definitions"
import Contact from "./Contact"

export default function ContactList({
    deparments,
    managements,
    divisions,
}: {
    deparments: DictType[],
    managements: DictType[],
    divisions: DictType[],
}) {
    const { data: users } = useSWR("/api/users/", fetcher);

    return (
        <div className="mt-10  border border-gray-200 rounded text-sm">
            {deparments.map(department => (
                <div key={department.id}>
                    <div className="p-2 bg-primary text-white font-medium uppercase">{department.name_ru}</div>
                    <div>{managements.map(management => (
                        <div key={management.id}>
                            <div className="p-2 text-blue-600  font-medium uppercase ">{management.name_ru}</div>
                            <div>
                                {divisions.map(division => (
                                    <div key={division.id}>
                                        <div className="p-2 text-gray-600 mt-2 font-medium uppercase ">{division.name_ru}</div>
                                        <div>
                                            {users && users
                                                .filter((item: UserType) => item.department === department.id && item.management === management.id && item.division === division.id)
                                                .map((user: UserType) => (<Contact key={user.email} user={user} />))}
                                        </div>
                                    </div>
                                ))}</div>
                        </div>
                    ))}</div>
                </div>
            ))}
        </div>
    )
}