'use client'

import { UserType } from "../lib/definitions"

export default function Contact({
    user
}: {
    user: UserType
}) {
    return (
        <div className="p-2 font-medium text-gray-700 flex  border-t border-b">
            <span className="w-1/3">{user.last_name} {user.first_name} {user.middle_name}</span>
            <span className="w-1/3">{user.job}</span>
            <span className="w-1/3">{user.phone}</span>
        </div>
    )
}